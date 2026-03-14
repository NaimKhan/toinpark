import { PrismaClient } from '@prisma/client';
import { Country, State } from 'country-state-city';

export async function countryAndStateSeed(prisma: PrismaClient) {
  console.log('🌍 Initial country/state seeding started...');

  try {
    // 1️⃣ Insert countries
    const countries = Country.getAllCountries();

    const countryData = countries.map((c) => ({
      name: c.name,
      code: c.isoCode,
      phoneCode: c.phonecode || null,
      currencyCode: c.currency || null
    }));

    // Check if countries already exist to avoid duplicates or errors if needed,
    // or use createMany with skipDuplicates if supported (depends on DB/Prisma version).
    // For now, let's assume valid clean slate or handling via logic.
    // However, createMany doesn't support skipDuplicates on all databases.
    // Given seed.ts has cleanDatabase logic, this might be fine.
    
    // Using explicit loop with upsert is safer for idempotency if clean is not guaranteed, 
    // but createMany is faster. The original used createMany.
    // Let's stick to createMany but wrap in try-catch to be safe or check count.
    
    const countryCount = await prisma.country.count();
    if (countryCount === 0) {
        await prisma.country.createMany({
            data: countryData,
        });
    } else {
        console.log('Countries already exist, skipping insert.');
    }

    // 2️⃣ Fetch inserted countries to map ISO → ID
    const dbCountries = await prisma.country.findMany({
      select: { id: true, code: true },
    });

    const countryIdMap = new Map<string, string>();
    dbCountries.forEach((c) => countryIdMap.set(c.code, c.id));

    // 3️⃣ Insert states (bulk)
    const stateData: any[] = [];

    for (const country of countries) {
      const countryId = countryIdMap.get(country.isoCode);
      if (!countryId) continue;

      const states = State.getStatesOfCountry(country.isoCode);

      states.forEach((state) => {
        stateData.push({
          name: state.name,
          code: state.isoCode || null,
          countryId,
        });
      });
    }

    const stateCount = await prisma.state.count();
    if (stateCount === 0) {
        // Chunking state data to avoid parameter limit issues if many states
        const chunkSize = 1000;
        for (let i = 0; i < stateData.length; i += chunkSize) {
            const chunk = stateData.slice(i, i + chunkSize);
            await prisma.state.createMany({
                data: chunk,
            });
        }
    } else {
        console.log('States already exist, skipping insert.');
    }

    console.log('✅ Initial country/state seeding completed');
  } catch (error) {
    console.error('❌ Error during country/state seeding:', error);
    throw error;
  }
}

