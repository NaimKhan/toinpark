--
-- PostgreSQL database dump
--

\restrict WcwrVLnwBAllLEdKDjuWQGUcAzklZq1YtMrawaofsFlhWctnfE3ua48LGISQMHL

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AudienceType; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."AudienceType" AS ENUM (
    'MEMBER',
    'SYSTEM_USER'
);


ALTER TYPE public."AudienceType" OWNER TO admin;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER',
    'PREFER_NOT_TO_SAY'
);


ALTER TYPE public."Gender" OWNER TO admin;

--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."NotificationType" AS ENUM (
    'INFO',
    'SUCCESS',
    'WARNING',
    'ERROR'
);


ALTER TYPE public."NotificationType" OWNER TO admin;

--
-- Name: StakeCreatedBy; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."StakeCreatedBy" AS ENUM (
    'ADMIN',
    'MEMBER'
);


ALTER TYPE public."StakeCreatedBy" OWNER TO admin;

--
-- Name: StakingAdjustmentType; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."StakingAdjustmentType" AS ENUM (
    'ADD',
    'DEDUCT'
);


ALTER TYPE public."StakingAdjustmentType" OWNER TO admin;

--
-- Name: TicketPriority; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."TicketPriority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
);


ALTER TYPE public."TicketPriority" OWNER TO admin;

--
-- Name: TicketStatus; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."TicketStatus" AS ENUM (
    'OPEN',
    'RESOLVED',
    'CLOSED'
);


ALTER TYPE public."TicketStatus" OWNER TO admin;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED',
    'CANCELLED',
    'INITIATE',
    'REFUNDED',
    'VOIDED',
    'WAITING',
    'CONFIRMING',
    'CONFIRMED',
    'SENDING',
    'PARTIALLY_PAID',
    'EXPIRED'
);


ALTER TYPE public."TransactionStatus" OWNER TO admin;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."TransactionType" AS ENUM (
    'STAKE',
    'COMMISSION_BONUS',
    'PROFIT',
    'WITHDRAWAL',
    'REFUND',
    'STAKING_BONUS',
    'VOID',
    'ENTRY_BONUS',
    'CHALLENGE_BONUS',
    'LEVELING_BONUS',
    'SOCIAL_REFERRAL',
    'CLAIM_BONUS',
    'KYC_BONUS',
    'STAKING_ADJUSTMENT'
);


ALTER TYPE public."TransactionType" OWNER TO admin;

--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'BLOCKED',
    'SUSPENDED',
    'DORMANT',
    'CLOSED',
    'PENDING_VERIFICATION',
    'INACTIVE',
    'DELETED'
);


ALTER TYPE public."UserStatus" OWNER TO admin;

--
-- Name: WithdrawalStatus; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."WithdrawalStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."WithdrawalStatus" OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: air_drop_events; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.air_drop_events (
    id text NOT NULL,
    event_name character varying(100) NOT NULL,
    total_amount numeric(18,2) NOT NULL,
    used_amount numeric(18,2) NOT NULL,
    usd_conversion_rate numeric(18,6) NOT NULL,
    event_start_date timestamp(3) without time zone NOT NULL,
    event_end_date timestamp(3) without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.air_drop_events OWNER TO admin;

--
-- Name: announcement_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.announcement_categories (
    id text NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.announcement_categories OWNER TO admin;

--
-- Name: challenge_histories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.challenge_histories (
    id text NOT NULL,
    user_id text NOT NULL,
    challenge_id text NOT NULL,
    challenge_status character varying(50) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.challenge_histories OWNER TO admin;

--
-- Name: challenges; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.challenges (
    id text NOT NULL,
    challenge_title character varying(255) NOT NULL,
    description text,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    reward_toin_amount numeric(18,2) NOT NULL,
    post_details text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.challenges OWNER TO admin;

--
-- Name: community_events; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.community_events (
    id text NOT NULL,
    title character varying(255),
    description text,
    event_date timestamp(3) without time zone,
    location_name character varying(255),
    address character varying(500),
    map_link character varying(500),
    event_link character varying(500),
    banner_image_url character varying(500),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    "eventType" character varying(50),
    event_location character varying(500),
    "isFeatured" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.community_events OWNER TO admin;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.countries (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(3) NOT NULL,
    phone_code character varying(20),
    currency_code character varying(20),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone,
    created_by text,
    deleted_at timestamp(6) without time zone,
    deleted_by text,
    updated_by text
);


ALTER TABLE public.countries OWNER TO admin;

--
-- Name: menu_and_permission_setups; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.menu_and_permission_setups (
    id text NOT NULL,
    parent_id text,
    head_title character varying(255),
    level integer,
    title character varying(255),
    icon character varying(100),
    type character varying(100),
    horizontal_list boolean,
    path character varying(255),
    bookmark character varying(255),
    feature_name character varying(255),
    controller_name character varying(255),
    method_name character varying(255),
    method_type character varying(50),
    application_name character varying(150),
    application_base_url character varying(255),
    menu_sequence integer,
    is_visible boolean,
    show_in_menu_item boolean,
    allow_anonymous boolean,
    restriction_allow boolean,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    created_by text,
    updated_by text,
    deleted_by text
);


ALTER TABLE public.menu_and_permission_setups OWNER TO admin;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    user_id text NOT NULL,
    type public."NotificationType" NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    data jsonb,
    is_read boolean DEFAULT false NOT NULL,
    read_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.notifications OWNER TO admin;

--
-- Name: official_announcements; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.official_announcements (
    id text NOT NULL,
    title character varying(255),
    message text,
    start_date timestamp(3) without time zone,
    end_date timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    created_by text,
    updated_by text,
    deleted_by text,
    category_id text NOT NULL,
    audience_type public."AudienceType" NOT NULL
);


ALTER TABLE public.official_announcements OWNER TO admin;

--
-- Name: referral_commission_histories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.referral_commission_histories (
    id text NOT NULL,
    user_id text NOT NULL,
    referral_level_id text NOT NULL,
    level_name character varying(100) NOT NULL,
    toin_amount numeric(18,2) NOT NULL,
    transaction_date timestamp(3) without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    level_number character varying(100) NOT NULL
);


ALTER TABLE public.referral_commission_histories OWNER TO admin;

--
-- Name: referral_hierarchy; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.referral_hierarchy (
    id text NOT NULL,
    user_id text NOT NULL,
    ancestor_id text NOT NULL,
    level integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.referral_hierarchy OWNER TO admin;

--
-- Name: referral_histories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.referral_histories (
    id text NOT NULL,
    user_id text NOT NULL,
    referral_milestone_id text NOT NULL,
    referral_code character varying(20),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    referral_user_id text
);


ALTER TABLE public.referral_histories OWNER TO admin;

--
-- Name: referral_levels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.referral_levels (
    id text NOT NULL,
    level_name character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    level_number integer DEFAULT 0 NOT NULL,
    referral_bonus_percentage integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.referral_levels OWNER TO admin;

--
-- Name: referral_milestones; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.referral_milestones (
    id text NOT NULL,
    referral_name character varying(100) NOT NULL,
    toin_amount numeric(18,6) NOT NULL,
    target_person integer DEFAULT 0,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    per_user_milestone integer DEFAULT 0,
    description text,
    sequence_number integer
);


ALTER TABLE public.referral_milestones OWNER TO admin;

--
-- Name: referral_milestones_sequence_number_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.referral_milestones_sequence_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.referral_milestones_sequence_number_seq OWNER TO admin;

--
-- Name: referral_milestones_sequence_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.referral_milestones_sequence_number_seq OWNED BY public.referral_milestones.sequence_number;


--
-- Name: request_responses_logs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.request_responses_logs (
    id text NOT NULL,
    request text,
    response text,
    user_id text,
    error_log text,
    method_name character varying(150),
    requested_ip character varying(100),
    full_route character varying(255),
    action_verb character varying(20),
    old_data text,
    new_data text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.request_responses_logs OWNER TO admin;

--
-- Name: role_wise_menu_and_permissions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.role_wise_menu_and_permissions (
    id text NOT NULL,
    menu_and_permission_setup_id text NOT NULL,
    role_id text NOT NULL,
    role_name character varying(150),
    user_id text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    created_by text,
    updated_by text,
    deleted_by text
);


ALTER TABLE public.role_wise_menu_and_permissions OWNER TO admin;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id text NOT NULL,
    name character varying(150),
    normalized_name character varying(150),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    created_by text,
    updated_by text,
    deleted_by text
);


ALTER TABLE public.roles OWNER TO admin;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.settings (
    id text NOT NULL,
    key_name character varying(100) NOT NULL,
    value text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.settings OWNER TO admin;

--
-- Name: staking_adjustments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.staking_adjustments (
    id text NOT NULL,
    user_id text NOT NULL,
    user_staking_package_id text NOT NULL,
    toin_amount numeric(18,8) NOT NULL,
    usdt_amount numeric(18,8) NOT NULL,
    usdt_conversion_rate numeric(18,8) NOT NULL,
    type public."StakingAdjustmentType" NOT NULL,
    remark character varying(255),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text
);


ALTER TABLE public.staking_adjustments OWNER TO admin;

--
-- Name: staking_package_plans; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.staking_package_plans (
    id text NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    daily_profit_percent numeric(5,2) NOT NULL,
    bonus_amount numeric(18,2) DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    max_toin_amount numeric(18,2) NOT NULL,
    min_toin_amount numeric(18,2) NOT NULL,
    minimum_duration_in_days integer NOT NULL,
    recurring_profit_days integer NOT NULL,
    total_toin_purchased_with_usd numeric(18,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.staking_package_plans OWNER TO admin;

--
-- Name: states; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.states (
    id text NOT NULL,
    country_id text NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(20),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone,
    created_by text,
    deleted_at timestamp(6) without time zone,
    deleted_by text,
    updated_by text
);


ALTER TABLE public.states OWNER TO admin;

--
-- Name: success_or_error_or_sms_or_email_texts; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.success_or_error_or_sms_or_email_texts (
    id text NOT NULL,
    message_code integer,
    success_or_error_message text,
    sms_message text,
    email_message text,
    message_type character varying(50),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    status_code integer,
    subject_name character(500),
    http_status_name text
);


ALTER TABLE public.success_or_error_or_sms_or_email_texts OWNER TO admin;

--
-- Name: system_settings; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.system_settings (
    id text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.system_settings OWNER TO admin;

--
-- Name: ticket_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ticket_categories (
    id text NOT NULL,
    name character varying(150) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.ticket_categories OWNER TO admin;

--
-- Name: ticket_messages; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ticket_messages (
    id text NOT NULL,
    ticket_id text NOT NULL,
    message text NOT NULL,
    sender_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.ticket_messages OWNER TO admin;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tickets (
    id text NOT NULL,
    subject character varying(255) NOT NULL,
    description text NOT NULL,
    ticket_category_id text NOT NULL,
    status public."TicketStatus" DEFAULT 'OPEN'::public."TicketStatus" NOT NULL,
    priority public."TicketPriority" DEFAULT 'MEDIUM'::public."TicketPriority" NOT NULL,
    responded_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    ticket_no text
);


ALTER TABLE public.tickets OWNER TO admin;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.transactions (
    id text NOT NULL,
    transaction_auto_id character varying(100) NOT NULL,
    user_id text NOT NULL,
    toin_amount numeric(18,2) NOT NULL,
    trx_success_datetime timestamp(3) without time zone,
    trx_payment_gateway character varying(100),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    trx_type public."TransactionType",
    trx_note character varying(255),
    trx_status public."TransactionStatus",
    trx_payment_gateway_reference_id character varying(150),
    trx_payment_gateway_response text,
    level_id text,
    staking_adjustment_id text,
    user_staking_package_id text,
    withdrawal_request_id text,
    usdt_amount numeric(18,2) NOT NULL,
    usdt_conversion_rate numeric(18,6) NOT NULL
);


ALTER TABLE public.transactions OWNER TO admin;

--
-- Name: tutorial_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tutorial_categories (
    id text NOT NULL,
    name character varying(150),
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.tutorial_categories OWNER TO admin;

--
-- Name: tutorials; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tutorials (
    id text NOT NULL,
    title character varying(255),
    description text,
    type character varying(50),
    duration character varying(50),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text,
    "filePath" character varying(500),
    "isFeatured" boolean DEFAULT false NOT NULL,
    "sourceLink" character varying(500),
    "tutorialCategoryId" text NOT NULL,
    "thumbnailPath" character varying(500)
);


ALTER TABLE public.tutorials OWNER TO admin;

--
-- Name: user_change_history_for_email_or_phone; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_change_history_for_email_or_phone (
    id text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(6) without time zone,
    updated_by text,
    deleted_at timestamp(6) without time zone,
    deleted_by text,
    change_type text,
    full_name text,
    "logId" integer NOT NULL,
    new_value character varying(255),
    old_value character varying(255),
    user_name text,
    remarks character varying(255),
    requested_at timestamp(3) without time zone,
    verified_at timestamp(3) without time zone
);


ALTER TABLE public.user_change_history_for_email_or_phone OWNER TO admin;

--
-- Name: user_change_history_for_email_or_phone_logId_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."user_change_history_for_email_or_phone_logId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."user_change_history_for_email_or_phone_logId_seq" OWNER TO admin;

--
-- Name: user_change_history_for_email_or_phone_logId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."user_change_history_for_email_or_phone_logId_seq" OWNED BY public.user_change_history_for_email_or_phone."logId";


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_profiles (
    id text NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    date_of_birth date,
    gender character varying(20),
    profile_image_url character varying(500),
    bio text,
    address_line1 character varying(255),
    address_line2 character varying(255),
    city character varying(100),
    state_id text,
    country_id text,
    zip_code character varying(20),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(6) without time zone,
    updated_by text,
    deleted_at timestamp(6) without time zone,
    deleted_by text,
    user_id text NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO admin;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_roles (
    user_id text NOT NULL,
    role_id text NOT NULL
);


ALTER TABLE public.user_roles OWNER TO admin;

--
-- Name: user_staking_packages; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_staking_packages (
    id text NOT NULL,
    user_id text NOT NULL,
    package_id text NOT NULL,
    toin_amount numeric(18,2),
    bonus_amount numeric(18,2) DEFAULT 0,
    daily_profit_percent numeric(5,2),
    start_date timestamp(3) without time zone,
    total_profit numeric(18,2) DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    initial_end_date timestamp(3) without time zone,
    recurring_profit_days integer,
    submit_for_withdraw boolean DEFAULT false,
    withdrawal_status text,
    usd_conversion_rate numeric(18,2),
    next_reward_date timestamp(3) without time zone,
    previous_reward_date timestamp(3) without time zone,
    is_bonus_done boolean DEFAULT false,
    is_leveling_bonus_done boolean DEFAULT false,
    staked_toin boolean DEFAULT true,
    minimum_duration_in_days integer,
    remarks text,
    usdt_amount numeric(18,2),
    stake_created_by public."StakeCreatedBy" DEFAULT 'MEMBER'::public."StakeCreatedBy" NOT NULL
);


ALTER TABLE public.user_staking_packages OWNER TO admin;

--
-- Name: user_wallet_addresses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_wallet_addresses (
    id text NOT NULL,
    user_id text NOT NULL,
    wallet_account_id character varying(255) NOT NULL,
    name character varying(100),
    status boolean DEFAULT true NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    updated_by text,
    deleted_at timestamp(3) without time zone,
    deleted_by text
);


ALTER TABLE public.user_wallet_addresses OWNER TO admin;

--
-- Name: user_wallets; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_wallets (
    id text NOT NULL,
    version text NOT NULL,
    user_id text NOT NULL,
    wallet_balance numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_staking_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_claim_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_entry_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_leveling_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_referral numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_commission_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_staking numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_challenge_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_withdrawals numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_refund numeric(18,4) DEFAULT 0.0000 NOT NULL,
    total_void numeric(18,4) DEFAULT 0.0000 NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(6) without time zone,
    updated_by text,
    deleted_at timestamp(6) without time zone,
    deleted_by text,
    total_kyc_bonus numeric(18,4) DEFAULT 0.0000 NOT NULL
);


ALTER TABLE public.user_wallets OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id text NOT NULL,
    phone_number character varying(20),
    email character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    email_verified_at timestamp(6) without time zone,
    phone_verified boolean DEFAULT false NOT NULL,
    phone_verified_at timestamp(6) without time zone,
    username character varying(50) NOT NULL,
    user_role character varying(50) DEFAULT 'Admin'::character varying,
    two_factor_enabled boolean DEFAULT false NOT NULL,
    two_factor_secret character varying(255),
    lockout_enabled boolean DEFAULT true NOT NULL,
    lockout_end timestamp(6) without time zone,
    access_failed_count integer DEFAULT 0 NOT NULL,
    referrer_id text,
    referral_code character varying(20) NOT NULL,
    last_login_at timestamp(6) without time zone,
    last_login_ip character varying(45),
    login_count integer DEFAULT 0 NOT NULL,
    is_kyc_verified boolean DEFAULT false NOT NULL,
    kyc_verified_at timestamp(6) without time zone,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(6) without time zone,
    updated_by text,
    deleted_at timestamp(6) without time zone,
    deleted_by text,
    toin_account_number character varying(20) NOT NULL,
    "Password_hashed" character varying(255) DEFAULT 'Password@123'::character varying NOT NULL,
    total_referred integer DEFAULT 0 NOT NULL,
    status public."UserStatus" DEFAULT 'ACTIVE'::public."UserStatus" NOT NULL,
    email_changing_count integer DEFAULT 0 NOT NULL,
    phone_changing_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: withdrawal_requests; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.withdrawal_requests (
    id text NOT NULL,
    user_staking_package_id text NOT NULL,
    address character varying(255) NOT NULL,
    amount numeric(18,2) NOT NULL,
    currency character varying(10) NOT NULL,
    status public."WithdrawalStatus" DEFAULT 'PENDING'::public."WithdrawalStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    platform_fee numeric(18,2) NOT NULL,
    remark character varying(255)
);


ALTER TABLE public.withdrawal_requests OWNER TO admin;

--
-- Name: referral_milestones sequence_number; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_milestones ALTER COLUMN sequence_number SET DEFAULT nextval('public.referral_milestones_sequence_number_seq'::regclass);


--
-- Name: user_change_history_for_email_or_phone logId; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_change_history_for_email_or_phone ALTER COLUMN "logId" SET DEFAULT nextval('public."user_change_history_for_email_or_phone_logId_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7474deee-da46-4cbc-a4fb-346cdac83195	89faf039ae8817d7ef55fb78ce751f93d54ffb1d100011c87f4bf1b344841c4c	2026-02-25 08:11:28.677587+00	20251111065951_update_referral_mileston	\N	\N	2026-02-25 08:11:28.65004+00	1
b6aded81-1ea1-4fac-a293-3439d2d55879	561d613b0d967843246a095486ed6227689bbae7dcdbf1805cc90acd7257f79c	2026-02-25 08:11:27.671908+00	20251028091940_authentication_table_and_other_table_add	\N	\N	2026-02-25 08:11:27.478323+00	1
1fbd4fa1-3ca5-4419-ba8f-6c9af87c2929	4c69ce6c50787f42cbe90c2f79ec18d84938e3279ca5416355828fb334dfaf81	2026-02-25 08:11:27.863474+00	20251103055715_update_database_table_and_add_new_table	\N	\N	2026-02-25 08:11:27.674094+00	1
ff2fba62-a8fc-41cb-a94f-9bc70a9bcf05	fc843e407b1d1736fd9eb85153749214597ebc09ee247037f9211758ea68976a	2026-02-25 08:11:28.873597+00	20251126072443_referral_level_name_nullable	\N	\N	2026-02-25 08:11:28.868633+00	1
4db47521-d526-4bd1-bda4-5a660d989614	bbe3876b0d450b7c43651ba38c09387164835bc2b36be628bd74caa15df6befa	2026-02-25 08:11:27.877823+00	20251103061136_change_referal_history_to_referal_histories	\N	\N	2026-02-25 08:11:27.865127+00	1
c7a8227a-bbbb-4704-b68f-39ce3f7e94b4	cafd3f27525c3419c577d934a918c2994ece0ef8ef81d25229ef67c8757b3025	2026-02-25 08:11:28.68779+00	20251113092805_removed_official_annoucement_user_model	\N	\N	2026-02-25 08:11:28.678962+00	1
1588bc75-deb5-49e6-8848-16ca51e99bd3	6c401e762552671a9ef5f75534ee00fbfb5bf1910d3cc2a979ed1b70f58702fd	2026-02-25 08:11:27.983896+00	20251103063719_all_table_schema_naming_convension_update_and_regenerate_the_table	\N	\N	2026-02-25 08:11:27.87948+00	1
858f7444-e89c-4297-87a4-07eb96cbf120	a97f0f1ce06d370f5f11e43171e0e4792eadff6b7b689e522a40b3317730265a	2026-02-25 08:11:28.083187+00	20251103112732_update_database_some_table_and_add_new_user_toin_table	\N	\N	2026-02-25 08:11:27.985752+00	1
9fa046a8-e51a-47e8-accd-5b0ff005131f	d122d4d860ae7f8c9cb4d861f5e0c1b6b7fe804f83b134430b7c699f46f03dcd	2026-02-25 08:11:28.773046+00	20251123054550_add_new_two_column_transaction_table	\N	\N	2026-02-25 08:11:28.767923+00	1
026b4234-ecb8-435e-8ae6-e1f4b49fcc9b	eaef9a236e6b8be34cee9e7fc04646fcdc345a5d2e966ebf8379a1dfa9e04547	2026-02-25 08:11:28.12651+00	20251103120524_update_prisma_schma	\N	\N	2026-02-25 08:11:28.084691+00	1
26d37d12-b204-4738-8a70-92a31f8b208a	71a9d521eae5cb8e055e532b7018645779e081545e75735287bc0e16515730c3	2026-02-25 08:11:28.704179+00	20251113113320_updated_accouncement_table_field_data_type	\N	\N	2026-02-25 08:11:28.689429+00	1
d555adf5-4182-4ccd-a0b2-f35321fa9366	929530a7142bc7862e77d886414c79327bbe123c6c089a3d878edbe771a7643d	2026-02-25 08:11:28.140135+00	20251106081313_change_schma	\N	\N	2026-02-25 08:11:28.128244+00	1
d573d5c1-e0c9-42b5-96cc-51490464d6a9	a5b4b6cc367f15912afd752686a5e919a52c499f3f6ede80fb0ea020f523e7db	2026-02-25 08:11:28.612919+00	20251109071837_update_some_table_and_column_name_and_add_new_table	\N	\N	2026-02-25 08:11:28.142183+00	1
955c72ba-7298-4217-bfca-5f1b596cd0b9	5d67c38716e48317757d6560886c86c72c7bb4f804a79655ea411164422c453e	2026-02-25 08:11:28.620847+00	20251110101001_change_user	\N	\N	2026-02-25 08:11:28.614549+00	1
dfe396aa-bb9d-491e-b592-00d757e8dfe3	dc8af2c3a0dcff314b1b8c1bad8a3bb72b9277a5a9806a200302855d963d3ad6	2026-02-25 08:11:28.739007+00	20251115110836_add_ticket	\N	\N	2026-02-25 08:11:28.705846+00	1
8308004a-cae4-4157-abd8-dfb5391b1de9	9386aec96a98206ca0f9998b52521547e1465e0338557d8916644ef9b65662a1	2026-02-25 08:11:28.641727+00	20251110132244_update_toin_amount_field_data_type_at_referral_milestone_table	\N	\N	2026-02-25 08:11:28.622357+00	1
29752177-6da9-4809-a713-cab5d8376c5e	cf827b7b60e98090a72e21acde74aecdce61bf93b60d8339140e005a483418d9	2026-02-25 08:11:28.648535+00	20251110133514_update_drescription_field_name_into_description_at_referral_milestone_table	\N	\N	2026-02-25 08:11:28.643452+00	1
e9ef6b6d-e960-4e47-988e-fd905184691c	98197a07a203867ba542bccff0486828984895d40f419aab15d71d3b26210b88	2026-02-25 08:11:28.815586+00	20251124120920_change_default_vlue_true_to_false_user_staking_table	\N	\N	2026-02-25 08:11:28.80133+00	1
486529b2-8185-4c05-a7a9-5bd4fdad2817	9d6c31745cf3c4453d0b4ba76b1c19b5afd82f1199728710d8ca10f23553c57a	2026-02-25 08:11:28.780396+00	20251123080306_user_staking_package_table_add_new_column_and_change_transaction_status	\N	\N	2026-02-25 08:11:28.774614+00	1
73a69a63-140d-4f10-8cc9-d7c73d874bbf	cf827b7b60e98090a72e21acde74aecdce61bf93b60d8339140e005a483418d9	2026-02-25 08:11:28.745646+00	20251119094129_change_referral_mileston_column_name_and_ticket_table_column_name_rename	\N	\N	2026-02-25 08:11:28.740636+00	1
bfbbf409-36df-4ec0-bf49-461abaa88fdd	e493aca677bea2391997e6da6d9b2223009996b07771c3ddf1937ed646177a6b	2026-02-25 08:11:28.752352+00	20251120104505_transaction_table_column_name_change_type_to_trx_type	\N	\N	2026-02-25 08:11:28.747135+00	1
18a15d60-cd1f-4276-b33a-c0bda80a2fa6	9629f5034d016939e2c30a064330a9b1dfadd44bef5477658a3ee65e1574f4c9	2026-02-25 08:11:28.759601+00	20251120104927_system_setting_table_create_at_and_update_at_change	\N	\N	2026-02-25 08:11:28.753781+00	1
e5c7af0b-3fe8-4d9d-8a81-58984d4cb41c	65833801058323442fb26c5647de0116b6a2202216b8adbf7408f2b28f741355	2026-02-25 08:11:28.786496+00	20251123102357_add_thumbnail_to_tutorial	\N	\N	2026-02-25 08:11:28.781886+00	1
553e7e39-806a-46ca-8e37-49106052d136	4fc0375c1bd448e403650c51916bea42084e7d1e8731df8595ec7ec0ab805b2f	2026-02-25 08:11:28.766095+00	20251120111318_transaction_table_change_column_add_and_rename	\N	\N	2026-02-25 08:11:28.761182+00	1
0296e39b-2ff9-4479-acdd-c8e5678ad576	924eb50d5e97b4003d376e38450ebe4c67b064ed4833b5247ad718f32b191f5d	2026-02-25 08:11:28.853704+00	20251125104942_update_column_user_toin_table	\N	\N	2026-02-25 08:11:28.847341+00	1
f0ec0fd7-e473-4762-8503-104954636e5c	16c8e70d3bf7edd727fb1cca1d6bcb52c8c8969d331587fe4442a733da8a6aa6	2026-02-25 08:11:28.793276+00	20251124054907_change_spelling_bounce_to_bonus	\N	\N	2026-02-25 08:11:28.787937+00	1
f0c6cb3c-e545-4328-ae02-d8bc8783e180	afa56dfee197276e6c486e540c48cfad285207106838aa86c62c58251052ecca	2026-02-25 08:11:28.834853+00	20251125052803_system_settings_value_type_change	\N	\N	2026-02-25 08:11:28.817188+00	1
94fb3b27-d390-451e-8ae8-abcc82a62c3d	55946147aeefa8c711503fe64afddf11931cd7e69e620c315331e9bda22bb989	2026-02-25 08:11:28.799712+00	20251124101314_remove_relation_from_transaction_and_staking	\N	\N	2026-02-25 08:11:28.794717+00	1
a741654d-5b1b-451a-b34b-e82abc00e064	a5364a858510f36f9cad3d4dc5409fe6391afb9ec27b58fd97a4b273fddcbc96	2026-02-25 08:11:28.8456+00	20251125081205_add_version_column_into_the_user_toin	\N	\N	2026-02-25 08:11:28.836425+00	1
128933d0-d06b-4df3-9fde-1dc3ac8aaefc	5fdfce300f54b447be1dfbc9a6798355b5bdef2f05533310b4371de6517069ac	2026-02-25 08:11:28.867246+00	20251125105147_update_column_user_toin_table_v3	\N	\N	2026-02-25 08:11:28.862171+00	1
d244187d-6285-4ec5-8f1f-bec0e2930f1b	59eceae8c784aba487871990ab25763f117f91fb207de78858d336b6ae409f3f	2026-02-25 08:11:28.860668+00	20251125105102_update_column_user_toin_table_v2	\N	\N	2026-02-25 08:11:28.855344+00	1
b2a990a3-9af6-4747-b0fd-be7d274b8342	23035f0bfe6bec3186ef68cf64ea944d031586b82fd528ae1647e214243443e7	2026-02-25 08:11:28.879938+00	20251126084235_transaction_table_spelling_correct_and_add_a_new_column	\N	\N	2026-02-25 08:11:28.875067+00	1
5bd53de1-e9c5-4223-9872-3ba5c0ad2f0f	39c881a7c6bb20e92bf0402bca32488232f7fdca6950884cc9742f5021d64568	2026-02-25 08:11:28.886049+00	20251126084918_transaction_table_add_new_column_referred_user	\N	\N	2026-02-25 08:11:28.881487+00	1
7ef3bcc2-28e0-41de-a711-eab9c3d98128	62317668394c6f5a86473983975590381efb3dcafbe0975387e41c9836817de3	2026-02-25 08:11:28.892402+00	20251126095323_user_profile_remove_email_and_phone_column	\N	\N	2026-02-25 08:11:28.887552+00	1
caa8ef26-3580-4de7-a86b-5ed0d6a37113	bd6386899fe838675ad765992fea3d268377931579078e33d89f0d32da39509c	2026-02-25 08:11:28.898236+00	20251130052008_add_new_column_in_the_referral_milestone	\N	\N	2026-02-25 08:11:28.893807+00	1
0af43259-7dc1-41a3-a86e-5165ee1291a7	fdc38b0eab04b17a2cc2b7c7373031f4eab9ab5b4be0bfa4411a6c5997c2e40b	2026-02-25 08:11:28.907885+00	20251130073421_add_referral_mileston_new_column	\N	\N	2026-02-25 08:11:28.899735+00	1
c4377a8d-c88e-4965-b8bd-5147a1841e6b	49d4c506a5e767b43b5304c14660670c42e8f8457be8a1c00e02bb35351b33d4	2026-02-25 08:11:29.087699+00	20251221055432_add_transaction_new_column	\N	\N	2026-02-25 08:11:29.083172+00	1
7a9e8b8e-2c2e-4210-aa8d-86462a109cfa	442e0a825000b84ec114f2b8ecaec77529965ba42df8793c0b37ff36de810cf9	2026-02-25 08:11:28.914787+00	20251130074607_remove_column_get_the_bonus	\N	\N	2026-02-25 08:11:28.909593+00	1
28ac627d-3a51-4fc9-b986-d903da883ee1	8494711369e027a991a7113423485fa1afd2d14e98ad1151d9f0f0e27da95685	2026-02-25 08:11:29.008861+00	20251210063839_update_schema_for_relation_in_the_referral_level_and_staking	\N	\N	2026-02-25 08:11:29.002404+00	1
47ff2d71-e7c5-4bc6-ab7e-20b775de316b	d88c25b832f918f164c492fa66042e260f9dac5ca688d924a7919312c328fb8d	2026-02-25 08:11:28.920839+00	20251130074733_remove_column_get_the_bonus_v1	\N	\N	2026-02-25 08:11:28.916315+00	1
2b2def94-9007-4312-8510-7c50fe6b29b5	fc39896d0c2317aa0a2687e46e03fdf21f79b73e3c1cd42acd21ce53be51231b	2026-02-25 08:11:28.927345+00	20251201054126_referral_history_table_update	\N	\N	2026-02-25 08:11:28.922372+00	1
eaa5e2c6-0b7e-406e-8c4f-7f3debf05dd7	a47205e36ddd490eba5f25efcd438f0baea32ba2a2714dbe49d35f4b9bf02e3b	2026-02-25 08:11:28.933952+00	20251201124846_update_user_staking_package_table_data_type	\N	\N	2026-02-25 08:11:28.92896+00	1
032636ac-00a0-4c62-8b33-f59319e4debb	0bb6712e9973aea0c7d6215597c36a6dadbef1effd928182d059c9ca156ae5b7	2026-02-25 08:11:29.04277+00	20251210114342_change_user_toin_to_user_wallet	\N	\N	2026-02-25 08:11:29.010356+00	1
727503e9-21a7-452c-b942-7583be8847a9	4cf5f831ee39c13fb550ff6f99fe6bc82cf355dacfb0ce538b4b803debd24349	2026-02-25 08:11:28.940437+00	20251202055211_update_user_toin_table	\N	\N	2026-02-25 08:11:28.935417+00	1
11c69feb-0180-4ccc-bc79-2e218d1ec5a9	9340ce1f85ca14f4982faff07cbb34f65a1d1bdf046de215d9a16e1937799295	2026-02-25 08:11:28.946875+00	20251203065128_update_user_toin_table	\N	\N	2026-02-25 08:11:28.941944+00	1
60756147-9853-42ed-81c0-f7173ac8ecfa	c71d05f339d8f2fafe5bee3c2948d7be6af61b1209833da00a041ccc0ab48571	2026-02-25 08:11:29.259551+00	20260120054129_refactor_country_state_tables	\N	\N	2026-02-25 08:11:29.254131+00	1
4174e9d8-b603-4ebf-927e-55ce576368b1	27baebe588a507f786085ff5dfb916914ec168663891b6af2ff363a9e79f6432	2026-02-25 08:11:28.953089+00	20251208122012_update_user_staking_package_table	\N	\N	2026-02-25 08:11:28.948323+00	1
d8b0e592-6fcf-4dd2-9af5-8998d577220e	65f2b5b217b306a4e0479b52d643d8d83d5f6f3dd03155a681c76421d053ad2c	2026-02-25 08:11:29.049239+00	20251210115703_add_new_column_in_the_user_wallet_table	\N	\N	2026-02-25 08:11:29.044395+00	1
3e31a329-95bd-453a-9c4d-1af84812642d	4acd1e43d8d0c1d6728061790150b966b2d44581ebfd1e6dfad58c257e71b77c	2026-02-25 08:11:28.959595+00	20251208125737_update_user_staking_package_table_v1	\N	\N	2026-02-25 08:11:28.954674+00	1
954ab580-92de-4d80-8ecb-3c9ba3a58a2f	cfc520dfeb274093d47c7a9a3a846f1d450a4c824ef6aa827bb17c87fa5f49db	2026-02-25 08:11:28.965651+00	20251208134345_update_user_staking_package_table_v3	\N	\N	2026-02-25 08:11:28.961109+00	1
92474a8f-9a54-42fa-b70f-cc0fd9633026	dc08d3eb545108e4c5893483883d00b3147c2ecae0a32a1a5488fda4484b78dd	2026-02-25 08:11:29.094116+00	20251223053742_add_air_dorp_event_id_and_ticket_no	\N	\N	2026-02-25 08:11:29.089363+00	1
c1b0ecf9-b0d8-4601-a404-7fd87a2c495e	7fa4360cc6fbc0f517e6e1b3817fa3c9a773c4697dec7635d952fe7f7f41647f	2026-02-25 08:11:28.971701+00	20251208141537_update_user_staking_package_table_v4	\N	\N	2026-02-25 08:11:28.967013+00	1
39beaf03-79d8-420b-8eb8-49c329d229e9	3c5c6e75ddec2f6d9a8d5098e749bf92ec3b764ccf8906ca986364cde1695c60	2026-02-25 08:11:29.057911+00	20251215071202_make_relation_with_user_and_user_referred_and_more	\N	\N	2026-02-25 08:11:29.05076+00	1
5426ae35-8db8-41d9-bb2a-01c2c33f43e3	7a0a70331ace4313efa34586520e7af5a2f3cec497a3553037855453866e7a6c	2026-02-25 08:11:28.978346+00	20251209083221_update_user_staking_package_table_v5	\N	\N	2026-02-25 08:11:28.973351+00	1
58eb8937-9347-4fc2-aed2-48f038332d3f	d005bd1c264debbd3f66c8a206689ba1ac5677f8a1d8ea170c3f8498239e0f3b	2026-02-25 08:11:29.000573+00	20251209131412_remove_relation_user_and_request_response_table	\N	\N	2026-02-25 08:11:28.979835+00	1
25d94abb-15e4-4831-a95d-32611a47df0b	56af30ea4023ff655eecb13c5e7119b7585adfe6f2b31c29edad28dee48ad18f	2026-02-25 08:11:29.063793+00	20251216065556_add_new_coulmn_in_user_staking_table	\N	\N	2026-02-25 08:11:29.059425+00	1
e8822c90-5c8d-482e-b4b9-aabfbcddeb49	fc731605a0ab68532deeef0c6ac4249ade425efc24d3d7d4968fd6ab9068a635	2026-02-25 08:11:29.17643+00	20260107044537_update_table_user_change_history_for_email_or_phone	\N	\N	2026-02-25 08:11:29.160516+00	1
67fa8862-50b0-4063-8484-42bf8856eb88	a672501475cfa0f6f2ea0681808113f395d6dbba4b67058a64d02fb11618652f	2026-02-25 08:11:29.074902+00	20251217101519_change_user_table_status_field_datatype	\N	\N	2026-02-25 08:11:29.06553+00	1
83316b11-1109-4ba1-89bf-04eb61f74a71	abea67ca6c4d3bf7c6db020936ab0d771af1006993a7420ae71fbc237e59e7d9	2026-02-25 08:11:29.100746+00	20251224112621_add_new_column_in_user	\N	\N	2026-02-25 08:11:29.095594+00	1
435ad917-f165-4ebc-96ed-9df303961f08	c95e059fdf89439657fa2864196716e796609614df7431fa51b71b75550fc7c8	2026-02-25 08:11:29.08167+00	20251218093530_add_transaction_tablee_self_join_trx_reference_id	\N	\N	2026-02-25 08:11:29.076489+00	1
443fe0f2-a922-4002-8092-f6f7c72497c5	0502c0412ca3bac6ddacea34d150b5b6eefd3536a2f4ac4ddd5409e95368f597	2026-02-25 08:11:29.218767+00	20260112123632_update_user_table_remove_two_column	\N	\N	2026-02-25 08:11:29.213212+00	1
95ad576f-1ec5-4802-9563-d641902ade6f	6cfceaea64473891e21aeb5d7710a6b6206b1cb5c34289bf054ac233ec874d72	2026-02-25 08:11:29.124366+00	20251229105557_add_notification_table	\N	\N	2026-02-25 08:11:29.102232+00	1
af810cab-9470-4941-a21b-d83c6cf39f1a	8508028fbc2ddeb4f0765ad5f792e82f906d2f7960dbbf25d7eb72d054dfe268	2026-02-25 08:11:29.204507+00	20260111063115_update_userchange_historyfor_email_or_phone_column	\N	\N	2026-02-25 08:11:29.178021+00	1
02593251-fb48-4200-ba65-9e5b981c8ffa	fcc40a8eaab0c046bcc2f64a9646186cb0ec7e443a847b90516b7f55a6e846d7	2026-02-25 08:11:29.131295+00	20260101134605_add_2_column_in_the_user_table	\N	\N	2026-02-25 08:11:29.125871+00	1
99cd956f-ae3e-4dae-a71c-ce50a7e8baaa	609bb31057280f38d843608a19a719df0a791689ac9c1efda623bec91272974c	2026-02-25 08:11:29.158764+00	20260107042517_add_table_user_change_history_for_email_or_phone	\N	\N	2026-02-25 08:11:29.132766+00	1
a90218e2-dfab-4e28-8dbc-f9805946b15b	8d91f90380ce0f978dabd78b3a737306b215daa93768b0d9312b4c90d4f23454	2026-02-25 08:11:29.211484+00	20260111064834_update_userchange_historyfor_email_or_phone_table_add_new_column_requested_at_and_remarks	\N	\N	2026-02-25 08:11:29.206292+00	1
5d02145d-ad77-4201-a256-89d138d66f1f	3ec802b1369cf8c7a9e984136341590ca3c75f501f07c53661309576bfd31385	2026-02-25 08:11:29.252578+00	20260119051307_add_user_wallet_addresses_table	\N	\N	2026-02-25 08:11:29.237953+00	1
bbcebf50-f8e5-43a6-bc89-0f46340f1a16	6eede64d15426a641e7ca15279fcb5496be6a4d33d4d9fbd7c2794a6be68d34f	2026-02-25 08:11:29.236384+00	20260117111928_add_withdrawal_request_model	\N	\N	2026-02-25 08:11:29.220507+00	1
06416525-184c-4c7c-9f89-ce5efe6fce4c	f121f9c830086dfebf3dc8a2043f7d66c5b273d6bf1f49035299a6b1102d7779	2026-02-25 08:11:29.265958+00	20260121113056_add_fee_remarks_in_withdrawal_request	\N	\N	2026-02-25 08:11:29.261056+00	1
4f2c6468-3dc0-4e46-9912-ffd37285f0a8	539989d597d9886f23d5d4c9a995153d9c8c4d5f48d5459245bc2a4ffc8a8d4c	2026-02-25 08:11:29.272194+00	20260201070512_add_staking_adjustment_transaction_type	\N	\N	2026-02-25 08:11:29.267519+00	1
c389a0b2-725f-415f-96f3-0cf7c21f26d0	41a60c3bbca326dad24e0e6ae21e1c20a15cc52a6c0dcbc7b1486b5ac7f73ad3	2026-02-25 08:11:29.290604+00	20260203091458_add_staking_adjustments_table	\N	\N	2026-02-25 08:11:29.273727+00	1
dce1e161-d8e0-465d-a5d8-9c49b41d107e	c80d2b9b9d377109099261fac2abea9117293da04bd296e08cf4b2fccd36f300	2026-02-25 08:11:29.296923+00	20260209061957_add_remarks_in_user_staking	\N	\N	2026-02-25 08:11:29.292309+00	1
6ff0a3d0-85e8-43b1-b8a8-6f56ed79d0e8	4f6008fe43b153e99ce84801c6e39ba1edda92194847bf2da59696d8d0e2cc61	2026-02-25 08:11:29.324199+00	20260209100220_add_referral_hierarchy	\N	\N	2026-02-25 08:11:29.2985+00	1
5fa7cc53-64fc-4cb4-9a87-7d0ff8615d73	bbe4b38f9061f0eefd42f929adb0c0f54765102d14645baf0a3703ab0021bef0	2026-02-25 08:11:29.331342+00	20260219085118_add_stake_created_by_in_user_staking_package	\N	\N	2026-02-25 08:11:29.325968+00	1
335a75ea-d14b-424f-b2c3-7b4e33a3533c	f3ea692c59037069a22f30ad59a31f2d6ab4139ce214e7bcb827cc916f0101e4	2026-02-25 08:11:29.340677+00	20260301100520_define_relationship_between_user_and_user_staking_package	\N	\N	2026-02-25 08:11:29.33492+00	1
0480395e-bf47-4d16-92e7-0d7c4156a109	6173eee0e892cadb0aed5cc5a531cb85d9dcee3ca51295fcea97144dc52527db	2026-02-25 08:11:29.347573+00	20260301110756_define_relationship_between_user_staking_package_and_transaction	\N	\N	2026-02-25 08:11:29.342167+00	1
a8728284-cfc7-4895-8502-4abb8481ff29	42abc872dbb9b1cadcd8dd56385f468d1fbd598cbc4646460da24dddbeb7c886	2026-02-25 08:11:29.354455+00	20260301110756_remove_transaction_from_staking_package	\N	\N	2026-02-25 08:11:29.349299+00	1
c7eb9e56-854f-4875-804b-44d853e6d9bb	f67d264e09754dc1784ddecd009ec436a36307692c635d66696b796331d626c3	2026-02-25 08:11:29.372703+00	20260301110757_remove_unnecessary_column_from_transaction	\N	\N	2026-02-25 08:11:29.356219+00	1
441c8730-8fe3-48c6-a1e8-78b378757b9f	af78422f5ddbd9ed9d47d2df462fcbd12029c538e2fc0683eda1bbbe99312bd3	2026-02-25 08:11:29.379265+00	20260301110758_rename_column_in_transaction	\N	\N	2026-02-25 08:11:29.3743+00	1
\.


--
-- Data for Name: air_drop_events; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.air_drop_events (id, event_name, total_amount, used_amount, usd_conversion_rate, event_start_date, event_end_date, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
00000000-0000-0000-0000-000000000001	Air Drop Event 1	100000000.00	0.00	0.010000	2024-01-01 00:00:00	2024-12-31 23:59:59	t	2026-02-25 08:11:37.453	system	2026-02-25 08:11:37.453	system	\N	\N
\.


--
-- Data for Name: announcement_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.announcement_categories (id, name, description, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: challenge_histories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.challenge_histories (id, user_id, challenge_id, challenge_status, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: challenges; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.challenges (id, challenge_title, description, start_date, end_date, reward_toin_amount, post_details, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: community_events; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.community_events (id, title, description, event_date, location_name, address, map_link, event_link, banner_image_url, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, "eventType", event_location, "isFeatured") FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.countries (id, name, code, phone_code, currency_code, is_active, created_at, updated_at, created_by, deleted_at, deleted_by, updated_by) FROM stdin;
6910b150-3f64-4d58-94a8-4fb609ab2092	Afghanistan	AF	93	AFN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
94a9750b-0187-46e8-ab01-911a521f71e3	Aland Islands	AX	+358-18	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d363a264-bc07-470f-9d59-b9f067037da6	Albania	AL	355	ALL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c002dabd-f648-4686-bac0-473421d657d5	Algeria	DZ	213	DZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2b13898c-3d64-4e40-965c-ee6c777f9c36	American Samoa	AS	+1-684	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0d317748-cd41-4c54-93e5-a722524e819e	Andorra	AD	376	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
69de19ca-58cc-480c-a69b-d8fdf97e5a28	Angola	AO	244	AOA	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d6283658-4494-46f8-afb8-6c20be6af706	Anguilla	AI	+1-264	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
9fbca82f-094a-4a83-a046-daf04020e1b4	Antarctica	AQ	672	AAD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Antigua And Barbuda	AG	+1-268	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8cebbefa-9749-4e6b-a211-02ec392c7b60	Argentina	AR	54	ARS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Armenia	AM	374	AMD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
32f36e80-03b5-4218-a343-0a1f04c3ce5a	Aruba	AW	297	AWG	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fa94efa7-8d67-450b-9677-bd7da310be27	Australia	AU	61	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Austria	AT	43	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Azerbaijan	AZ	994	AZN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	The Bahamas	BS	+1-242	BSD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7cbd0171-f2f8-47a3-93a2-625196c10792	Bahrain	BH	973	BHD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
753b0c6e-3ba7-46f5-8598-c037d2f5a169	Bangladesh	BD	880	BDT	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Barbados	BB	+1-246	BBD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
32e7ea69-752f-40ae-9ad6-395b3b500e91	Belarus	BY	375	BYN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b6fd9594-9e5d-4c93-92c0-bc7f23088710	Belgium	BE	32	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
26769484-d319-40eb-af78-0495c42bf036	Belize	BZ	501	BZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
be174bb6-3a7f-417a-959f-08b5b740b2fd	Benin	BJ	229	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5261260d-5fc2-4388-9ca7-c361a8b5c889	Bermuda	BM	+1-441	BMD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Bhutan	BT	975	BTN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Bolivia	BO	591	BOB	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
12b09b09-f48e-4764-b1fc-fcf96735b31f	Bosnia and Herzegovina	BA	387	BAM	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2bbdd538-f109-423f-8d19-345d7bf8f999	Botswana	BW	267	BWP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
23047b50-84e1-4428-bb7f-033e2dd3e0b3	Bouvet Island	BV	0055	NOK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Brazil	BR	55	BRL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
035b6258-c6ac-425e-b8c2-8107391de166	British Indian Ocean Territory	IO	246	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b11e8488-688b-4320-96ee-29841c8d7275	Brunei	BN	673	BND	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
015df332-d06f-47e1-ae02-f74948540099	Bulgaria	BG	359	BGN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fda12e1f-c320-4fa1-b1c8-f017572df746	Burkina Faso	BF	226	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fd7c7222-b897-486d-8d74-a2dd88bd5cec	Burundi	BI	257	BIF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
aae306c2-a05d-4121-985a-f0096b4d7892	Cambodia	KH	855	KHR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ed9b3483-7d19-4387-928a-16bd68027abb	Cameroon	CM	237	XAF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Canada	CA	1	CAD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
52ffdcbe-0e73-4719-89fa-dd4de363a165	Cape Verde	CV	238	CVE	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4619b77a-8a7b-4552-b953-6cab194c196a	Cayman Islands	KY	+1-345	KYD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
70ac283b-7d82-41d9-8ae4-7d9698ffb864	Central African Republic	CF	236	XAF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d2ec6fde-ba03-4e26-985a-92c67886c928	Chad	TD	235	XAF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c6d50a93-0ed5-41e2-8442-9bca375e41e0	Chile	CL	56	CLP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a2793e29-8956-4baf-950e-c17f15317bfe	China	CN	86	CNY	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4a490ee4-aaa3-4d82-98c2-5c700c92d3f2	Christmas Island	CX	61	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
21055b61-5bdd-4bf2-af7f-f0cd8f2d2852	Cocos (Keeling) Islands	CC	61	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
71a2a4f7-b399-4cbd-a091-07e2b30a605c	Colombia	CO	57	COP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b30b6346-a5d8-4589-ab9c-b69664f7e8e3	Comoros	KM	269	KMF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0a982ee7-e18a-4730-8901-22a54786ca12	Congo	CG	242	XAF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ea85e39a-53a6-4902-8305-590e3304aa5d	Democratic Republic of the Congo	CD	243	CDF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
bb7941f4-b8d2-474d-87a4-ee954224b91a	Cook Islands	CK	682	NZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Costa Rica	CR	506	CRC	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
297eb1b4-b11e-4aee-99ca-68a859259b3f	Cote D'Ivoire (Ivory Coast)	CI	225	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ae75d726-cc8c-48cc-8373-1516010f1408	Croatia	HR	385	HRK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Cuba	CU	53	CUP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d7d74f41-f20e-4db3-9c4e-106e8726b122	Cyprus	CY	357	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
165347e1-1ec2-4ead-9a24-815ab0166e81	Czech Republic	CZ	420	CZK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4b42526b-56f1-4ae2-9dd2-27f36093cffd	Denmark	DK	45	DKK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Djibouti	DJ	253	DJF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Dominica	DM	+1-767	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
58f0d7b4-23f0-419d-b740-ff51572a8b02	Dominican Republic	DO	+1-809 and 1-829	DOP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e4743e20-63bc-4940-a1b0-1569d2e8b1f2	East Timor	TL	670	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ec9085f3-896d-4f38-a064-7e14cc23f400	Ecuador	EC	593	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a104fcdb-d445-46b3-9f95-80df57697683	Egypt	EG	20	EGP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
6371a41f-73d5-456f-8932-45992e432fc0	El Salvador	SV	503	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Equatorial Guinea	GQ	240	XAF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a9f7d533-82c9-4476-836d-ac60e3221997	Eritrea	ER	291	ERN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
6b859a11-05d6-493f-84eb-1360f0493c47	Estonia	EE	372	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
1289c32b-b3f0-4833-8dc9-c65ec766d06f	Ethiopia	ET	251	ETB	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5200b847-93c6-439f-b49d-820ab47ee770	Falkland Islands	FK	500	FKP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fb3bcd58-3a88-4780-925f-2ae26e821a4a	Faroe Islands	FO	298	DKK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4671149e-abf6-4a3e-9b88-63c64ca007b9	Fiji Islands	FJ	679	FJD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
da262717-6cf7-416d-8f2e-f3a6bdde12a3	Finland	FI	358	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7e190525-1ad3-45d5-9cc3-a72ecb552012	France	FR	33	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
f7b16d7f-536f-438a-b795-49d037956024	French Guiana	GF	594	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d8eb9023-a642-48c5-9c86-003cfa02e400	French Polynesia	PF	689	XPF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b38b7a32-1270-455f-83d4-a5956be726b3	French Southern Territories	TF	262	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
348a47da-0436-4da5-954b-625d0237878f	Gabon	GA	241	XAF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b730bf01-a091-4406-8aff-2ffdd1987607	The Gambia	GM	220	GMD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Georgia	GE	995	GEL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
3a607480-35fd-4347-937f-6cd2ad81d51e	Germany	DE	49	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Ghana	GH	233	GHS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c9a1f9e0-2c72-445e-a146-0485921912c0	Gibraltar	GI	350	GIP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a896d507-abf5-4173-8c66-0c147815f277	Greece	GR	30	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5b2bf1ab-2f07-4e3f-8f12-6f9252a2a746	Greenland	GL	299	DKK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
541717da-2815-403d-b922-29dea4e9892e	Grenada	GD	+1-473	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a0c89f7d-9d04-4201-b10f-51e3b6143745	Guadeloupe	GP	590	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b46d4314-477b-423b-b6b6-a48837e8e35a	Guam	GU	+1-671	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Guatemala	GT	502	GTQ	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
6a721166-d74a-4b45-a49a-930aa3009fd7	Guernsey and Alderney	GG	+44-1481	GBP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
447d5059-0194-4c27-9c85-6ad3031591d5	Guinea	GN	224	GNF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
52fd40a1-53e9-4c43-84f7-cd9447498ad2	Guinea-Bissau	GW	245	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
cf42bf36-b453-4f10-ac61-4ba5138c666d	Guyana	GY	592	GYD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
f4c780dc-3dd6-4d70-831a-e153d4b54c57	Haiti	HT	509	HTG	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e96d251c-2083-4023-9561-6fa1b4bf386c	Heard Island and McDonald Islands	HM	672	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
3c9a7870-a718-4e8d-bc48-2f0103bb0733	Honduras	HN	504	HNL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4c30fba5-1a83-4772-b1a5-cd827716d947	Hong Kong S.A.R.	HK	852	HKD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Hungary	HU	36	HUF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fd8bc807-ede3-43c8-bba6-084535610b94	Iceland	IS	354	ISK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c3621391-f0be-4cb3-80d6-1ffaac440c61	India	IN	91	INR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Indonesia	ID	62	IDR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
dff389d1-0969-4d8b-8edc-7593f56b9a3c	Iran	IR	98	IRR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8c4aca66-9f99-447b-9671-60020cbcbbe4	Iraq	IQ	964	IQD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Ireland	IE	353	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4ac1cb99-fa66-48d3-9d80-014b01041e7f	Israel	IL	972	ILS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b9571bc9-03c4-4256-8752-49d9e36e77b6	Italy	IT	39	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Jamaica	JM	+1-876	JMD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
f69f653c-1ace-445b-b985-07b9599b739c	Japan	JP	81	JPY	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
802e8095-7a89-43fc-badd-15cd7cf6113f	Jersey	JE	+44-1534	GBP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
abf2efb4-e689-4ea8-a736-f958eb57df70	Jordan	JO	962	JOD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
91d5a77a-8f46-4be1-a961-22fa88c16a07	Kazakhstan	KZ	7	KZT	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b8915397-43a7-4f6b-8781-6193e02ff9bb	Kenya	KE	254	KES	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
03f258af-a1f3-43d0-b02e-d3e5585498cb	Kiribati	KI	686	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2ab2998a-8616-43bd-a2fc-bfcd266599d5	North Korea	KP	850	KPW	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
779cfcc9-a252-4ade-83ba-95dec1554a42	South Korea	KR	82	KRW	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
3d211681-2665-41db-b1a8-894f7555afd0	Kuwait	KW	965	KWD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
406cc5bb-b3bd-47c4-9ba1-b06742404823	Kyrgyzstan	KG	996	KGS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8da77644-7ac9-4424-864d-d1f0f10b87ce	Laos	LA	856	LAK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Latvia	LV	371	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Lebanon	LB	961	LBP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Lesotho	LS	266	LSL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8ad9ac47-7360-425e-b100-def064b5c153	Liberia	LR	231	LRD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
4d2e629c-848d-497f-b345-82959acd8487	Libya	LY	218	LYD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0726044c-f9ec-4d95-92c4-3f6f904bfec3	Liechtenstein	LI	423	CHF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
33b5fc4a-499c-4d82-b829-f2fc99680209	Lithuania	LT	370	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Luxembourg	LU	352	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b96861b8-ca55-4982-ab22-535aec9b05c0	Macau S.A.R.	MO	853	MOP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c8d9969e-493b-48b4-93a0-e928498d86f9	Macedonia	MK	389	MKD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5cac5c76-8379-4fae-a6dc-c29978a7cd34	Madagascar	MG	261	MGA	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a9120fe8-9c20-4da9-8b31-33cb6a43481d	Malawi	MW	265	MWK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Malaysia	MY	60	MYR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7d510705-5c1e-4fed-8010-9f9cc8a384aa	Maldives	MV	960	MVR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
73015c4b-11cf-4112-b270-70bd3212dd9b	Mali	ML	223	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e047b247-c0d4-4fd5-a49b-fab9670aaaba	Malta	MT	356	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
3c27f80b-9bf9-486f-b0da-b332323747a8	Man (Isle of)	IM	+44-1624	GBP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
368a92ff-ac7a-440f-8b5a-a4d6d893dfd1	Marshall Islands	MH	692	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
286325cb-ea81-4e9f-bb08-b354e7d349a3	Martinique	MQ	596	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
708e8990-5f8f-4193-a4fc-708f4c2654f0	Mauritania	MR	222	MRO	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Mauritius	MU	230	MUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
49998461-80df-41d9-b21a-ec0baeffdb75	Mayotte	YT	262	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e624460a-91fd-4186-9245-1365b47bbcb6	Mexico	MX	52	MXN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
471c12a7-00a5-4cad-aa14-bacb1984bd17	Micronesia	FM	691	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Moldova	MD	373	MDL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
40e76cb5-73a2-48ce-9be6-ab2a6851f300	Monaco	MC	377	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Mongolia	MN	976	MNT	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ef321955-54d1-4083-ae80-af2b5c09b6de	Montenegro	ME	382	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2e6ebbbc-540d-4e91-b2b5-8aba28a4d7c4	Montserrat	MS	+1-664	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
822e04c1-3671-4692-83a8-55ddba26c7a7	Morocco	MA	212	MAD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
37ae1896-a105-41a1-b3ec-d6af7741975e	Mozambique	MZ	258	MZN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Myanmar	MM	95	MMK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ae1562ec-c62a-4318-bcbf-53d6778e75ea	Namibia	NA	264	NAD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Nauru	NR	674	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Nepal	NP	977	NPR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
23410008-fcb8-44a2-af36-004a0277194e	Bonaire, Sint Eustatius and Saba	BQ	599	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Netherlands	NL	31	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
cb42f636-a823-47d5-b249-06d08cb39b42	New Caledonia	NC	687	XPF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	New Zealand	NZ	64	NZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Nicaragua	NI	505	NIO	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
866d8f70-b2e3-4281-bb41-0f76ff2f9315	Niger	NE	227	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Nigeria	NG	234	NGN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
883ad3eb-e6ee-4321-91ae-a8494c800e76	Niue	NU	683	NZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7a24f9ea-f855-453c-a1a4-81184e772b71	Norfolk Island	NF	672	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
932a74d1-fc79-4a18-bb6b-08be71a2ffb2	Northern Mariana Islands	MP	+1-670	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ab79045f-569c-4be3-a39e-3f73fadfb6b7	Norway	NO	47	NOK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Oman	OM	968	OMR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Pakistan	PK	92	PKR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
432c1cfa-b97b-4a97-8254-0840e6577980	Palau	PW	680	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
192341cf-a301-4700-b831-208f9fe35ec3	Palestinian Territory Occupied	PS	970	ILS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
f528827c-9963-4bc2-a892-98713bff3e09	Panama	PA	507	PAB	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
582364f4-772c-4db1-9ee9-a0905831fd73	Papua new Guinea	PG	675	PGK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
110cc0d3-6f7c-4760-b50a-684acd34f7e3	Paraguay	PY	595	PYG	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5cf8ee0c-7848-4d9f-806d-8150632c0572	Peru	PE	51	PEN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
654b8e64-161b-402b-82ba-2ff13d04371c	Philippines	PH	63	PHP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
97d0a311-aff0-4b39-83e8-428b89549e90	Pitcairn Island	PN	870	NZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c2a87456-a3df-407a-afbe-800e99717517	Poland	PL	48	PLN	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0ae0e1df-6e54-42d8-aaff-d9ad00246913	Portugal	PT	351	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
217b19b5-edd7-433b-9e41-4e63af00b422	Puerto Rico	PR	+1-787 and 1-939	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
3b3f3f2b-62e1-4126-8a6a-94708113a30d	Qatar	QA	974	QAR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5d3c2d46-e5e3-467e-817b-6b649ce7a450	Reunion	RE	262	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Romania	RO	40	RON	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Russia	RU	7	RUB	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c54ecca1-d57a-4586-9184-6bec60c9b9dc	Rwanda	RW	250	RWF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a64f5819-9ce9-4335-a698-836f159989cd	Saint Helena	SH	290	SHP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
450e7d9e-39be-434c-966d-10a07cb75f46	Saint Kitts And Nevis	KN	+1-869	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
06f3f1b9-4308-403b-a0b2-866579002721	Saint Lucia	LC	+1-758	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ce3fec02-3537-4731-9215-6e44d22c13fd	Saint Pierre and Miquelon	PM	508	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Saint Vincent And The Grenadines	VC	+1-784	XCD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
47dceb98-bde2-4380-88fc-cba573371b96	Saint-Barthelemy	BL	590	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
430383e4-0c1d-4bed-b0ee-188da4e72c95	Saint-Martin (French part)	MF	590	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b180a953-a82f-4138-bbe6-ad46be5c41c8	Samoa	WS	685	WST	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	San Marino	SM	378	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
cdd4bd2c-bf1e-4e02-a82f-36d481b7a2d0	Sao Tome and Principe	ST	239	STD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Saudi Arabia	SA	966	SAR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Senegal	SN	221	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5b414e04-7456-44ec-993b-bb71184b96eb	Serbia	RS	381	RSD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
31f4e4af-cf82-46f0-889c-7859ad62be64	Seychelles	SC	248	SCR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d5feb683-812c-4cee-ac4e-83f847c5581a	Sierra Leone	SL	232	SLL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
68dca18a-e1b6-468c-9941-1fd69a022b7d	Singapore	SG	65	SGD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b3895137-436a-4f59-a5ac-241876161598	Slovakia	SK	421	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5f71a9a2-0423-4fb8-b314-c07ecce5b914	Slovenia	SI	386	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5f54b4c1-8b09-4237-8987-b5379227982c	Solomon Islands	SB	677	SBD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5ef44673-badf-4f8f-90a9-c82da38fe2e5	Somalia	SO	252	SOS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	South Africa	ZA	27	ZAR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
59f76450-5749-4a02-a3c2-d1c3438a8863	South Georgia	GS	500	GBP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
2724c68c-0027-4be0-8846-ec381ef4c5bd	South Sudan	SS	211	SSP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
42e74f21-ee87-4d06-9313-99945b3311f4	Spain	ES	34	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
83183373-a557-4e8e-bfed-85cecdafec99	Sri Lanka	LK	94	LKR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
305f9574-0313-406e-a5b9-62a2b3320546	Sudan	SD	249	SDG	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
9365ab24-b5f4-4111-aa84-5bfce45737d7	Suriname	SR	597	SRD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b52148f9-d889-4768-a6ce-4ab0559d166e	Svalbard And Jan Mayen Islands	SJ	47	NOK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
85bea4b5-26fe-4223-99d5-555de66f08c8	Swaziland	SZ	268	SZL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
6359fcc3-572c-4568-8a30-3f12b4ecd682	Sweden	SE	46	SEK	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d76dda55-9970-4da1-a383-f21ccfb0da4f	Switzerland	CH	41	CHF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
37c654d2-27bb-4cb9-9e2e-d6295a968edf	Syria	SY	963	SYP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
336e6e5e-009b-4d42-a13e-2698075ab2c4	Taiwan	TW	886	TWD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
85e4e3ae-fb7a-4423-a3b5-40a36117e45b	Tajikistan	TJ	992	TJS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
34524f7e-6a51-4b20-8b4c-85e07e096da4	Tanzania	TZ	255	TZS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
003d7a13-2a85-4f59-ac0d-086626675ac8	Thailand	TH	66	THB	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a3a07c37-6aff-49fa-8452-476e540b849b	Togo	TG	228	XOF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
23d82616-24c9-43fa-b41e-fc64178c5577	Tokelau	TK	690	NZD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
90e6041b-6ff3-456c-ba45-01b79518dc3b	Tonga	TO	676	TOP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ead28f24-e8bd-439a-b119-b04ae97a4280	Trinidad And Tobago	TT	+1-868	TTD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Tunisia	TN	216	TND	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
b7f7a8da-4fd0-484d-8608-6bff39e7376f	Turkey	TR	90	TRY	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
1c9d54fb-02e1-429f-bda7-fbf449442bae	Turkmenistan	TM	993	TMT	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
8b2e9e60-fa65-45d5-af15-751d22c3d67d	Turks And Caicos Islands	TC	+1-649	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Tuvalu	TV	688	AUD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
cd9e2f92-8912-4711-931b-1bb712920a8c	Uganda	UG	256	UGX	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7f3e136d-0b01-405b-9d8a-0d69bdafb749	Ukraine	UA	380	UAH	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	United Arab Emirates	AE	971	AED	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0b14b530-6931-4a96-9bd7-3be9eaefb427	United Kingdom	GB	44	GBP	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
be39de9f-351d-403c-9978-092cfa18e734	United States	US	1	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0a15ff4b-d60a-45cf-bdc6-7aa1d3c87dd3	United States Minor Outlying Islands	UM	1	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
9077c214-59a9-49a4-b5a4-bed9c6e4c965	Uruguay	UY	598	UYU	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Uzbekistan	UZ	998	UZS	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Vanuatu	VU	678	VUV	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ef869bb5-0021-47be-93a6-146ab0219463	Vatican City State (Holy See)	VA	379	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
0eedea10-2c5b-4a19-bb15-3ec898f1b720	Venezuela	VE	58	VEF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
c1e9f47a-ae89-44a7-a012-48dd3578fecf	Vietnam	VN	84	VND	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
efc254ec-2a49-4591-aa36-0c6851ee527c	Virgin Islands (British)	VG	+1-284	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
6a94e8e7-02a0-4b4e-ab57-c0e6e2164c9f	Virgin Islands (US)	VI	+1-340	USD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
adac6a45-a450-4a7e-90d5-d915b8bf0520	Wallis And Futuna Islands	WF	681	XPF	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
ea29f108-093f-4222-b55a-7e3ce598847b	Western Sahara	EH	212	MAD	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
de189fea-a220-48e3-8ff0-dc6dd1062606	Yemen	YE	967	YER	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
47672dcc-1cb3-45b7-8030-5302834a9da2	Zambia	ZM	260	ZMW	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
92735f77-b2dc-4cc8-a9de-2152216d2d0c	Zimbabwe	ZW	263	ZWL	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
e481aed1-b950-43ae-99c1-943c9f13f826	Kosovo	XK	383	EUR	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
a032004a-e055-4622-9e66-53b6c039d1c2	Curaçao	CW	599	ANG	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
1ccde161-67da-48a4-a5fb-3b5dee7b6673	Sint Maarten (Dutch part)	SX	1721	ANG	t	2026-02-25 08:11:36.398	2026-02-25 08:11:36.398	\N	\N	\N	\N
\.


--
-- Data for Name: menu_and_permission_setups; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.menu_and_permission_setups (id, parent_id, head_title, level, title, icon, type, horizontal_list, path, bookmark, feature_name, controller_name, method_name, method_type, application_name, application_base_url, menu_sequence, is_visible, show_in_menu_item, allow_anonymous, restriction_allow, is_active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.notifications (id, user_id, type, title, message, data, is_read, read_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: official_announcements; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.official_announcements (id, title, message, start_date, end_date, is_active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by, category_id, audience_type) FROM stdin;
\.


--
-- Data for Name: referral_commission_histories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.referral_commission_histories (id, user_id, referral_level_id, level_name, toin_amount, transaction_date, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, level_number) FROM stdin;
\.


--
-- Data for Name: referral_hierarchy; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.referral_hierarchy (id, user_id, ancestor_id, level, created_at) FROM stdin;
\.


--
-- Data for Name: referral_histories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.referral_histories (id, user_id, referral_milestone_id, referral_code, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, referral_user_id) FROM stdin;
\.


--
-- Data for Name: referral_levels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.referral_levels (id, level_name, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, level_number, referral_bonus_percentage) FROM stdin;
694f88da-972f-45fa-bef8-1b162016fa70	Level-1	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	1	5
e215a790-01ad-4b8f-8be7-2c065df3aa41	Level-2	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	2	2
ff648862-be74-4f8f-a3aa-f62f2edfd9b4	Level-3	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	3	1
619e5214-8a9b-423b-b428-e7ae6b93aab6	Level-4	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	4	1
81460921-a36c-4e8f-846b-66157b2d5897	Level-5	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	5	1
6d5179f4-e8f6-4b10-9041-8600b22dc859	Level-6	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	6	1
539ed76d-13e7-463d-9f57-f037a2e98217	Level-7	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	7	1
48f12e53-4b84-4e7e-bc67-b0da3215c440	Level-8	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	8	1
0a4aeaea-694f-4514-9633-15f44d5496a7	Level-9	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	9	1
e408e583-8148-4e5e-9e06-bc519b7b20af	Level-10	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	10	1
48f95e40-f96a-4823-afa1-de022d2f547e	Level-11	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	11	1
6c122ceb-4f1d-4eb4-b7d1-2c886a05a98e	Level-12	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	12	1
76039d8b-16c5-4d86-9d68-2efa474a1412	Level-13	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	13	1
3e0403e4-0acf-4395-b1a0-2e46912fce82	Level-14	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	14	1
4bfd6f18-e956-451f-b7b0-8e034b50d2af	Level-15	t	2026-02-25 08:11:37.448	system	\N	\N	\N	\N	15	1
\.


--
-- Data for Name: referral_milestones; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.referral_milestones (id, referral_name, toin_amount, target_person, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, per_user_milestone, description, sequence_number) FROM stdin;
11111111-aaaa-bbbb-cccc-000000000001	Bronze	100.000000	3	t	2026-02-25 08:11:37.437	system	2026-02-25 08:11:37.437	system	\N	\N	1	Bronze level referral milestone	1
11111111-aaaa-bbbb-cccc-000000000002	Gold	500.000000	5	t	2026-02-25 08:11:37.437	system	2026-02-25 08:11:37.437	system	\N	\N	1	Gold level referral milestone	2
11111111-aaaa-bbbb-cccc-000000000003	Platinum	1000.000000	10	t	2026-02-25 08:11:37.437	system	2026-02-25 08:11:37.437	system	\N	\N	1	Platinum level referral milestone	3
\.


--
-- Data for Name: request_responses_logs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.request_responses_logs (id, request, response, user_id, error_log, method_name, requested_ip, full_route, action_verb, old_data, new_data, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: role_wise_menu_and_permissions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.role_wise_menu_and_permissions (id, menu_and_permission_setup_id, role_id, role_name, user_id, is_active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.roles (id, name, normalized_name, is_active, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by) FROM stdin;
c67f6ec6-ddd8-4acf-9117-a54fd4c4c8ba	SuperAdmin	SUPER ADMIN	t	2026-02-25 08:11:36.752	\N	\N	\N	\N	\N
214045a2-7fae-4dd4-90cd-ba911b0d0d51	Admin	ADMIN	t	2026-02-25 08:11:36.752	\N	\N	\N	\N	\N
c464a406-c657-4b23-bf79-2d9c7225f165	Member	MEMBER	t	2026-02-25 08:11:36.752	\N	\N	\N	\N	\N
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.settings (id, key_name, value, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: staking_adjustments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.staking_adjustments (id, user_id, user_staking_package_id, toin_amount, usdt_amount, usdt_conversion_rate, type, remark, created_at, created_by) FROM stdin;
\.


--
-- Data for Name: staking_package_plans; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.staking_package_plans (id, name, description, daily_profit_percent, bonus_amount, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, max_toin_amount, min_toin_amount, minimum_duration_in_days, recurring_profit_days, total_toin_purchased_with_usd) FROM stdin;
c5108e83-be96-477d-a027-7e55a726ad28	Starter Plan	This plan gives 2.5% daily profit	0.15	0.00	t	2025-01-01 10:00:00	system	2025-01-05 12:00:00	admin	\N	\N	3000.00	0.00	7	3	0.01
fa644e67-9d69-4263-8ffa-242875771c53	Silver Plan	This plan gives 3% daily profit	0.15	10.00	t	2025-01-01 10:00:00	system	2025-01-05 12:00:00	admin	\N	\N	6000.00	3001.00	7	3	0.01
841520ad-cdff-4545-8c4c-3febb08d8408	Gold Plan	This plan gives 4% daily profit	4.00	20.00	t	2025-01-01 10:00:00	system	2025-01-05 12:00:00	admin	\N	\N	12000.00	6001.00	7	2	0.01
1581c7c8-baf5-4adf-b00a-5589515b30a0	Platinum Plan	This plan gives 5% daily profit	5.00	30.00	t	2025-01-01 10:00:00	system	2025-01-05 12:00:00	admin	\N	\N	15000.00	12001.00	7	2	0.00
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.states (id, country_id, name, code, is_active, created_at, updated_at, created_by, deleted_at, deleted_by, updated_by) FROM stdin;
5ff6a794-4c03-4e83-a723-5b817fab7f5a	6910b150-3f64-4d58-94a8-4fb609ab2092	Badakhshan	BDS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d7c521cc-ab9f-4b4e-921a-f05cb16e7840	6910b150-3f64-4d58-94a8-4fb609ab2092	Badghis	BDG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
006f70a7-d50b-4b3f-9f63-446fa6c2ec2e	6910b150-3f64-4d58-94a8-4fb609ab2092	Baghlan	BGL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d7a46459-7282-423b-9819-9ad045e97510	6910b150-3f64-4d58-94a8-4fb609ab2092	Balkh	BAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f9be1d50-c196-4bd7-be0f-0bc804dd6772	6910b150-3f64-4d58-94a8-4fb609ab2092	Bamyan	BAM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0f61253d-0741-4acb-a55a-1bd1c75e6852	6910b150-3f64-4d58-94a8-4fb609ab2092	Daykundi	DAY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
929cfde7-a421-4535-b675-e5baab2f823e	6910b150-3f64-4d58-94a8-4fb609ab2092	Farah	FRA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b71c508b-1e8e-412f-8fe2-5bd8f039d642	6910b150-3f64-4d58-94a8-4fb609ab2092	Faryab	FYB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9f26ae46-8471-4f37-aba9-74a8257bf920	6910b150-3f64-4d58-94a8-4fb609ab2092	Ghazni	GHA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8bebc18b-34dd-4cea-a421-ca9785d743e1	6910b150-3f64-4d58-94a8-4fb609ab2092	Ghōr	GHO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4a4ae14c-a99c-48b2-ae76-c3df1d109474	6910b150-3f64-4d58-94a8-4fb609ab2092	Helmand	HEL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
07c8d0af-dbfd-4c91-8476-81af3302d5d9	6910b150-3f64-4d58-94a8-4fb609ab2092	Herat	HER	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
76516fd7-4f2b-4e53-838b-53b4b35467dc	6910b150-3f64-4d58-94a8-4fb609ab2092	Jowzjan	JOW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
56c705be-86de-4dcc-b6a3-a7b5bb717d36	6910b150-3f64-4d58-94a8-4fb609ab2092	Kabul	KAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4002c1ad-4c40-4bdc-a9ac-30518a6612f8	6910b150-3f64-4d58-94a8-4fb609ab2092	Kandahar	KAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d8c7dc3c-1714-42b2-ba79-1e86fe6fbea2	6910b150-3f64-4d58-94a8-4fb609ab2092	Kapisa	KAP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
307493db-5266-4832-a093-c53538c6bbd5	6910b150-3f64-4d58-94a8-4fb609ab2092	Khost	KHO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
252de8d5-c2a9-4b66-b969-3325ff859e96	6910b150-3f64-4d58-94a8-4fb609ab2092	Kunar	KNR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6f142f1e-f744-45cd-9bbf-39cafa7325cf	6910b150-3f64-4d58-94a8-4fb609ab2092	Kunduz Province	KDZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d052ac67-9a74-4c3e-b52a-56e71324c88c	6910b150-3f64-4d58-94a8-4fb609ab2092	Laghman	LAG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
470c4ba0-9f99-436a-a064-b8d2599b09ef	6910b150-3f64-4d58-94a8-4fb609ab2092	Logar	LOG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
27654875-64f7-452e-a473-c6c136628897	6910b150-3f64-4d58-94a8-4fb609ab2092	Nangarhar	NAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
de07d98c-1635-44ba-bc3a-c94fcbad9edf	6910b150-3f64-4d58-94a8-4fb609ab2092	Nimruz	NIM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7e2857e2-fada-4c80-940f-448ceac74d0b	6910b150-3f64-4d58-94a8-4fb609ab2092	Nuristan	NUR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f0573c88-3ecd-477d-b352-c363411d5bf2	6910b150-3f64-4d58-94a8-4fb609ab2092	Paktia	PIA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e71ec690-4c84-43d6-a6d5-1c1364743ad4	6910b150-3f64-4d58-94a8-4fb609ab2092	Paktika	PKA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
689df42a-3652-4645-bce2-d1c3b740043a	6910b150-3f64-4d58-94a8-4fb609ab2092	Panjshir	PAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e14610d9-1560-4a13-b8e0-107895340d95	6910b150-3f64-4d58-94a8-4fb609ab2092	Parwan	PAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7e7a8b40-4c06-4ce0-ac9c-ac945bf95ebc	6910b150-3f64-4d58-94a8-4fb609ab2092	Samangan	SAM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bf09a4be-2726-4614-b833-f5d0186be5e0	6910b150-3f64-4d58-94a8-4fb609ab2092	Sar-e Pol	SAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ade783f9-c3ab-4f18-81f7-123e0bde8052	6910b150-3f64-4d58-94a8-4fb609ab2092	Takhar	TAK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
89e52cb5-5c3a-4ab8-8abb-7b8cbff49e63	6910b150-3f64-4d58-94a8-4fb609ab2092	Urozgan	URU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3fa49be1-7803-4123-a279-72ed23e523cd	6910b150-3f64-4d58-94a8-4fb609ab2092	Zabul	ZAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ed11303c-d874-4e3a-a6a1-95c952642156	d363a264-bc07-470f-9d59-b9f067037da6	Berat County	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e316361b-f068-4260-b59d-36bab7409929	d363a264-bc07-470f-9d59-b9f067037da6	Berat District	BR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9b1cdf9b-27fa-47c3-b4f2-fd727be3ae84	d363a264-bc07-470f-9d59-b9f067037da6	Bulqizë District	BU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1a167929-cd06-48ed-b90c-186ce8e4b19e	d363a264-bc07-470f-9d59-b9f067037da6	Delvinë District	DL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8a5c694c-e1d1-466d-b069-e920141c8787	d363a264-bc07-470f-9d59-b9f067037da6	Devoll District	DV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
23bcdf88-88e0-4794-8eef-163c4d3b6998	d363a264-bc07-470f-9d59-b9f067037da6	Dibër County	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a7317d65-6548-4bb0-a315-cf077baedf10	d363a264-bc07-470f-9d59-b9f067037da6	Dibër District	DI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b5f0afb6-69c7-42c3-8184-03bb6d210d90	d363a264-bc07-470f-9d59-b9f067037da6	Durrës County	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a7f1e675-535e-4446-a480-0d65909de600	d363a264-bc07-470f-9d59-b9f067037da6	Durrës District	DR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
29850ccd-17f0-405d-b8ce-29fbc125616a	d363a264-bc07-470f-9d59-b9f067037da6	Elbasan County	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
85712e50-83cc-4f2d-8956-7631f287f351	d363a264-bc07-470f-9d59-b9f067037da6	Fier County	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d0d90226-fec7-4e18-90d2-f9819891f898	d363a264-bc07-470f-9d59-b9f067037da6	Fier District	FR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
59a99898-0f73-435c-9fa6-ae47df93985d	d363a264-bc07-470f-9d59-b9f067037da6	Gjirokastër County	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c8af1e99-bc09-4456-9411-5bf14767d800	d363a264-bc07-470f-9d59-b9f067037da6	Gjirokastër District	GJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6fde0afd-b20d-4c26-b656-5bb7da42fed0	d363a264-bc07-470f-9d59-b9f067037da6	Gramsh District	GR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3536e37a-804a-443a-9fea-2673c018052d	d363a264-bc07-470f-9d59-b9f067037da6	Has District	HA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cbc3998d-fe88-4e18-8b0e-5c7bccda0871	d363a264-bc07-470f-9d59-b9f067037da6	Kavajë District	KA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
715c864c-1002-4f06-b8e9-08d0448700b6	d363a264-bc07-470f-9d59-b9f067037da6	Kolonjë District	ER	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
453bcf30-1118-408a-ad1e-7420c4e6e42b	d363a264-bc07-470f-9d59-b9f067037da6	Korçë County	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3d13caa3-d933-40c4-a21e-64c78952ebb9	d363a264-bc07-470f-9d59-b9f067037da6	Korçë District	KO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
230d92c5-bbf6-4e22-8f9a-71eb71296a4f	d363a264-bc07-470f-9d59-b9f067037da6	Krujë District	KR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4832259a-afa8-439b-9c61-d83053f96135	d363a264-bc07-470f-9d59-b9f067037da6	Kukës County	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2f0bda2e-afc7-4bcb-8f97-5f42a4f63a83	d363a264-bc07-470f-9d59-b9f067037da6	Kukës District	KU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c5daea27-d964-4060-b488-b7b2e3e88ade	d363a264-bc07-470f-9d59-b9f067037da6	Kurbin District	KB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6320dd43-c44f-4f5a-aa49-88d36fbd4515	d363a264-bc07-470f-9d59-b9f067037da6	Kuçovë District	KC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2eaece7c-53ec-4563-b406-015d67c794a4	d363a264-bc07-470f-9d59-b9f067037da6	Lezhë County	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e8397a12-bca6-4a28-848d-612849e06ed1	d363a264-bc07-470f-9d59-b9f067037da6	Lezhë District	LE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0118a11c-c39d-45e1-ab04-202a0dd03bc9	d363a264-bc07-470f-9d59-b9f067037da6	Librazhd District	LB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ff8b8f08-4470-4ea1-83c4-183b67a1e2fd	d363a264-bc07-470f-9d59-b9f067037da6	Lushnjë District	LU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
390f5938-0e83-471e-8184-86cea5aa5744	d363a264-bc07-470f-9d59-b9f067037da6	Mallakastër District	MK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a31a470e-dc3d-4f8a-9eaa-a844085e559f	d363a264-bc07-470f-9d59-b9f067037da6	Malësi e Madhe District	MM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
79596444-204a-4ab1-aa4c-96c747ca6cb5	d363a264-bc07-470f-9d59-b9f067037da6	Mat District	MT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0e7a9d29-0e67-43f7-976c-52a05dab089e	d363a264-bc07-470f-9d59-b9f067037da6	Mirditë District	MR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5d4b631d-a9ac-4535-9df7-488ea002507d	d363a264-bc07-470f-9d59-b9f067037da6	Peqin District	PQ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d61ecfef-0cb5-42ec-be8f-934b107d4a1a	d363a264-bc07-470f-9d59-b9f067037da6	Pogradec District	PG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8e58db61-cea3-4273-8ed6-8c88815d52e0	d363a264-bc07-470f-9d59-b9f067037da6	Pukë District	PU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c6dc0931-c702-4e9c-9f11-a3797fa53f3e	d363a264-bc07-470f-9d59-b9f067037da6	Përmet District	PR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fc9843c9-b947-4208-a683-9319808ff548	d363a264-bc07-470f-9d59-b9f067037da6	Sarandë District	SR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
73244bf9-227d-4ba3-bfa1-b0fb35225347	d363a264-bc07-470f-9d59-b9f067037da6	Shkodër County	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8a5fc72d-4e61-4427-85c2-2b0ab2c6a221	d363a264-bc07-470f-9d59-b9f067037da6	Shkodër District	SH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bba1a495-bcb6-4c32-afc7-86b5438f77b5	d363a264-bc07-470f-9d59-b9f067037da6	Skrapar District	SK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b3653464-0529-4faf-a220-3779efa8bf47	d363a264-bc07-470f-9d59-b9f067037da6	Tepelenë District	TE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
94c03b35-0b8b-44ea-949d-8ca778b3970b	d363a264-bc07-470f-9d59-b9f067037da6	Tirana County	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4b23fdf3-5189-4331-bd5f-968e0a26d6bc	d363a264-bc07-470f-9d59-b9f067037da6	Tirana District	TR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ce997582-0d13-43ab-9aa9-cd1cd48052c3	d363a264-bc07-470f-9d59-b9f067037da6	Tropojë District	TP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c479fefc-83e0-43cb-9e56-f384894070db	d363a264-bc07-470f-9d59-b9f067037da6	Vlorë County	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
12fd4f7b-625d-4971-bf78-1c5823dbaa2a	d363a264-bc07-470f-9d59-b9f067037da6	Vlorë District	VL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6ead54e0-a9a9-442f-810c-23d51d38e6d3	c002dabd-f648-4686-bac0-473421d657d5	Adrar	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
04989f73-7662-4cd7-b3ef-5e2f4ada9824	c002dabd-f648-4686-bac0-473421d657d5	Algiers	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eeec7040-c10a-4684-a546-1c127200953c	c002dabd-f648-4686-bac0-473421d657d5	Annaba	23	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2e4e8e62-d36f-4475-a3f9-3208a7cb2ffe	c002dabd-f648-4686-bac0-473421d657d5	Aïn Defla	44	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f20e3241-134e-4ffd-bb13-256898dce5d1	c002dabd-f648-4686-bac0-473421d657d5	Aïn Témouchent	46	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7e68d019-00c8-4ec5-abf1-718fa63ea755	c002dabd-f648-4686-bac0-473421d657d5	Batna	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b783f2a8-6bc1-4d22-b2d8-47a80dd772a7	c002dabd-f648-4686-bac0-473421d657d5	Biskra	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
798b673d-74eb-4f4f-ae59-7a53e3843f2a	c002dabd-f648-4686-bac0-473421d657d5	Blida	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2d42168f-986d-46a0-a8e2-167a86dd8dcc	c002dabd-f648-4686-bac0-473421d657d5	Bordj Baji Mokhtar	52	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ffef8bf3-7b0b-429b-901b-b5eb1fd33d61	c002dabd-f648-4686-bac0-473421d657d5	Bordj Bou Arréridj	34	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4b62d492-0847-48af-9920-00a0cf364049	c002dabd-f648-4686-bac0-473421d657d5	Boumerdès	35	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
59aa3c18-3e3e-44bc-b3f5-08e2e0d7e111	c002dabd-f648-4686-bac0-473421d657d5	Bouïra	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2f05c455-957f-4f23-b5b5-c75743d1b980	c002dabd-f648-4686-bac0-473421d657d5	Béchar	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
56470632-d18d-409b-b845-88f83b20096d	c002dabd-f648-4686-bac0-473421d657d5	Béjaïa	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7e537a60-5925-4d7b-8c67-747efac680cb	c002dabd-f648-4686-bac0-473421d657d5	Béni Abbès	53	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f147332f-8b24-4f46-bc48-c194303819d8	c002dabd-f648-4686-bac0-473421d657d5	Chlef	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
593d8f16-aa33-46ee-b7ba-80ee27b31c44	c002dabd-f648-4686-bac0-473421d657d5	Constantine	25	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0341c6cf-44d7-4e41-9fed-cdff32180289	c002dabd-f648-4686-bac0-473421d657d5	Djanet	56	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a015b32b-4600-4c8f-96c9-316789547214	c002dabd-f648-4686-bac0-473421d657d5	Djelfa	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5b5d73e6-d628-4b1b-97cb-086c1453d60f	c002dabd-f648-4686-bac0-473421d657d5	El Bayadh	32	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eba0f586-28ff-4b35-8a29-5bc07ff958fa	c002dabd-f648-4686-bac0-473421d657d5	El M'ghair	49	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b55d0016-b424-4679-8559-0d89de8b9f73	c002dabd-f648-4686-bac0-473421d657d5	El Menia	50	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
be1d4b97-2951-466a-85c2-e7450dd07cc8	c002dabd-f648-4686-bac0-473421d657d5	El Oued	39	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
350fbc12-c41a-4777-b24a-50da71133a77	c002dabd-f648-4686-bac0-473421d657d5	El Tarf	36	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0ee24550-36bd-4eb0-bebe-a46f208250d5	c002dabd-f648-4686-bac0-473421d657d5	Ghardaïa	47	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
16e55d1a-6032-4dab-84d4-187764a38cc2	c002dabd-f648-4686-bac0-473421d657d5	Guelma	24	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cd7bb79b-a879-4cb1-9b11-ce34449dbf95	c002dabd-f648-4686-bac0-473421d657d5	Illizi	33	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
12395d8b-b208-49e6-8b95-93c6c1f93b33	c002dabd-f648-4686-bac0-473421d657d5	In Guezzam	58	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9dcbad4e-b412-4f5d-9cd1-077a1a07a46f	c002dabd-f648-4686-bac0-473421d657d5	In Salah	57	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5c7df42c-728c-4e8d-959a-5af7d56cb381	c002dabd-f648-4686-bac0-473421d657d5	Jijel	18	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
30c5c28f-fc51-4041-95d4-9395e0ed392b	c002dabd-f648-4686-bac0-473421d657d5	Khenchela	40	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
68bbae79-d641-420d-9586-ca753dd60145	c002dabd-f648-4686-bac0-473421d657d5	Laghouat	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
02e4a0a2-41c4-4437-a5be-06461448c452	c002dabd-f648-4686-bac0-473421d657d5	M'Sila	28	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2118190c-06c1-46cd-b70d-c6d4c9bbbc76	c002dabd-f648-4686-bac0-473421d657d5	Mascara	29	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
25ecdad3-0163-44df-85d4-f0fc5a5c6aaf	c002dabd-f648-4686-bac0-473421d657d5	Mila	43	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f8fcf2ba-541e-4fbb-a739-ebd606050a07	c002dabd-f648-4686-bac0-473421d657d5	Mostaganem	27	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
826c3b43-90bb-458c-8bf2-06856e5bd5cd	c002dabd-f648-4686-bac0-473421d657d5	Médéa	26	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ad52b61a-2a28-482a-a3ed-161298640311	c002dabd-f648-4686-bac0-473421d657d5	Naama	45	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
37784688-017e-4b78-b03d-97dd070b61e8	c002dabd-f648-4686-bac0-473421d657d5	Oran	31	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c27a8d86-ee8a-4cae-9d96-687e2b73fdc8	c002dabd-f648-4686-bac0-473421d657d5	Ouargla	30	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
28951dd5-f2e3-482f-8e8b-340d2664ae7d	c002dabd-f648-4686-bac0-473421d657d5	Ouled Djellal	51	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ce1e64eb-9505-42d8-9e90-0ea3e4fa10d4	c002dabd-f648-4686-bac0-473421d657d5	Oum El Bouaghi	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
77cfa073-2683-44ce-91cf-4ebb3a93c59d	c002dabd-f648-4686-bac0-473421d657d5	Relizane	48	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d7f7eaa7-e76b-47d7-b576-0a71d9f8f9fc	c002dabd-f648-4686-bac0-473421d657d5	Saïda	20	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2eb931fa-bd2d-40e1-8c72-20f4bf90b765	c002dabd-f648-4686-bac0-473421d657d5	Sidi Bel Abbès	22	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cf425136-357d-4baf-a1e6-8e0e83470bf7	c002dabd-f648-4686-bac0-473421d657d5	Skikda	21	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e83acf74-a8dd-447f-b87c-1728e8f750cf	c002dabd-f648-4686-bac0-473421d657d5	Souk Ahras	41	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
45128073-dec2-433c-ada8-95a3ec043240	c002dabd-f648-4686-bac0-473421d657d5	Sétif	19	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c59a8e0e-4ae1-4012-a394-2ae482609146	c002dabd-f648-4686-bac0-473421d657d5	Tamanghasset	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
81a84461-9e6b-4f28-acbb-2b695a0729f7	c002dabd-f648-4686-bac0-473421d657d5	Tiaret	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4bd74788-b7df-411d-8c20-189f8f1750d3	c002dabd-f648-4686-bac0-473421d657d5	Timimoun	54	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
29798dbd-5049-4b33-bd5a-f8cc9b103840	c002dabd-f648-4686-bac0-473421d657d5	Tindouf	37	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5600df86-1676-46ca-b0f5-3a6a3c5b7206	c002dabd-f648-4686-bac0-473421d657d5	Tipasa	42	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b354047c-eb12-4059-9cb7-3edb3b748ca1	c002dabd-f648-4686-bac0-473421d657d5	Tissemsilt	38	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
237cb1eb-f418-4c90-bbfd-2fac148c7112	c002dabd-f648-4686-bac0-473421d657d5	Tizi Ouzou	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a0bae72e-8a27-4152-a029-d77450c3f9e1	c002dabd-f648-4686-bac0-473421d657d5	Tlemcen	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4f8a15eb-1ac5-4dd7-bbb5-7004a01ea566	c002dabd-f648-4686-bac0-473421d657d5	Touggourt	55	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3561b51b-3ae9-468e-b8cd-c3a622dc4b2d	c002dabd-f648-4686-bac0-473421d657d5	Tébessa	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0b13f30b-db41-4656-82c5-6cf2636eecbc	0d317748-cd41-4c54-93e5-a722524e819e	Andorra la Vella	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2539c8ac-b222-4362-9a69-278d69778372	0d317748-cd41-4c54-93e5-a722524e819e	Canillo	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
133256f4-003f-4b39-b8ca-188fa045271f	0d317748-cd41-4c54-93e5-a722524e819e	Encamp	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7ab48e48-f609-4c5f-b2cd-a9acc4c16e4d	0d317748-cd41-4c54-93e5-a722524e819e	Escaldes-Engordany	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4abca834-c2da-4129-bf18-ad399dba7092	0d317748-cd41-4c54-93e5-a722524e819e	La Massana	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c208ad34-5b42-4ff9-813a-a89c05947d71	0d317748-cd41-4c54-93e5-a722524e819e	Ordino	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
817fa6d8-9055-406e-a836-91135ec9a495	0d317748-cd41-4c54-93e5-a722524e819e	Sant Julià de Lòria	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
98678ef6-5b5b-4f13-9e59-004150cfc13a	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Bengo Province	BGO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d858fdcf-9728-4e02-96f4-6bf2966bd820	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Benguela Province	BGU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4af27763-cd41-47cd-a7ac-094f5a41a3a6	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Bié Province	BIE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f08df8c3-78c8-4c05-9954-36d157040b01	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Cabinda Province	CAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ecd9cb87-ab93-4659-9f06-859f11834126	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Cuando Cubango Province	CCU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cece2b37-b341-42af-b715-3d5657bc1c6e	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Cuanza Norte Province	CNO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
23ef7024-f362-4152-ae74-02a588ed6810	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Cuanza Sul	CUS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cd94a7fa-4ed4-40bd-b735-ae291765a226	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Cunene Province	CNN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
da7b0e14-2621-47b6-9ff3-804f4d2d2847	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Huambo Province	HUA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c9bf22e9-c0f3-4e07-b2cb-4427939539c0	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Huíla Province	HUI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7cc2cd2c-4b98-4fd0-9a2c-0bb045276e0c	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Luanda Province	LUA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e07544bb-a83e-4f33-933f-df01b3979508	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Lunda Norte Province	LNO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
01c2ca25-d8cf-4583-a5d2-48624b726bb4	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Lunda Sul Province	LSU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fe5ccea5-3314-410e-b90e-ad1812623049	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Malanje Province	MAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
838966e6-89a4-4ff6-bbee-8f0a6295a1db	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Moxico Province	MOX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d3c7f940-cdc7-4c3b-8875-a5f741e4ccf7	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Uíge Province	UIG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
797c3162-54fc-4cff-8988-921b5a5aa46c	69de19ca-58cc-480c-a69b-d8fdf97e5a28	Zaire Province	ZAI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
da27f3e2-4222-4763-ac07-fd7811b739f5	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Barbuda	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
05145b7d-ce5d-4beb-b527-aec504a93db3	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Redonda	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a003f8a6-6251-471a-aa30-fe2d64f07045	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Saint George Parish	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4704bde5-3bd2-406f-aafe-87ff3f2780f8	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Saint John Parish	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3d5ff12e-381f-44ad-8f57-e57dbf7ae94b	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Saint Mary Parish	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a8c6688c-2fc3-490a-8892-53494cf4af1d	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Saint Paul Parish	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cb04ab1d-f032-43e2-8466-ba3c8faba082	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Saint Peter Parish	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d00edca6-82a2-47c9-a9dc-49043f973123	8ca6ff5d-5deb-48bd-b56e-2239b49e166f	Saint Philip Parish	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9458b8d5-0e62-4aab-b457-73e5b257cef0	8cebbefa-9749-4e6b-a211-02ec392c7b60	Buenos Aires	B	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
87fa3e8c-ee5d-4ff1-a09a-31e86a576f66	8cebbefa-9749-4e6b-a211-02ec392c7b60	Catamarca	K	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
252685f4-2375-4a74-a294-ba7fe5cc6ff3	8cebbefa-9749-4e6b-a211-02ec392c7b60	Chaco	H	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f22a50a3-3475-4b92-9f6c-1512007b7271	8cebbefa-9749-4e6b-a211-02ec392c7b60	Chubut	U	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8090be41-02f5-43ee-8d9f-bda6de2a1df2	8cebbefa-9749-4e6b-a211-02ec392c7b60	Ciudad Autónoma de Buenos Aires	C	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f11daa13-c724-4d96-9d73-4c886ca5a1c5	8cebbefa-9749-4e6b-a211-02ec392c7b60	Corrientes	W	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0f7d3438-df08-470d-a593-1d5784d998de	8cebbefa-9749-4e6b-a211-02ec392c7b60	Córdoba	X	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bb60eaf0-1350-4c9a-8be5-06d80b6a8e61	8cebbefa-9749-4e6b-a211-02ec392c7b60	Entre Ríos	E	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3a3174ed-023a-441c-b644-1db71f97a9d8	8cebbefa-9749-4e6b-a211-02ec392c7b60	Formosa	P	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6e6c1462-807b-470c-a3b2-40abc954a005	8cebbefa-9749-4e6b-a211-02ec392c7b60	Jujuy	Y	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1ed7fac7-648c-4769-a9cb-d65239b26d91	8cebbefa-9749-4e6b-a211-02ec392c7b60	La Pampa	L	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8ea3cf9e-5363-4a41-84c7-ba883b762269	8cebbefa-9749-4e6b-a211-02ec392c7b60	La Rioja	F	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2c0400da-2042-4e6b-9693-6404938f90fe	8cebbefa-9749-4e6b-a211-02ec392c7b60	Mendoza	M	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
df51a42c-6c43-4801-92d8-99f17609546f	8cebbefa-9749-4e6b-a211-02ec392c7b60	Misiones	N	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a3b1add9-8ee8-4d3b-a55d-6f168e1ae569	8cebbefa-9749-4e6b-a211-02ec392c7b60	Neuquén	Q	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
895a48fc-3937-4609-891d-16fb67251941	8cebbefa-9749-4e6b-a211-02ec392c7b60	Río Negro	R	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6a0e68fd-93e0-41fe-acf5-4dfa3557a134	8cebbefa-9749-4e6b-a211-02ec392c7b60	Salta	A	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7ce3abf3-2010-4469-a499-3ee7e410b6fb	8cebbefa-9749-4e6b-a211-02ec392c7b60	San Juan	J	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
df35d161-ece4-49d6-969e-d57e353fafcf	8cebbefa-9749-4e6b-a211-02ec392c7b60	San Luis	D	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ddee3af7-a06e-4d44-83b5-5a40a228ee55	8cebbefa-9749-4e6b-a211-02ec392c7b60	Santa Cruz	Z	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
423ec16e-0b1f-49d4-b9b8-48223185e691	8cebbefa-9749-4e6b-a211-02ec392c7b60	Santa Fe	S	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
93858dcd-9bbb-4de8-a665-b22b19a9a0fb	8cebbefa-9749-4e6b-a211-02ec392c7b60	Santiago del Estero	G	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ce6d26a0-68e7-439e-83a2-c23f5b85ba64	8cebbefa-9749-4e6b-a211-02ec392c7b60	Tierra del Fuego	V	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2f1cc90f-cfb4-4434-806a-44fa964a871b	8cebbefa-9749-4e6b-a211-02ec392c7b60	Tucumán	T	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3653ea82-6520-4d30-bbee-566f1efafcd8	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Aragatsotn Region	AG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8e926fef-5b5a-4a08-8dd5-c5f0ce481898	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Ararat Province	AR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dcb51fb8-f6e2-4ef4-962a-819e10d3fc75	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Armavir Region	AV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a2b7afd4-3b54-4ece-9219-3732e2c6a670	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Gegharkunik Province	GR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
503cdc73-9f30-489f-aed0-56a67b02e1d4	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Kotayk Region	KT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1a923be8-2d1f-4966-83dd-5c5e191218a8	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Lori Region	LO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
97d426a4-4da0-422b-8f0a-4a7f0b656e7e	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Shirak Region	SH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ef787201-98e6-4408-9d9f-b5b256bc341f	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Syunik Province	SU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
beee487b-58c9-4a47-a277-b44bae1307e3	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Tavush Region	TV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ca5beb4b-199d-476a-b494-a11b5cd5a024	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Vayots Dzor Region	VD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5c3d4c9e-3362-486e-8707-9bf3cdc8edf5	0ec10353-a46c-45a8-b962-c8cf0cd5f0e7	Yerevan	ER	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9632a9d0-1e86-43b5-95b0-13ac4c6b3595	fa94efa7-8d67-450b-9677-bd7da310be27	Australian Capital Territory	ACT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
721a0691-54a8-4692-b552-abc8ee3bf3aa	fa94efa7-8d67-450b-9677-bd7da310be27	New South Wales	NSW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2ccf8dad-43fc-4734-8197-b58979542e9b	fa94efa7-8d67-450b-9677-bd7da310be27	Northern Territory	NT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3cf3e0eb-2f4a-4ecb-a192-ef66930dfeb4	fa94efa7-8d67-450b-9677-bd7da310be27	Queensland	QLD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
25f39c41-cbb2-4a2a-bbb6-7c0410208150	fa94efa7-8d67-450b-9677-bd7da310be27	South Australia	SA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ba443b4c-c069-4f65-b002-68b5b0893a2c	fa94efa7-8d67-450b-9677-bd7da310be27	Tasmania	TAS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
aef9f5cd-9398-4e14-828f-3601e9b92d03	fa94efa7-8d67-450b-9677-bd7da310be27	Victoria	VIC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
af1a599d-699e-4592-b6cc-d6cd15f2317d	fa94efa7-8d67-450b-9677-bd7da310be27	Western Australia	WA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2f66c5cb-31c4-4638-a4c4-51ff18075692	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Burgenland	1	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6a87df7a-8472-423d-9074-0be589080b1d	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Carinthia	2	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
99e7f8d9-daa1-4e65-b3b9-3eb2e7034c4a	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Lower Austria	3	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5dd250bf-549b-4d05-932c-e2704b5fba56	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Salzburg	5	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f77a1601-23ae-469f-afa6-f3122ed0140e	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Styria	6	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eda98cc9-a53c-4bca-9a28-f7dc5f235aa3	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Tyrol	7	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4db43e0a-6d04-46d8-ab17-ff45e00feb37	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Upper Austria	4	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
799b1063-5678-418a-8588-2d6c9629f316	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Vienna	9	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ab69376c-eb9c-486a-b5b9-70f3886e80c2	1450e0da-0d23-4f4a-822f-ee3a7b8aa389	Vorarlberg	8	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
15f7e25e-164c-46c0-908b-69b16c411f1a	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Absheron District	ABS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1d30f8cc-50ce-484f-9045-06aa6842ac4c	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Agdam District	AGM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
75d0cde0-2f0c-4385-a2e4-60179b8ac61e	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Agdash District	AGS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bbee7197-365c-42a2-bcc6-7eecf1bcc221	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Aghjabadi District	AGC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
092bc17d-8923-4692-9115-f1f67a6ed005	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Agstafa District	AGA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
38d8b5a9-9c06-4252-9ff3-fed741c59b75	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Agsu District	AGU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e62587d2-95e8-406b-8ffc-8b16cb2e3ff8	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Astara District	AST	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a21dabe7-d2d2-40ab-b19e-b481ae5efd81	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Babek District	BAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d4170cad-3dbe-436e-8878-17d26f6827bb	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Baku	BA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fb038e9b-d60c-48da-8e35-a87fd85a172b	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Balakan District	BAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5344800f-2df2-4c92-96f1-fd3c94645aeb	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Barda District	BAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8b449026-d1ce-489a-8e22-9b0f911365a0	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Beylagan District	BEY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f108e9b5-a607-49e4-a237-2b58137d8f90	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Bilasuvar District	BIL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f63ad675-b80d-49d9-b8dd-8f9075d06a2f	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Dashkasan District	DAS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c4c93349-d284-4020-8d8c-ff0c0159e63e	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Fizuli District	FUZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2632e59d-9798-44fd-8082-6e75c6e51fc6	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Ganja	GA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c706a253-a100-49a9-a366-28bbd70fd993	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Gobustan District	QOB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
94bc8098-acd0-43a3-833b-5238fe9f79ec	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Goranboy District	GOR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bbe294f7-2456-4b72-96f1-609a7a5f9ba2	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Goychay	GOY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cd791201-7eac-4e02-9dc1-2bd14e84afd3	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Goygol District	GYG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c7195f66-2374-4193-a256-9f0944a87314	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Gədəbəy	GAD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fc53ccfd-1634-481d-93b1-e2854665f245	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Hajigabul District	HAC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2a3f392c-0407-4a9e-a7c5-cfb04488a440	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Imishli District	IMI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
baab2385-3e21-4c85-b1d8-1d86df6b4056	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Ismailli District	ISM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5150934d-8eef-435a-bf89-9103677b495d	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Jabrayil District	CAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cf18a817-d5d5-4543-8ed6-6a8fa7962bf7	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Jalilabad District	CAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5e129f94-c03e-4b38-8116-db0d2be0668d	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Julfa District	CUL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
76f027f8-7699-43c3-8100-6b039ff75c73	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Kalbajar District	KAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dbc4e3c2-fe5a-46a3-a2f3-af46a94d43ef	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Kangarli District	KAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
36305a37-d99c-4973-a7cf-b610c2655f28	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Khachmaz District	XAC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
603f080b-b13d-455c-a219-89209b929e12	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Khizi District	XIZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cae965be-9024-497e-84ad-0597b1702918	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Khojali District	XCI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fbf1e89f-8120-432e-bbd2-35e2d216d992	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Kurdamir District	KUR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1cfd94a0-21a4-428b-957b-6a4bdba8de23	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Lachin District	LAC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d56e2951-9dba-4d64-9264-cbc95dd5dfc7	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Lankaran	LAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
33a1ccd3-c971-4eb4-ac45-68ae607c8e8a	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Lankaran District	LA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c0782846-0261-4cf9-a048-14846c8bd7b5	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Lerik District	LER	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
98e558fe-cbc8-4f86-91f8-6fd27ea0dfdb	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Martuni	XVD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
043524ba-7a9c-461e-b0fd-5c759f632bcf	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Masally District	MAS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ce4c4933-ce06-4243-9b83-3f7b86371ca6	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Mingachevir	MI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e1dc2393-8017-4c12-a0b5-dafb0e65c5b2	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Nakhchivan Autonomous Republic	NX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7307a16a-e37f-4b61-804e-a3de52b41290	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Neftchala District	NEF	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2667f543-9898-4d9f-a1fb-18913df67a01	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Oghuz District	OGU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
294ab8fd-2d75-46c0-b576-a8f363f4bc5e	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Ordubad District	ORD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c623c9b0-5b61-464f-9161-e4e326f92cc5	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Qabala District	QAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ffb58cc2-1c1b-4b20-a13e-61cc6410da08	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Qakh District	QAX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
26490e26-a88a-4187-8238-fb711809510a	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Qazakh District	QAZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d24d552f-5ff4-47ab-86a3-ea818eeb4901	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Quba District	QBA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dca29b32-9fe6-4357-9a93-b60e4b101c20	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Qubadli District	QBI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
13ccf2d3-0aad-46f4-93dd-62c92a8672ac	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Qusar District	QUS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
15a14257-d274-4c75-bbf9-784125948eab	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Saatly District	SAT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
10a881c4-02c3-4d32-9165-48a3761d5989	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Sabirabad District	SAB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
89840122-76b7-4eea-8d42-0a43ee7e852b	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Sadarak District	SAD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1f7007cb-0df7-4ef1-82d3-71ffb868f945	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Salyan District	SAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a2d83f95-f2c3-4192-afcd-27232cf7a9df	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Samukh District	SMX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
790e347e-38fc-47c7-95ca-0eab7ed33792	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shabran District	SBN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c661ddfe-b1e1-4d9a-93f8-bd28e16251e3	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shahbuz District	SAH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f7c71b68-655e-4f38-9bf1-4d90308c1185	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shaki	SA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c435dab4-4968-43d9-8473-b5c19d5ece52	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shaki District	SAK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0dde71cd-1b0e-448a-b9a9-21c9b83a1d4c	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shamakhi District	SMI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
47ffe8e2-986a-4b97-ab65-da4915aac156	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shamkir District	SKR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cbc76dbc-c8fd-4c44-b86c-5889697aa7d9	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Sharur District	SAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
97b7e2f6-17f8-4588-baec-ee56a2cb1234	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shirvan	SR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0a690ac5-b88c-41d8-ad48-f48a776b1790	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Shusha District	SUS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
55fea72f-61a1-405c-87dc-51c5e6c21ffa	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Siazan District	SIY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2b2b3c6b-c1ee-4f4c-b2f7-19b0c7048801	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Sumqayit	SM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d09d3b3c-9bae-4a03-9d2e-105478d57b2d	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Tartar District	TAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
17cd6eed-93d5-4d40-a506-b57908bb8769	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Tovuz District	TOV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fde39f98-be4b-4232-84e6-d3493cd4a5cf	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Ujar District	UCA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6e81bd90-f56a-4438-8b15-1bb1c4398d24	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Yardymli District	YAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a7f6182c-603c-4f27-ae49-ed81252df32b	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Yevlakh	YE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
da39de8a-aee8-4156-aeee-d284c3b52d2b	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Yevlakh District	YEV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d9753a8c-6f17-4924-b651-23234c9801d9	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Zangilan District	ZAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
88fff559-09cf-495d-a816-ca57b77ef85a	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Zaqatala District	ZAQ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e393b898-e17f-4b5f-81a3-5a8edccb1ffd	9fcf0ccf-680f-49b7-9ca4-4670c2a86dc5	Zardab District	ZAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
75df348a-9cd5-4e83-9629-6d294567a7c0	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Acklins	AK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3fae8535-c836-4a5e-a6e0-e35154279a43	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Acklins and Crooked Islands	AC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f233923f-3633-4f9b-9549-48ba379b6e5d	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Berry Islands	BY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9c561b1a-c725-4db8-827c-0a19d36762ac	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Bimini	BI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7162aa67-70a6-4ef8-b6fd-db41a06cfa6b	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Black Point	BP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ba55114d-b7c3-4263-8444-da8270059dbe	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Cat Island	CI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0ef0d5c1-77de-43a2-b389-0598aad80200	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Central Abaco	CO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
14a94293-d1b1-4dcd-85cb-89b884b7c008	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Central Andros	CS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6ba9b34d-b7df-4c90-8b00-f34575ff2109	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Central Eleuthera	CE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d75fd2dc-c5ba-4c55-b514-dc0835940472	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Crooked Island	CK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8b5a3b51-bf12-4017-973e-74292cfb8220	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	East Grand Bahama	EG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
48551fac-5513-4b07-a8f1-b319c2d58784	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Exuma	EX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
790cfbe6-fd7f-430e-8ef8-e20e3ae07cd7	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Freeport	FP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
aea4a71d-fb70-4758-b103-7ed9b5b5d02b	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Fresh Creek	FC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a515b7d3-2017-43c2-9e02-d6bdef32ed7d	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Governor's Harbour	GH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
50014b12-c86a-4bb1-9364-493d6b8f66c8	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Grand Cay	GC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0ea5391f-61df-43af-b978-d870c04c195a	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Green Turtle Cay	GT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a24307ab-bd80-43f6-ad34-e9b0239ca21f	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Harbour Island	HI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e836e449-f18d-4893-b1fe-834df6ac5985	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	High Rock	HR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a572184f-e453-4d3d-b7ef-bc2ecbbea673	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Hope Town	HT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
81f1e68a-0df3-44ba-93d8-1e19c3c88eaa	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Inagua	IN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
836de533-1857-4e92-9d3f-f33a1f5b91b4	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Kemps Bay	KB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f802cf0e-dac2-40ed-862b-6b24e8a7d499	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Long Island	LI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0bb89d90-4942-4988-9c24-839de22ac177	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Mangrove Cay	MC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8762e4d5-9f77-4074-8d69-b8a670d93982	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Marsh Harbour	MH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
044907ef-cde5-4d13-92d3-bc5530d53c2b	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Mayaguana District	MG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
109328b1-c043-40df-a6ff-e7040ef37c8d	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	New Providence	NP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7651f2b6-2c41-4eb8-900f-13604e011a2e	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Nichollstown and Berry Islands	NB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8431a195-d2d5-4b12-b4f3-64a8ad816eba	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	North Abaco	NO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9fcd49cd-d3c2-4890-a22a-bb16763f3c2b	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	North Andros	NS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
56e591ad-7639-498b-8266-ddd2204f14c3	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	North Eleuthera	NE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4bb336d4-41cc-4a62-97aa-e6ca6a964008	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Ragged Island	RI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9b3ad3a6-243c-4428-9ae4-d802fcdf5a7b	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Rock Sound	RS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dd390096-8175-4b5e-be67-5c55226dbadd	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Rum Cay District	RC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b3d26152-31a7-4de0-9869-5e3d3178ee97	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	San Salvador Island	SS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2aa9492f-5e3b-45b1-a126-e1e082921841	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	San Salvador and Rum Cay	SR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
97334f5b-ef75-4b8c-b7d3-7c20e4aee63e	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Sandy Point	SP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
493e4749-0c9f-4f05-a637-bf0973375a26	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	South Abaco	SO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
02b18d76-c383-4972-b3d0-0f44447d8f16	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	South Andros	SA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
16f96b20-1a56-45c2-8338-9de95c3e001b	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	South Eleuthera	SE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bddb375e-a9bd-4f95-9eff-fbf86603af3c	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	Spanish Wells	SW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
94dc8b62-dbad-4e44-aec6-0416623f999e	ad4a76c5-5c06-4670-a83d-7a7ce5faad1e	West Grand Bahama	WG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b82d3363-7ea8-4078-a817-c4341760ca05	7cbd0171-f2f8-47a3-93a2-625196c10792	Capital Governorate	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
74eb97dd-9047-4c6b-afac-7e376b9cc381	7cbd0171-f2f8-47a3-93a2-625196c10792	Central Governorate	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ee56e5c1-fcbb-46a4-a637-19a1ae25a845	7cbd0171-f2f8-47a3-93a2-625196c10792	Muharraq Governorate	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9126347b-9d56-4d88-b3c5-c296642430d2	7cbd0171-f2f8-47a3-93a2-625196c10792	Northern Governorate	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
28c31fc3-08df-40ee-a9eb-b0447497c84b	7cbd0171-f2f8-47a3-93a2-625196c10792	Southern Governorate	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5ada3f52-dded-428d-93d4-4b1811679192	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Bagerhat District	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
51299b8e-1e8f-4c6d-807c-d9d7c6d59ff7	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Bahadia	33	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
28278651-574b-45e9-bf4f-73718c31cb79	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Bandarban District	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1b2a3d46-73a1-4fed-b972-94472eb9cc18	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Barguna District	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b56027fc-6fb5-4b92-8ab6-a005a84bfbd0	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Barisal District	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
21713d0a-dc41-4639-a2bf-03f6cd7d3160	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Barisal Division	A	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
31775aa1-edda-45ad-8ecc-644fa2e136b1	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Bhola District	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
93bee193-ba8e-4b23-8686-cec12fb4a74d	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Bogra District	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2b88b74f-9027-4745-adf9-82dbcccd71a6	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Brahmanbaria District	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
55e66ac6-c752-4fac-bae8-6a83b0af9f41	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Chandpur District	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c42d5684-b8e6-4df3-82e0-30e204d6ef27	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Chapai Nawabganj District	45	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
72d601fc-3209-4595-a974-5420c7e7e0ef	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Chittagong District	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f2131e34-7776-43ce-b849-71d2ea8dac44	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Chittagong Division	B	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2ff0c398-1763-4ef8-805c-dcb60609ba34	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Chuadanga District	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
faf7a098-df09-4f62-920b-118a9d0d371a	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Comilla District	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9c29ccf7-a33c-40aa-8d72-fc19dc4c83aa	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Cox's Bazar District	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
41e7aa7e-47e8-4f1a-87af-c3684ee3f346	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Dhaka District	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0577c5ac-8570-4652-84e3-cc32ee40bf44	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Dhaka Division	C	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bc674fa9-c66b-4f7e-835c-1996dc7b280a	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Dinajpur District	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9ffeff13-a059-4129-9db1-c8bd6407a28d	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Faridpur District	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
afc059a3-7000-4be4-b96c-f2959434cf93	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Feni District	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d59f7c2e-3b5a-455b-87d8-823e3a0adf8d	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Gaibandha District	19	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c0b3a3cb-a0a6-417b-a45d-9a993eb2c54b	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Gazipur District	18	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
16b08be3-7fa5-4eb8-965f-9628c430c731	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Gopalganj District	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a512ae9e-0daf-4185-bad4-856a117246e1	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Habiganj District	20	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d9250cef-5a21-4e25-b752-8742360172fb	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Jamalpur District	21	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cde486b6-7148-4024-8280-83f802cc5b58	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Jessore District	22	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a19da5fb-6cd9-4a67-8181-d2228a932227	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Jhalokati District	25	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
13419950-2ed4-4c2f-8200-c6d026e250cc	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Jhenaidah District	23	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
19da2afc-6ecb-4539-ad30-5b649f598476	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Joypurhat District	24	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
822ceb3a-7d49-4424-a685-56c06676b4ae	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Khagrachari District	29	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a1d768ed-e84c-4bae-81ab-b2a6611753b6	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Khulna District	27	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ef8155bd-751a-44a8-9afc-9fe0fa42be40	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Khulna Division	D	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2c368774-8bba-4904-abf8-4267b30484ad	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Kishoreganj District	26	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c479a47a-8e3a-4c4f-a095-90fd3d278142	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Kurigram District	28	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9cc43288-a246-4e30-94bd-529d67f05ee4	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Kushtia District	30	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6ebb7742-4240-4526-a122-7b20237d9a32	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Lakshmipur District	31	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f0680ad7-f860-486f-adb8-25e53568bec4	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Lalmonirhat District	32	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5c5ec026-58ed-4ab9-bf7c-b8137760eeaa	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Madaripur District	36	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
be244c06-015c-4b5f-a9d8-4d6f5dfeccfc	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Meherpur District	39	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
09d787fc-f088-4f64-ae00-8385326d7c79	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Moulvibazar District	38	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4dfa9da6-ac03-446f-8cf2-6a4330f42db1	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Munshiganj District	35	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b3abb056-0130-494f-9da6-9dbcbd36a5c9	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Mymensingh District	34	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e68606f7-9a16-472e-b040-5aa0aa7bc176	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Mymensingh Division	H	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2a9b4a29-2735-42be-b38f-ef109a742891	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Naogaon District	48	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f4de940b-731f-48c1-8522-1bf93d6f1965	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Narail District	43	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8039da6d-303b-490b-9208-cf14c57e3231	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Narayanganj District	40	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
43a77a92-d140-4c5c-a276-c601d79b5e5f	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Natore District	44	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
101246bc-0c9c-4938-883f-b77c1b2ecc5a	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Netrokona District	41	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fb2fd394-7c69-4c31-8d54-8dd767e9cf3a	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Nilphamari District	46	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
069ab6b5-a856-49a3-831b-73280a28160f	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Noakhali District	47	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a32be71b-d696-469d-b565-7b07e76c0cf7	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Pabna District	49	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ab394e60-e9f3-4f34-bd10-7a72568018db	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Panchagarh District	52	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b80f3c4b-9499-400f-8b3b-9a44582b9f2c	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Patuakhali District	51	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b9343ef9-8bef-4a44-8a5f-947fd3d55464	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Pirojpur District	50	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
10bd6377-f15b-48f8-834e-8321285f46c6	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Rajbari District	53	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
265e2249-ea4e-4c0b-af6e-9174c4d8d3b0	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Rajshahi District	54	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4a5b9332-5084-4cd4-adc8-31f70af99624	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Rajshahi Division	E	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1f3cb84a-5954-45a8-b041-1757b56e0a86	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Rangamati Hill District	56	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f05bfb9b-fab2-44bb-b00a-0ddd52c6428a	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Rangpur District	55	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fb4772dc-81f3-4e28-a6ec-5d3ee4286891	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Rangpur Division	F	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9c72be96-d2b9-4acc-bdcb-e07db5b95cb5	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Satkhira District	58	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b10e1e08-dd43-4fd1-a8ee-d3644205317c	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Shariatpur District	62	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8b5535fc-72c1-4a53-8326-353226d6c63a	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Sherpur District	57	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2cf313ae-3525-4ca4-b917-5030b19a76da	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Sirajganj District	59	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
02c51e33-7395-48e0-8520-baaad28b5477	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Sunamganj District	61	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b0692f63-085a-4b47-a575-843c1cf98a4c	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Sylhet District	60	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
595ab805-e2fb-4c59-a1f4-85894adb3415	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Sylhet Division	G	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
525dd027-fe82-461d-81bb-808b422f3f69	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Tangail District	63	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
212bbba9-d2aa-4732-b232-d3c9f201ef3d	753b0c6e-3ba7-46f5-8598-c037d2f5a169	Thakurgaon District	64	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1b523407-09ee-4fe8-9ea4-bacc5df15c1c	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Christ Church	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2061f4b2-2113-4f77-907c-22ccec4919ac	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Andrew	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0e4d2727-ff31-4962-ac2c-26d32af64da2	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint George	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
07b42e6d-d241-47d6-80d1-32d4c561191c	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint James	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b610c6c4-d055-4c38-a993-8753dc3dc00d	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint John	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0d25df5b-c5fa-4dd8-aa17-153b01a4b4f3	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Joseph	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a4c292c0-e53c-45b1-964a-582d82d6d34a	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Lucy	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
06df90a4-dc02-455c-819a-1fb4f96cb32c	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Michael	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3cf4954a-e99b-491b-be30-26cd4113dc91	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Peter	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
56f0220b-7733-4c75-8b24-fed3f1500620	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Philip	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
55b8a76d-359c-4a3c-81e6-158f0679407c	e71c9be6-e4c7-426d-99fb-6c6e3cddee95	Saint Thomas	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ad76d8bc-c83d-4d80-ad07-f001c06c3f03	32e7ea69-752f-40ae-9ad6-395b3b500e91	Brest Region	BR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
43d917de-9000-443e-b067-58654fb8a6d6	32e7ea69-752f-40ae-9ad6-395b3b500e91	Gomel Region	HO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2b3423a6-b1fe-4ad5-b3d3-929c81baccca	32e7ea69-752f-40ae-9ad6-395b3b500e91	Grodno Region	HR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4d8ae41b-2182-4563-a407-62008e42edcd	32e7ea69-752f-40ae-9ad6-395b3b500e91	Minsk	HM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0b6e7f64-aa10-4fdc-94db-4193c50a7b69	32e7ea69-752f-40ae-9ad6-395b3b500e91	Minsk Region	MI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6c1d2c9b-6977-433a-a092-af16f8986967	32e7ea69-752f-40ae-9ad6-395b3b500e91	Mogilev Region	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
167941a9-ba2c-457c-82f6-be1e17e176e9	32e7ea69-752f-40ae-9ad6-395b3b500e91	Vitebsk Region	VI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a1be9be1-268d-4b46-951b-d48b7e50ecae	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Antwerp	VAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c535c2d9-d7db-43d5-bf3b-ecdfc5ed3dbb	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Brussels-Capital Region	BRU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
db731840-d8dd-4615-9873-2e5a0b5a2cbf	b6fd9594-9e5d-4c93-92c0-bc7f23088710	East Flanders	VOV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ca91fa19-db10-4f34-a81b-267dcfeb59f5	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Flanders	VLG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6c4974fb-a5f2-4d65-bda9-c2df65c0771f	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Flemish Brabant	VBR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4b25bcff-6ac0-44bd-9877-9a9e83a8b623	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Hainaut	WHT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
be61eda1-4ceb-4e20-beca-ed1a440ea64c	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Limburg	VLI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
16d34146-8257-423d-9cc6-beb2e25bdb0b	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Liège	WLG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3439fcff-97d6-48c9-ba2b-183958be81e6	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Luxembourg	WLX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fca7b5e4-35f9-48f1-9703-4b5151d4a60a	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Namur	WNA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4710e100-f90a-47ca-9b14-56a69c7993f9	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Wallonia	WAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7b32364f-b0ba-4a48-a745-73ae90975185	b6fd9594-9e5d-4c93-92c0-bc7f23088710	Walloon Brabant	WBR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
69d475e5-bd76-47b9-a243-0b9c89767122	b6fd9594-9e5d-4c93-92c0-bc7f23088710	West Flanders	VWV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7fc090d5-74e5-4522-9e55-c3e5baf5cd3e	26769484-d319-40eb-af78-0495c42bf036	Belize District	BZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6c64f047-0876-4f49-931b-1838751d4c45	26769484-d319-40eb-af78-0495c42bf036	Cayo District	CY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
689e5a16-6d5b-413f-9410-c034de8a97b4	26769484-d319-40eb-af78-0495c42bf036	Corozal District	CZL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f28c2b07-9828-4486-a5e9-7b80cc6d1f02	26769484-d319-40eb-af78-0495c42bf036	Orange Walk District	OW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d628b2ad-e6d0-4111-bf16-c7cd2edb8c0d	26769484-d319-40eb-af78-0495c42bf036	Stann Creek District	SC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
addc80cd-8a11-4a38-a212-f98cded8950c	26769484-d319-40eb-af78-0495c42bf036	Toledo District	TOL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bd6b84a7-de0e-4c20-998c-1b1f6bb03720	be174bb6-3a7f-417a-959f-08b5b740b2fd	Alibori Department	AL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
509e9a5a-0713-416e-ad29-18adeb5e33ee	be174bb6-3a7f-417a-959f-08b5b740b2fd	Atakora Department	AK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
643f6742-ad8f-4a8a-b9e0-b1f13869af2f	be174bb6-3a7f-417a-959f-08b5b740b2fd	Atlantique Department	AQ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
845ce6cb-c3f6-47a7-9137-356e051b964b	be174bb6-3a7f-417a-959f-08b5b740b2fd	Borgou Department	BO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8a6b4232-874b-4d04-ba28-06a17c439773	be174bb6-3a7f-417a-959f-08b5b740b2fd	Collines Department	CO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6f7a5be6-231d-4dd8-bbe0-58da389379cb	be174bb6-3a7f-417a-959f-08b5b740b2fd	Donga Department	DO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7fe4db32-1ec9-4934-80c8-14ba94ef4fb5	be174bb6-3a7f-417a-959f-08b5b740b2fd	Kouffo Department	KO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
18d3087d-9a61-437c-9d29-44423b53125a	be174bb6-3a7f-417a-959f-08b5b740b2fd	Littoral Department	LI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
60118580-941d-4a1a-906f-f437c7628782	be174bb6-3a7f-417a-959f-08b5b740b2fd	Mono Department	MO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b907808a-0836-43bb-ad22-cf8447c1d7ff	be174bb6-3a7f-417a-959f-08b5b740b2fd	Ouémé Department	OU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b60e7654-cf9d-4c7e-97f4-b4252fe22058	be174bb6-3a7f-417a-959f-08b5b740b2fd	Plateau Department	PL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
725e7efa-29e7-419d-b6a0-5cc971153e4b	be174bb6-3a7f-417a-959f-08b5b740b2fd	Zou Department	ZO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9c1169cb-0e58-4358-8827-dc492f8de776	5261260d-5fc2-4388-9ca7-c361a8b5c889	Devonshire Parish	DEV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7ec65495-85fc-4b21-895e-50f72fc68ed8	5261260d-5fc2-4388-9ca7-c361a8b5c889	Hamilton Parish	HA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ab620e93-72e5-4267-b4b5-a3d0b5e92d38	5261260d-5fc2-4388-9ca7-c361a8b5c889	Paget Parish	PAG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ba790913-ac2e-4f17-ab73-5a19a78801fc	5261260d-5fc2-4388-9ca7-c361a8b5c889	Pembroke Parish	PEM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dfb230ce-51e1-4fab-ac3e-bb91b0028f35	5261260d-5fc2-4388-9ca7-c361a8b5c889	Saint George's Parish	SGE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
330c3002-a661-4d0a-8fbc-996df2f0bf46	5261260d-5fc2-4388-9ca7-c361a8b5c889	Sandys Parish	SAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c7bb7d2a-abba-4b07-933f-87a0360afdcf	5261260d-5fc2-4388-9ca7-c361a8b5c889	Smith's Parish,	SMI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9ce3f84f-1978-43cd-be15-020844467cbb	5261260d-5fc2-4388-9ca7-c361a8b5c889	Southampton Parish	SOU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1e5b82a1-9182-4b88-81b9-97515e495608	5261260d-5fc2-4388-9ca7-c361a8b5c889	Warwick Parish	WAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
775dd0b4-d259-4b45-abb7-0b4636333461	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Bumthang District	33	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8033a114-17b3-404b-a588-dcdae7f45ce5	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Chukha District	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
57e37a2a-4706-4161-9bf8-0402f2973280	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Dagana District	22	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fa54a24a-ad2a-4f31-804e-2e1bfb24c122	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Gasa District	GA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a758d70c-9b6a-4df3-a3d1-3b92968d84fa	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Haa District	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6bbc5f55-06ae-4c43-b509-d53f81dc57f5	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Lhuntse District	44	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8b1a17ce-3779-4ba6-b71b-e63526cdc9c0	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Mongar District	42	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4dcfa405-e46b-419c-a397-41f59cb7412b	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Paro District	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
25c03028-8d96-4ebd-9d14-96ba70688313	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Pemagatshel District	43	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c7ac87ee-a4c5-4031-b835-e81ab1882f4f	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Punakha District	23	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d057a55d-94f5-4112-888a-6e8c0d14c18d	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Samdrup Jongkhar District	45	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7b0f5a23-d22d-44bd-92bc-e9d4f723203c	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Samtse District	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d82c1e68-643b-4c19-b4fc-1c879dd8097d	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Sarpang District	31	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5a95de16-c23a-4844-8f80-b9ea75496862	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Thimphu District	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8d4ad32b-2b81-4da5-9ccc-fe9e5c668baa	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Trashigang District	41	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dffeb65c-4d4e-46f8-a9fb-890d38c1dcd5	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Trongsa District	32	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5ac5761b-dfc7-4eca-bfd4-63df1be964be	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Tsirang District	21	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9dbc7387-7029-4619-9b3d-6124482d6899	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Wangdue Phodrang District	24	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
aa6370f8-1c8d-4126-9094-74439a406abe	4fd034a5-3c6e-4098-b0ce-0bf0471233ab	Zhemgang District	34	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
10a94374-b679-458e-bb42-70b6b26ba1cc	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Beni Department	B	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8b083de2-e301-4bed-99b1-942b8b624637	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Chuquisaca Department	H	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
44780c4b-6e31-4f4f-aa32-feab8b86f1e7	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Cochabamba Department	C	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c6e0f8a0-4c32-42ef-9a42-e3152afe48b3	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	La Paz Department	L	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c87dc886-add8-42de-945c-59016fae750f	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Oruro Department	O	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ae607a5f-951d-4553-9afc-9b8cd001aafd	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Pando Department	N	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1babaf08-5d89-4c94-aead-8bcab4f7c17f	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Potosí Department	P	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1dc3e683-82c4-4c40-8f6b-fcd94dba8930	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Santa Cruz Department	S	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3da7ddb5-3b4e-4ea0-ad85-8a0b63f937be	2b89ac82-0a8a-4df0-ae54-de6d96a2f861	Tarija Department	T	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
27406a1a-a772-404b-903d-5f24a4b06e09	12b09b09-f48e-4764-b1fc-fcf96735b31f	Bosnian Podrinje Canton	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f2b0b303-d88b-4898-bacc-d2acd9634f36	12b09b09-f48e-4764-b1fc-fcf96735b31f	Brčko District	BRC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bd0bdab6-a929-4a0d-b703-59baac17e942	12b09b09-f48e-4764-b1fc-fcf96735b31f	Canton 10	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8874167c-fa53-4d0a-af10-893a14c198fd	12b09b09-f48e-4764-b1fc-fcf96735b31f	Central Bosnia Canton	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7fde5cbc-3d17-448a-ab5d-1c7949c1abd3	12b09b09-f48e-4764-b1fc-fcf96735b31f	Federation of Bosnia and Herzegovina	BIH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
869e1b92-e34b-4315-96d3-54701ec2ab1e	12b09b09-f48e-4764-b1fc-fcf96735b31f	Herzegovina-Neretva Canton	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f39e469b-03c5-43a7-b51e-de0e065971c0	12b09b09-f48e-4764-b1fc-fcf96735b31f	Posavina Canton	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7b8581ba-055c-4739-a529-48ffc6aa36c4	12b09b09-f48e-4764-b1fc-fcf96735b31f	Republika Srpska	SRP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
471915f2-c6b6-421d-bb26-4db601331716	12b09b09-f48e-4764-b1fc-fcf96735b31f	Sarajevo Canton	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2381ea76-a574-4d99-994d-1663008d50f1	12b09b09-f48e-4764-b1fc-fcf96735b31f	Tuzla Canton	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9a0dc0e8-cb33-4ac1-8f10-4bc68aaaea1b	12b09b09-f48e-4764-b1fc-fcf96735b31f	Una-Sana Canton	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3cf697b3-c9de-4fa5-99ed-b4db5deb0f17	12b09b09-f48e-4764-b1fc-fcf96735b31f	West Herzegovina Canton	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
155b5237-9b13-476b-9034-7612c2d8c03b	12b09b09-f48e-4764-b1fc-fcf96735b31f	Zenica-Doboj Canton	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
58b82dfd-14af-4f69-956c-c805f90ae514	2bbdd538-f109-423f-8d19-345d7bf8f999	Central District	CE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b430bf3d-df28-4fb8-9a1c-db9a883f0ee4	2bbdd538-f109-423f-8d19-345d7bf8f999	Ghanzi District	GH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7b8314ed-b3a4-4742-9560-5a7e64dc9144	2bbdd538-f109-423f-8d19-345d7bf8f999	Kgalagadi District	KG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
433b60e6-ca1e-42ef-8247-20ef7f5b4a6a	2bbdd538-f109-423f-8d19-345d7bf8f999	Kgatleng District	KL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e32d7451-c21d-4c6c-b022-279216bb05c9	2bbdd538-f109-423f-8d19-345d7bf8f999	Kweneng District	KW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9a42c248-cbee-4001-87c0-e972e2a63ba0	2bbdd538-f109-423f-8d19-345d7bf8f999	Ngamiland	NG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
77033820-2e3f-4b69-9a5d-ec0050f444a3	2bbdd538-f109-423f-8d19-345d7bf8f999	North-East District	NE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
00c39127-dd48-4bd7-8fba-8c71625e2d55	2bbdd538-f109-423f-8d19-345d7bf8f999	North-West District	NW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
069f23a3-1b5b-4c26-aec7-368c6b6c8ecb	2bbdd538-f109-423f-8d19-345d7bf8f999	South-East District	SE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
64d314d7-d65f-4d8d-bdcd-739b7cdb88d5	2bbdd538-f109-423f-8d19-345d7bf8f999	Southern District	SO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
39a6d7eb-236b-4474-b629-7cd3ee272168	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Acre	AC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
007aaacd-f14c-49c9-bb22-6167c176852c	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Alagoas	AL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
81291fae-8c9b-4e4a-bc50-22d4d0dce5b0	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Amapá	AP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
64897080-d619-4c1d-982a-6ded04abc999	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Amazonas	AM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a77eb166-42f2-4c3b-ad5f-9e0ee162a84c	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Bahia	BA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6b8860ab-5c8c-45ed-a330-30d5db8c94fd	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Ceará	CE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ba80d2d5-1fd9-499f-92d1-b846daa744b7	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Distrito Federal	DF	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ccfe9edc-6457-4812-93e4-0c89cf01b553	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Espírito Santo	ES	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
795d6895-084e-4d12-a784-050b4bec6747	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Goiás	GO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
31d849ff-2a18-4cfd-926e-e57df087af2f	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Maranhão	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b5b7b0ed-cb37-423c-9b2a-1ac8413f01f9	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Mato Grosso	MT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4891f9aa-5753-49f3-9760-db0953f47889	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Mato Grosso do Sul	MS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8f3dc283-1d75-4386-bb9b-ea191fb8d111	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Minas Gerais	MG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a31d3713-c0cc-428d-8a9b-1af48c5cda15	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Paraná	PR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
09e416b8-98de-4231-9c91-4e186a760785	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Paraíba	PB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cceefc9a-6ffb-4fda-819d-f36b591994e3	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Pará	PA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
236f3212-ab28-4340-af5d-e6d8d395027a	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Pernambuco	PE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2a017e25-aaab-4f8b-8900-3a01016d6a81	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Piauí	PI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
239b802d-6ec1-4db6-8a17-e5b52deebf39	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Rio Grande do Norte	RN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b556c85b-96ed-4384-a5d6-48e0170a6375	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Rio Grande do Sul	RS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d098a054-fb40-46a9-b774-58cb20cd7223	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Rio de Janeiro	RJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c7fa756e-3383-48e4-8087-7e87310621d2	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Rondônia	RO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bb434a6b-42e4-477b-9e08-a97a124e160c	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Roraima	RR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a0cf824f-4701-4df9-b5ce-4fe5d91f5def	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Santa Catarina	SC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
442ec53d-b83e-493a-bc11-228edd8ad37a	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Sergipe	SE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ae8f8edc-aad6-4218-997a-52b767e40b45	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	São Paulo	SP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2c83bddf-9bdf-45aa-8f4e-7ca050cece13	fa09f332-0c10-4375-9dd5-4a3b00dccfd8	Tocantins	TO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c69187bb-f517-4671-9691-852acf6f20e9	b11e8488-688b-4320-96ee-29841c8d7275	Belait District	BE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
812ec468-14df-46ec-8e23-20d8171718e5	b11e8488-688b-4320-96ee-29841c8d7275	Brunei-Muara District	BM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ef870633-79a2-4c9f-92ab-596c63d0a547	b11e8488-688b-4320-96ee-29841c8d7275	Temburong District	TE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c284e785-4d7e-4c65-ba98-9e9bc53bd674	b11e8488-688b-4320-96ee-29841c8d7275	Tutong District	TU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
62a867e5-66c0-44af-84c5-a616c5db973c	015df332-d06f-47e1-ae02-f74948540099	Blagoevgrad Province	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
44b3646b-2000-47ce-8cee-f4c65ed4d8b6	015df332-d06f-47e1-ae02-f74948540099	Burgas Province	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
34d21542-22c2-4f04-93a8-23520e9d9335	015df332-d06f-47e1-ae02-f74948540099	Dobrich Province	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9931cf45-698d-4baf-9fb2-27ee641deca7	015df332-d06f-47e1-ae02-f74948540099	Gabrovo Province	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6c6871ef-8386-42ae-862a-2bc4625d71a0	015df332-d06f-47e1-ae02-f74948540099	Haskovo Province	26	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
22ab4773-3667-45b4-9ab3-ed29b960a2ba	015df332-d06f-47e1-ae02-f74948540099	Kardzhali Province	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5878ea8f-cc8e-4a3b-a6bb-5a71335df04d	015df332-d06f-47e1-ae02-f74948540099	Kyustendil Province	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
111c9681-5424-4d60-801a-00af93ccc401	015df332-d06f-47e1-ae02-f74948540099	Lovech Province	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
46ebc7cc-246d-4f21-b6b4-f58a8d6f8127	015df332-d06f-47e1-ae02-f74948540099	Montana Province	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
96516df3-fc77-499d-af90-329ab614f6da	015df332-d06f-47e1-ae02-f74948540099	Pazardzhik Province	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ce217f17-a6fc-4697-850e-f18975625c7d	015df332-d06f-47e1-ae02-f74948540099	Pernik Province	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9de9ed1b-56f7-470f-a488-d84e13599326	015df332-d06f-47e1-ae02-f74948540099	Pleven Province	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
76905e49-a980-4791-a081-6be5cf3c278e	015df332-d06f-47e1-ae02-f74948540099	Plovdiv Province	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bd7992d2-e11e-43a9-95dd-4fa78818cf70	015df332-d06f-47e1-ae02-f74948540099	Razgrad Province	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6e1c2c1d-3a11-4dd8-9514-37f15c2fe4a0	015df332-d06f-47e1-ae02-f74948540099	Ruse Province	18	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
44365c5e-a938-4c5a-9599-6a9e7639423e	015df332-d06f-47e1-ae02-f74948540099	Shumen	27	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a248f6bd-91e4-4ce5-825e-682f78c37e5b	015df332-d06f-47e1-ae02-f74948540099	Silistra Province	19	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4134c795-bd0d-4110-8ea2-b18fe190ba81	015df332-d06f-47e1-ae02-f74948540099	Sliven Province	20	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7ef48e3e-3264-421a-bf24-4bfe7a6c78f7	015df332-d06f-47e1-ae02-f74948540099	Smolyan Province	21	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c0d3ebc1-4740-4ada-9f45-7643c5362e04	015df332-d06f-47e1-ae02-f74948540099	Sofia City Province	22	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
43732f3e-180e-478d-b48d-5d35c5b8f5aa	015df332-d06f-47e1-ae02-f74948540099	Sofia Province	23	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9ec13038-01e4-4f5a-8894-307135cf09c4	015df332-d06f-47e1-ae02-f74948540099	Stara Zagora Province	24	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7e8ca3d5-fd51-4ac8-8efe-632cac66d3f5	015df332-d06f-47e1-ae02-f74948540099	Targovishte Province	25	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
da81ba47-48a8-4955-bd9d-058b832a04ac	015df332-d06f-47e1-ae02-f74948540099	Varna Province	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
69b7a1fb-7230-4874-a863-f7aab1bad69f	015df332-d06f-47e1-ae02-f74948540099	Veliko Tarnovo Province	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8feafc5c-342e-4374-bc08-48e1a0a94457	015df332-d06f-47e1-ae02-f74948540099	Vidin Province	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
71a3ab78-82c1-4f46-af8a-9bbb3d942d01	015df332-d06f-47e1-ae02-f74948540099	Vratsa Province	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cecde7f8-b715-42ae-8503-0ebc6bfc92cf	015df332-d06f-47e1-ae02-f74948540099	Yambol Province	28	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
446ff794-fa19-4413-b55e-956dc75f3886	fda12e1f-c320-4fa1-b1c8-f017572df746	Balé Province	BAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
45ddafad-a004-4793-842f-d587735bab12	fda12e1f-c320-4fa1-b1c8-f017572df746	Bam Province	BAM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
46cfa8c5-8158-446a-861f-330bd890cda0	fda12e1f-c320-4fa1-b1c8-f017572df746	Banwa Province	BAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5000a894-95fb-453e-a494-d3c5d1a49014	fda12e1f-c320-4fa1-b1c8-f017572df746	Bazèga Province	BAZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b774f1df-d1a7-4731-967b-aed07a10c5c6	fda12e1f-c320-4fa1-b1c8-f017572df746	Boucle du Mouhoun Region	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
315c25e3-32f3-4604-93a8-4eb70e2548ff	fda12e1f-c320-4fa1-b1c8-f017572df746	Bougouriba Province	BGR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5a60f87b-204b-4381-b67e-d44f9350c633	fda12e1f-c320-4fa1-b1c8-f017572df746	Boulgou	BLG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a6d4362e-ae3f-4516-8f13-0afa8e8708d3	fda12e1f-c320-4fa1-b1c8-f017572df746	Cascades Region	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
24100dec-4302-432c-ac99-319bd60f2d5a	fda12e1f-c320-4fa1-b1c8-f017572df746	Centre	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8f3002d7-eb9b-486e-a10a-6bc771b48d67	fda12e1f-c320-4fa1-b1c8-f017572df746	Centre-Est Region	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7d7c8598-fc8a-499c-94be-dcb66964fa59	fda12e1f-c320-4fa1-b1c8-f017572df746	Centre-Nord Region	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4362bf93-4fc9-4b88-bf60-a49c96edefd9	fda12e1f-c320-4fa1-b1c8-f017572df746	Centre-Ouest Region	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
235940cc-f6eb-434f-be3b-2e56baacf66f	fda12e1f-c320-4fa1-b1c8-f017572df746	Centre-Sud Region	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
016f9b91-f023-49aa-8b3b-8acccdca678c	fda12e1f-c320-4fa1-b1c8-f017572df746	Comoé Province	COM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c52c0c03-7a18-457f-8bf1-27c592cb030c	fda12e1f-c320-4fa1-b1c8-f017572df746	Est Region	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a31478fe-20a7-4bb8-ac38-78d3a12cb9ce	fda12e1f-c320-4fa1-b1c8-f017572df746	Ganzourgou Province	GAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e6aee868-42e4-45cb-91c1-1b76bcddf1d9	fda12e1f-c320-4fa1-b1c8-f017572df746	Gnagna Province	GNA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eaa3f596-88dc-47cc-98b1-7ee24f9957dd	fda12e1f-c320-4fa1-b1c8-f017572df746	Gourma Province	GOU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3029fef8-404e-4c34-9bfe-48e6192757c9	fda12e1f-c320-4fa1-b1c8-f017572df746	Hauts-Bassins Region	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
585ece34-9864-445c-889c-ef88f1242fd8	fda12e1f-c320-4fa1-b1c8-f017572df746	Houet Province	HOU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fd6bc59e-800c-4d9b-8c55-363812521d9b	fda12e1f-c320-4fa1-b1c8-f017572df746	Ioba Province	IOB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e29395ac-30ac-404c-89c4-0d20884bd1a1	fda12e1f-c320-4fa1-b1c8-f017572df746	Kadiogo Province	KAD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c58dbd83-8b37-455a-854d-6c873d2efa12	fda12e1f-c320-4fa1-b1c8-f017572df746	Komondjari Province	KMD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6237791d-ed23-44af-817d-7b9516843416	fda12e1f-c320-4fa1-b1c8-f017572df746	Kompienga Province	KMP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
df7e6d38-01eb-4a2a-af7d-b9dc1005f4fb	fda12e1f-c320-4fa1-b1c8-f017572df746	Kossi Province	KOS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6ce32505-f09a-4bc6-907a-5989ac5f7d3e	fda12e1f-c320-4fa1-b1c8-f017572df746	Koulpélogo Province	KOP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2b751d45-8a06-43eb-bbfd-bb8f62c0b3ac	fda12e1f-c320-4fa1-b1c8-f017572df746	Kouritenga Province	KOT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
885f4bd7-9f50-4979-a793-ddee2c39b235	fda12e1f-c320-4fa1-b1c8-f017572df746	Kourwéogo Province	KOW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7fc3a8ce-61cb-4541-82a5-1792d5f409ff	fda12e1f-c320-4fa1-b1c8-f017572df746	Kénédougou Province	KEN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c183d115-a4d9-4402-98e0-b62e863e9727	fda12e1f-c320-4fa1-b1c8-f017572df746	Loroum Province	LOR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2d67e55a-e4f6-4700-8c2d-a4e1e8f2b810	fda12e1f-c320-4fa1-b1c8-f017572df746	Léraba Province	LER	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7ed97d51-3349-4736-8acf-d541fa033197	fda12e1f-c320-4fa1-b1c8-f017572df746	Mouhoun	MOU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d93293b1-2528-4cde-bb54-6246afa66de5	fda12e1f-c320-4fa1-b1c8-f017572df746	Nahouri Province	NAO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1ba023a0-e52c-4426-9e62-6380b69c8257	fda12e1f-c320-4fa1-b1c8-f017572df746	Namentenga Province	NAM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
92df8970-5da0-48fd-a556-d43459b10b56	fda12e1f-c320-4fa1-b1c8-f017572df746	Nayala Province	NAY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e32012bb-b08a-460a-a985-412717e00d23	fda12e1f-c320-4fa1-b1c8-f017572df746	Nord Region, Burkina Faso	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
48ddfda1-a0b8-4c66-86ca-481720c96b51	fda12e1f-c320-4fa1-b1c8-f017572df746	Noumbiel Province	NOU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
60a6e409-c93b-4af8-a96f-7e50170e4a79	fda12e1f-c320-4fa1-b1c8-f017572df746	Oubritenga Province	OUB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
62140e01-9e7b-41a5-a0f4-d4dc0dc6804a	fda12e1f-c320-4fa1-b1c8-f017572df746	Oudalan Province	OUD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
57770330-c2dd-483c-930c-be0cc113c961	fda12e1f-c320-4fa1-b1c8-f017572df746	Passoré Province	PAS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
37fef1a6-d5cb-44b7-8dde-1d779c51ac57	fda12e1f-c320-4fa1-b1c8-f017572df746	Plateau-Central Region	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ec2af17f-fc0c-4bf5-8a74-28c03fbb934b	fda12e1f-c320-4fa1-b1c8-f017572df746	Poni Province	PON	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ac98fbe7-7997-4e37-adda-26f74a2d74f9	fda12e1f-c320-4fa1-b1c8-f017572df746	Sahel Region	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
297f15dd-fc50-4fbc-8787-6bf8c1a8077c	fda12e1f-c320-4fa1-b1c8-f017572df746	Sanguié Province	SNG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5b7b51a9-d532-4143-b0e5-2e1a86ab85a0	fda12e1f-c320-4fa1-b1c8-f017572df746	Sanmatenga Province	SMT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5706e9f0-8c8d-4ef9-9e86-933cd5f09e13	fda12e1f-c320-4fa1-b1c8-f017572df746	Sissili Province	SIS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f3c59960-df30-41a0-a7ef-cae10c824669	fda12e1f-c320-4fa1-b1c8-f017572df746	Soum Province	SOM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cab3331c-4128-4ca3-b1ca-ee284219f49d	fda12e1f-c320-4fa1-b1c8-f017572df746	Sourou Province	SOR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
242a0a63-c723-457c-8ed1-09b436a4e127	fda12e1f-c320-4fa1-b1c8-f017572df746	Sud-Ouest Region	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4276a2e0-732a-4931-bccf-567eacef51d7	fda12e1f-c320-4fa1-b1c8-f017572df746	Séno Province	SEN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cabb164d-b6f1-459a-af4f-01883cc3c823	fda12e1f-c320-4fa1-b1c8-f017572df746	Tapoa Province	TAP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9a4008df-d4cc-44d2-9354-2b6cf1456b7b	fda12e1f-c320-4fa1-b1c8-f017572df746	Tuy Province	TUI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0f3c8022-2396-41c9-860e-e0716a5e5b23	fda12e1f-c320-4fa1-b1c8-f017572df746	Yagha Province	YAG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9ca6203d-57bb-44f5-849b-f205dc25f7b8	fda12e1f-c320-4fa1-b1c8-f017572df746	Yatenga Province	YAT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
98899d08-9917-4542-a082-f0f6f954aeba	fda12e1f-c320-4fa1-b1c8-f017572df746	Ziro Province	ZIR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
efc882d1-4b30-411f-a498-ae5cfd3728e0	fda12e1f-c320-4fa1-b1c8-f017572df746	Zondoma Province	ZON	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
21becead-73a4-430c-9cd6-c709a258716c	fda12e1f-c320-4fa1-b1c8-f017572df746	Zoundwéogo Province	ZOU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
408aafae-d7c8-4244-ba2d-b12ff65af842	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Bubanza Province	BB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
63628e16-55b7-4eb7-b431-acb22fae064a	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Bujumbura Mairie Province	BM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cc9563b9-9f0c-407d-84ec-44bf47bac244	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Bujumbura Rural Province	BL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
49d73b16-5a1d-4031-b8aa-4814956ba0a6	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Bururi Province	BR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
91bb45cb-2242-46bc-8f9c-544c8d264a3e	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Cankuzo Province	CA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4c29b28e-4271-4bfe-9ca8-7116b6817df8	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Cibitoke Province	CI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1d765b0e-1f22-4853-a5f5-8c568b32bdab	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Gitega Province	GI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7127e1c0-7b89-42c2-a269-6ddb13cebf3e	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Karuzi Province	KR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dfa0a52c-5560-4145-9073-7f2bae475a7d	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Kayanza Province	KY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
619a564a-7215-475f-913f-12a760431ba0	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Kirundo Province	KI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
27c95ce9-81f0-4c03-bca2-5463fde4a166	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Makamba Province	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d7cf794c-73a5-41a9-a97f-15fb8b300c0e	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Muramvya Province	MU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e70abfeb-eb29-4e24-b697-8a8bd30bf6c2	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Muyinga Province	MY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
53e53ad5-3216-43e7-9ce8-7aea1895e2b3	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Mwaro Province	MW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
991f2d97-2af6-47c2-8f48-d7e2407bf7a7	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Ngozi Province	NG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
746c0943-1a3e-4a07-8cdc-eb594cd6a415	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Rumonge Province	RM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c79b213e-6588-4bdb-8f92-58016a6111bf	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Rutana Province	RT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a819bcd9-12fb-4162-8b0f-f0d328e56b76	fd7c7222-b897-486d-8d74-a2dd88bd5cec	Ruyigi Province	RY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2e48ded1-6d91-4ee0-a74b-b35b69c49dd8	aae306c2-a05d-4121-985a-f0096b4d7892	Banteay Meanchey	1	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1463ddbb-1ad0-4b37-8907-f1234643b033	aae306c2-a05d-4121-985a-f0096b4d7892	Battambang	2	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
94385239-703c-4106-981a-a096f6fc1e09	aae306c2-a05d-4121-985a-f0096b4d7892	Kampong Cham	3	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5ff19ace-0392-4e2a-9ae3-63cdd1a6d415	aae306c2-a05d-4121-985a-f0096b4d7892	Kampong Chhnang	4	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
40832ebb-1c3b-4ba6-a62a-713729029c3f	aae306c2-a05d-4121-985a-f0096b4d7892	Kampong Speu	5	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0cb7327b-6a71-47d0-88a3-dc6ae9bd58c6	aae306c2-a05d-4121-985a-f0096b4d7892	Kampong Thom	6	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5dc7e7ee-cc57-4eab-9023-a28b2a3434d2	aae306c2-a05d-4121-985a-f0096b4d7892	Kampot	7	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
199a5662-c170-4e83-a23f-3bee796e5acc	aae306c2-a05d-4121-985a-f0096b4d7892	Kandal	8	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a56178ba-889a-47fa-a053-f24095914845	aae306c2-a05d-4121-985a-f0096b4d7892	Kep	23	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
467e504a-68d4-4e80-91a3-1ac558f1ecd1	aae306c2-a05d-4121-985a-f0096b4d7892	Koh Kong	9	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e9fa3b17-e4da-4fc1-a867-744406804b99	aae306c2-a05d-4121-985a-f0096b4d7892	Kratie	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
193891b5-ea7c-4cfd-ba6a-c93a11e1e706	aae306c2-a05d-4121-985a-f0096b4d7892	Mondulkiri	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fcd2fc39-648a-48c4-b036-921324cb6097	aae306c2-a05d-4121-985a-f0096b4d7892	Oddar Meanchey	22	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b24bedea-8ad9-45e5-8ceb-065f7a79ccd4	aae306c2-a05d-4121-985a-f0096b4d7892	Pailin	24	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
73b3caec-8bca-468e-a067-c4b226dba79c	aae306c2-a05d-4121-985a-f0096b4d7892	Phnom Penh	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d545098a-e5c3-4cce-9df3-9fc16ec52536	aae306c2-a05d-4121-985a-f0096b4d7892	Preah Vihear	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
70b8e944-4d82-4e0c-a8fe-71aa88bc2f2b	aae306c2-a05d-4121-985a-f0096b4d7892	Prey Veng	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
22e24c92-ade5-4756-ac85-82348864e399	aae306c2-a05d-4121-985a-f0096b4d7892	Pursat	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
07d2f76d-fd93-4e4f-9e2d-ca0dc4c6ae96	aae306c2-a05d-4121-985a-f0096b4d7892	Ratanakiri	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
83e4a135-6308-473c-937d-56d08383caa8	aae306c2-a05d-4121-985a-f0096b4d7892	Siem Reap	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d75fc2fc-40cb-4e54-933d-59162908e613	aae306c2-a05d-4121-985a-f0096b4d7892	Sihanoukville	18	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a8e53c8a-8b07-4868-b3e7-bd45bead3b5d	aae306c2-a05d-4121-985a-f0096b4d7892	Stung Treng	19	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5e3680b7-3e02-49c6-b88f-3816e6a59e82	aae306c2-a05d-4121-985a-f0096b4d7892	Svay Rieng	20	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
09a35fca-bcb9-4d45-9403-99a4c21fb5e2	aae306c2-a05d-4121-985a-f0096b4d7892	Tai Po District	NTP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bbdf5fb4-f2d0-4cb0-9c6b-e9eaff007c98	aae306c2-a05d-4121-985a-f0096b4d7892	Takeo	21	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
38ff36a7-865a-4e0c-9d32-477d2966b82b	ed9b3483-7d19-4387-928a-16bd68027abb	Adamawa	AD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5d248b43-c9a1-43e5-abb5-545812ad2125	ed9b3483-7d19-4387-928a-16bd68027abb	Centre	CE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dd037528-ce6f-46fc-a768-bd629f1bfa2d	ed9b3483-7d19-4387-928a-16bd68027abb	East	ES	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
25755a15-baed-4b5a-8ac7-95bf1032b9de	ed9b3483-7d19-4387-928a-16bd68027abb	Far North	EN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
468422ac-8a20-4ee5-9b69-c62843129461	ed9b3483-7d19-4387-928a-16bd68027abb	Littoral	LT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
695c28f0-4868-4dbf-b1df-f97cf6d3fe96	ed9b3483-7d19-4387-928a-16bd68027abb	North	NO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2f3c0977-02ef-4836-87c7-a1b7306974d1	ed9b3483-7d19-4387-928a-16bd68027abb	Northwest	NW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8f5d2ef0-8672-49db-ab8e-027079de16d8	ed9b3483-7d19-4387-928a-16bd68027abb	South	SU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
948f11b4-19d8-460e-9c3d-1d2247de01fd	ed9b3483-7d19-4387-928a-16bd68027abb	Southwest	SW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
04a906ee-d123-48e5-8b0e-2abf15df7296	ed9b3483-7d19-4387-928a-16bd68027abb	West	OU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
53a3fd11-b9fb-4553-9040-7ba8aaf2fc03	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Alberta	AB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2c51abaf-ecf9-4876-a1ef-9b9faa9c328e	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	British Columbia	BC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
23a15f55-1ba9-4c1d-9801-9e798ee1743c	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Manitoba	MB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b1b4880b-ce80-4f58-9945-920da00525d0	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	New Brunswick	NB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
488d5265-a038-483b-a542-594ec4225b62	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Newfoundland and Labrador	NL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f6c479a3-989a-4774-85bb-1cbd297dac13	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Northwest Territories	NT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4efeb31e-d18d-43d4-b2b5-aa96f8c3d4fa	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Nova Scotia	NS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
239e4a05-9cf4-4fa0-8cb8-258c08ac4eb2	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Nunavut	NU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9a220796-2e78-4199-b40b-75ba543c79bc	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Ontario	ON	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c80d03ba-8d17-4385-925e-400198d91ae8	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Prince Edward Island	PE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9b7c0626-8afd-4fc3-89e8-2c71a41a7e60	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Quebec	QC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e6e2e67c-2bdc-4f45-896e-d4846b3ab9cf	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Saskatchewan	SK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
59762197-5bed-4dd6-8ca5-863f95febabb	d90c7fb9-75ff-4e12-be6a-5ea5985f9f40	Yukon	YT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f26a3197-0683-4694-848f-e07fe131a6c1	52ffdcbe-0e73-4719-89fa-dd4de363a165	Barlavento Islands	B	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f4a7315a-f080-4f99-a2e3-ed3a0015bd21	52ffdcbe-0e73-4719-89fa-dd4de363a165	Boa Vista	BV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4a793009-34a5-407c-8d30-c2c7765da925	52ffdcbe-0e73-4719-89fa-dd4de363a165	Brava	BR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
47c3954b-c4c0-41ab-8cff-52227b992233	52ffdcbe-0e73-4719-89fa-dd4de363a165	Maio Municipality	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
968a973e-c9b2-4180-a3bf-b68708abe8cb	52ffdcbe-0e73-4719-89fa-dd4de363a165	Mosteiros	MO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e2180f7b-b489-46a3-a2e0-2948ceb465f9	52ffdcbe-0e73-4719-89fa-dd4de363a165	Paul	PA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
03d27c51-9c34-46b7-b7df-984f108243a1	52ffdcbe-0e73-4719-89fa-dd4de363a165	Porto Novo	PN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
220bea73-ff27-46c4-9271-889309be03ad	52ffdcbe-0e73-4719-89fa-dd4de363a165	Praia	PR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
67bfbe21-5176-42dc-bc6c-9f8ba5070584	52ffdcbe-0e73-4719-89fa-dd4de363a165	Ribeira Brava Municipality	RB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
50278aed-8f94-406f-a45b-3f895a0d3a83	52ffdcbe-0e73-4719-89fa-dd4de363a165	Ribeira Grande	RG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a268d11b-cde3-4976-883d-7730f8fc6988	52ffdcbe-0e73-4719-89fa-dd4de363a165	Ribeira Grande de Santiago	RS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d3c8f1d8-458a-4585-9e92-c3b84b26f351	52ffdcbe-0e73-4719-89fa-dd4de363a165	Sal	SL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a2902717-f5e4-4cd8-88ee-79a46087195a	52ffdcbe-0e73-4719-89fa-dd4de363a165	Santa Catarina	CA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e737967c-ba12-4e40-ada4-daaea802ab9d	52ffdcbe-0e73-4719-89fa-dd4de363a165	Santa Catarina do Fogo	CF	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
28d946a3-18cb-44ee-9a92-982f855efd81	52ffdcbe-0e73-4719-89fa-dd4de363a165	Santa Cruz	CR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
12a0c909-c694-4c6d-a5ed-d4304a61725f	52ffdcbe-0e73-4719-89fa-dd4de363a165	Sotavento Islands	S	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6a62a418-5f0f-4c40-a683-24b20dab9aea	52ffdcbe-0e73-4719-89fa-dd4de363a165	São Domingos	SD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
94619aef-9300-4429-bc97-e364a17ed931	52ffdcbe-0e73-4719-89fa-dd4de363a165	São Filipe	SF	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3d72decf-5c70-4b68-ae2d-945ab54f08f3	52ffdcbe-0e73-4719-89fa-dd4de363a165	São Lourenço dos Órgãos	SO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3c7ad36d-85a8-4f26-be5c-ffbcd6e19472	52ffdcbe-0e73-4719-89fa-dd4de363a165	São Miguel	SM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
55fe7dde-860a-40b9-bce3-831e2b6b9704	52ffdcbe-0e73-4719-89fa-dd4de363a165	São Vicente	SV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
12d10b68-0d49-4fc9-871a-f0f9bc357067	52ffdcbe-0e73-4719-89fa-dd4de363a165	Tarrafal	TA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c41a38ce-a95f-41ba-a060-06a9439b4a6e	52ffdcbe-0e73-4719-89fa-dd4de363a165	Tarrafal de São Nicolau	TS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2687e9a0-e7a2-447d-aa32-0a43a403ad3d	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Bamingui-Bangoran Prefecture	BB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
64c9d97d-fa41-469c-850a-38fd107fa7f8	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Bangui	BGF	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eeaf6dae-9200-4c38-8de2-fe7c1f096379	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Basse-Kotto Prefecture	BK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
59867adb-b5fc-4127-beec-a6619f4dd9a5	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Haut-Mbomou Prefecture	HM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
130c2faa-f997-4159-9717-300b2d6d1f5a	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Haute-Kotto Prefecture	HK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c118ae41-42dd-40c0-b84d-73e60afd0ee1	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Kémo Prefecture	KG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b0c96db0-df98-4160-a4a8-dc964a64587a	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Lobaye Prefecture	LB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
07166805-8842-46ea-a15a-25d817b2a7a9	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Mambéré-Kadéï	HS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3fad3b26-9d16-408e-ac07-24c24438d922	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Mbomou Prefecture	MB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
92850586-cf09-413a-997c-0830a0eb699a	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Nana-Grébizi Economic Prefecture	KB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
932a0f3b-eb10-44b4-b895-8de07e20df7d	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Nana-Mambéré Prefecture	NM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ba1438e7-cb11-4506-bcdc-63c6fa26bfb7	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Ombella-M'Poko Prefecture	MP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4c84b159-fbe7-4c4d-af8e-d73ba52de9e4	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Ouaka Prefecture	UK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
399073d0-aab8-4a01-b697-68e4a68942c8	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Ouham Prefecture	AC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
20ec68a7-54db-4ee0-9308-6ebf736ae0cc	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Ouham-Pendé Prefecture	OP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cb5ee5c2-f4f5-4215-92a5-5f2136ceb633	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Sangha-Mbaéré	SE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e779d804-1bbc-448c-81ba-302995ad2fd6	70ac283b-7d82-41d9-8ae4-7d9698ffb864	Vakaga Prefecture	VK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6bd42f9f-bbdd-4560-8022-0e538d1164b2	d2ec6fde-ba03-4e26-985a-92c67886c928	Bahr el Gazel	BG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
97b7777a-31f7-4cd4-b8c5-0683417fcbf5	d2ec6fde-ba03-4e26-985a-92c67886c928	Batha Region	BA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c87be0ea-2c85-430d-82fa-f6329c5e60b5	d2ec6fde-ba03-4e26-985a-92c67886c928	Borkou	BO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4f95e2d9-2cb4-449d-97d5-85ba0d6eaf07	d2ec6fde-ba03-4e26-985a-92c67886c928	Ennedi Region	EN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
137d20e0-be6e-4ed7-b050-b38adb2bb5f8	d2ec6fde-ba03-4e26-985a-92c67886c928	Ennedi-Est	EE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
23876329-1d6b-401d-82a6-50d5f23fd440	d2ec6fde-ba03-4e26-985a-92c67886c928	Ennedi-Ouest	EO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4b5ddd0f-6d29-463a-8f46-7e4c2137f283	d2ec6fde-ba03-4e26-985a-92c67886c928	Guéra Region	GR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c0485e26-27fc-4d06-a76d-06438f59b9bb	d2ec6fde-ba03-4e26-985a-92c67886c928	Hadjer-Lamis	HL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ca01c930-9c4c-4e57-b4f3-7f6faae788ee	d2ec6fde-ba03-4e26-985a-92c67886c928	Kanem Region	KA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
387f2143-4274-42a0-ab5d-94e39398dec9	d2ec6fde-ba03-4e26-985a-92c67886c928	Lac Region	LC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
21685353-381d-4741-9fdb-1f679ac23747	d2ec6fde-ba03-4e26-985a-92c67886c928	Logone Occidental Region	LO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
504c55a7-248e-499b-bbcd-059bcfcd4388	d2ec6fde-ba03-4e26-985a-92c67886c928	Logone Oriental Region	LR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f4344b54-e6d6-4e24-8fb6-da4d1d3cfeaa	d2ec6fde-ba03-4e26-985a-92c67886c928	Mandoul Region	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9615bc92-ce85-4130-a09f-4e3b1b37559a	d2ec6fde-ba03-4e26-985a-92c67886c928	Mayo-Kebbi Est Region	ME	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
22a6455b-2ead-4cb9-9c4f-7adcbc1907cc	d2ec6fde-ba03-4e26-985a-92c67886c928	Mayo-Kebbi Ouest Region	MO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
55cbaf74-44a0-4c0b-a06f-05595d1d19c2	d2ec6fde-ba03-4e26-985a-92c67886c928	Moyen-Chari Region	MC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cd71fbfd-3087-4f8e-9661-8649020aa464	d2ec6fde-ba03-4e26-985a-92c67886c928	N'Djamena	ND	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8e6e35f2-f6aa-48aa-a2e3-eb7969294a21	d2ec6fde-ba03-4e26-985a-92c67886c928	Ouaddaï Region	OD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fc08d934-9ed6-4eee-a2ca-665edfb6bad7	d2ec6fde-ba03-4e26-985a-92c67886c928	Salamat Region	SA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b6045796-5d32-4e1b-92aa-3432b5501f24	d2ec6fde-ba03-4e26-985a-92c67886c928	Sila Region	SI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1f2a99ea-579c-409d-84b5-6a54ed53a5dd	d2ec6fde-ba03-4e26-985a-92c67886c928	Tandjilé Region	TA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3d36e81e-f007-4162-9508-0cd1a1ee0597	d2ec6fde-ba03-4e26-985a-92c67886c928	Tibesti Region	TI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
068e7550-9e1b-4ccd-9147-1b7a7a47fcd3	d2ec6fde-ba03-4e26-985a-92c67886c928	Wadi Fira Region	WF	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cff145bd-32b5-43ca-9dd0-448305822348	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Aisén del General Carlos Ibañez del Campo	AI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
00ea7811-4175-409b-b77f-b31981657980	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Antofagasta	AN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5e1fa178-2738-4294-bf5b-e0a7b33aeabd	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Arica y Parinacota	AP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4a865942-ad85-41b3-ac30-3cd476f2ac80	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Atacama	AT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8ac6e4ff-c1ef-466b-9af5-cd54d4eb2667	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Biobío	BI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
29091e99-d7c2-47b3-8f79-3b253a487af3	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Coquimbo	CO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
793843a1-f3d9-4426-b5cd-f4f35d7e441b	c6d50a93-0ed5-41e2-8442-9bca375e41e0	La Araucanía	AR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
34605dcf-1e12-42b4-b6f2-80b10735955f	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Libertador General Bernardo O'Higgins	LI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7363d19d-cddd-43a5-aab4-e5e38039b231	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Los Lagos	LL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
19862b59-eca6-4c08-87d7-75674a626e5b	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Los Ríos	LR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
65a98936-6baa-4d3f-8a16-73f028094cfc	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Magallanes y de la Antártica Chilena	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
19a5dc0c-95ce-4282-be4a-832e6610a0f0	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Maule	ML	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c95ed07f-4254-416f-805a-de7534341c55	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Región Metropolitana de Santiago	RM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8492fe5d-0781-4efc-afea-6e8383000cc7	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Tarapacá	TA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0d6f2e52-6521-4898-8ec1-3446b2bd7ba9	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Valparaíso	VS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
89cdeee2-8a57-49e2-bf55-d607541563cb	c6d50a93-0ed5-41e2-8442-9bca375e41e0	Ñuble	NB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8056da4f-0ab3-44e1-81bb-801f3e338f2b	a2793e29-8956-4baf-950e-c17f15317bfe	Anhui	AH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9959a46c-8ced-465f-b392-b8f7cd3d4c25	a2793e29-8956-4baf-950e-c17f15317bfe	Beijing	BJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ea9890e6-92e6-42e2-ba8b-deb245b775c7	a2793e29-8956-4baf-950e-c17f15317bfe	Chongqing	CQ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8cec9d58-939a-4ea4-ba51-b1721a4021c6	a2793e29-8956-4baf-950e-c17f15317bfe	Fujian	FJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
24f6218d-34ec-44b7-aff8-61ca4663530b	a2793e29-8956-4baf-950e-c17f15317bfe	Gansu	GS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a9c8ff0e-b97e-446a-a19e-1caa09f3b728	a2793e29-8956-4baf-950e-c17f15317bfe	Guangdong	GD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9b07beb1-b834-4ce5-95aa-abefd6bd16ba	a2793e29-8956-4baf-950e-c17f15317bfe	Guangxi Zhuang	GX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
16f35256-69c1-4ff5-a09b-049bab64f112	a2793e29-8956-4baf-950e-c17f15317bfe	Guizhou	GZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
61e1244f-3955-4092-a3c3-b12763b30b2c	a2793e29-8956-4baf-950e-c17f15317bfe	Hainan	HI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d31c3083-1591-47d9-aecb-97b2ee55a76e	a2793e29-8956-4baf-950e-c17f15317bfe	Hebei	HE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
38c9b50a-960a-444c-b989-b8a0c0b877d6	a2793e29-8956-4baf-950e-c17f15317bfe	Heilongjiang	HL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
65ede125-0bb7-4f85-9178-7c566e252448	a2793e29-8956-4baf-950e-c17f15317bfe	Henan	HA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
feb145b4-d6fa-41f1-9c27-06f834e3d808	a2793e29-8956-4baf-950e-c17f15317bfe	Hong Kong SAR	HK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
86959bcb-da96-45f8-844a-4a481a89685e	a2793e29-8956-4baf-950e-c17f15317bfe	Hubei	HB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
152de9bf-7933-48eb-b11e-ccbf54486a69	a2793e29-8956-4baf-950e-c17f15317bfe	Hunan	HN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
63f7a99a-adb2-4521-85b6-14a22baa5a92	a2793e29-8956-4baf-950e-c17f15317bfe	Inner Mongolia	NM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dd47a350-6076-4d51-86ea-dd8dff9dac95	a2793e29-8956-4baf-950e-c17f15317bfe	Jiangsu	JS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
00938651-a647-4b76-aa2c-49c438d6939a	a2793e29-8956-4baf-950e-c17f15317bfe	Jiangxi	JX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9dbea472-12e6-4c78-b7d7-864ca3fb1f04	a2793e29-8956-4baf-950e-c17f15317bfe	Jilin	JL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4a72ddd0-55e8-4747-ba6e-308b65e7f658	a2793e29-8956-4baf-950e-c17f15317bfe	Liaoning	LN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
14e9d63e-af0b-4a2e-a9ae-25c91df3975b	a2793e29-8956-4baf-950e-c17f15317bfe	Macau SAR	MO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
039ffdf8-9ce6-4c2d-80f9-0465c6cec925	a2793e29-8956-4baf-950e-c17f15317bfe	Ningxia Huizu	NX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f7c470cf-70ef-41d1-a100-8640461b9817	a2793e29-8956-4baf-950e-c17f15317bfe	Qinghai	QH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
75ccbb8e-c4dd-415a-865d-7a8dc791f238	a2793e29-8956-4baf-950e-c17f15317bfe	Shaanxi	SN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
412d75bf-4cc9-42b4-90e7-e35a67dd507e	a2793e29-8956-4baf-950e-c17f15317bfe	Shandong	SD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7bef9caa-6c21-4a9f-95e1-161aae0d3148	a2793e29-8956-4baf-950e-c17f15317bfe	Shanghai	SH	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3e12c8d7-f534-4be4-8cdd-c82f38592d24	a2793e29-8956-4baf-950e-c17f15317bfe	Shanxi	SX	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b826b454-89b2-4ea8-8c70-712cc4213651	a2793e29-8956-4baf-950e-c17f15317bfe	Sichuan	SC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
64fcd350-c5b5-4c7f-9bc3-982983da143c	a2793e29-8956-4baf-950e-c17f15317bfe	Taiwan	TW	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a362b5d0-3d06-45f5-b753-7742f5e8450e	a2793e29-8956-4baf-950e-c17f15317bfe	Tianjin	TJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a9ac1b28-2e26-4580-b29e-a7b192fde81f	a2793e29-8956-4baf-950e-c17f15317bfe	Xinjiang	XJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f289839f-fc33-4d37-bb67-db2767c1a061	a2793e29-8956-4baf-950e-c17f15317bfe	Xizang	XZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f7ba0678-99ee-4e54-9065-b358912cc0dc	a2793e29-8956-4baf-950e-c17f15317bfe	Yunnan	YN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c695d409-954c-444e-99bf-c1a7dc7fe9a6	a2793e29-8956-4baf-950e-c17f15317bfe	Zhejiang	ZJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
810a45ed-1c5b-4bcc-b406-a49dbe6f7060	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Amazonas	AMA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9cb3f91e-cfb7-495c-84d9-8daa8778fb04	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Antioquia	ANT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
18aa9bf2-2f38-4400-8b60-cc38b0e8ac04	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Arauca	ARA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3f6865ef-fe8d-40bd-8915-a2404bad4f64	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Archipiélago de San Andrés, Providencia y Santa Catalina	SAP	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eeffc8ae-3cfa-4b85-be0a-04edbc77c6ee	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Atlántico	ATL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ecb8002b-7edc-4233-b3a9-f96d2da162a9	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Bogotá D.C.	DC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f285250c-e41e-4b59-beb1-3e9b28a0471b	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Bolívar	BOL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
af825b23-3bba-47bf-8bb5-344088409796	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Boyacá	BOY	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bae4dd17-3eb3-4cc1-b463-0f9cffab56c6	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Caldas	CAL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1132a1b7-004f-4351-8b00-d25987ca07b4	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Caquetá	CAQ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ff810e4b-a3cf-40f0-b962-e54b0ac027b3	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Casanare	CAS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3c6ab6b3-de22-4e33-9871-9b75dcf97858	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Cauca	CAU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cb2df6ba-39ee-4ce3-9aad-c48b424cfc0f	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Cesar	CES	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dd311bd3-67c3-4247-a3ad-c3049b3c967c	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Chocó	CHO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f622ee71-15f4-499f-98e3-14953cf3aa50	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Cundinamarca	CUN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e9b67e91-874f-4170-ac4b-89e6ea0e5a2e	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Córdoba	COR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f9827160-5a92-4f39-88e8-a34a5aeb07d1	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Guainía	GUA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6d7a0ad3-9aa1-4fc1-aede-caf28ecdfb84	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Guaviare	GUV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8d7829f6-fd69-4ab7-993a-c5c095ee4e68	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Huila	HUI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f1c558af-5a2c-4b88-9aa0-ebae89e95647	71a2a4f7-b399-4cbd-a091-07e2b30a605c	La Guajira	LAG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ccb27b55-8afa-4ee9-ba62-e94740406d9f	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Magdalena	MAG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
439a4df3-aadf-4939-b606-ad2dc7caf5b5	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Meta	MET	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0fea3769-0325-41c3-b623-eefcb3b50156	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Nariño	NAR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
438d6088-d473-4c26-a1c5-8195f7e2afba	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Norte de Santander	NSA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
141cc71a-dace-47fe-83b7-c3acd6ed1361	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Putumayo	PUT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2e24520e-cfa0-4a7c-8f53-bd99329aa5d7	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Quindío	QUI	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cac87751-f60b-4e1c-8122-54a665f3e28d	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Risaralda	RIS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8daaad17-368f-45d1-be08-80322c0ca887	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Santander	SAN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
aa473f9a-ae4e-46d7-a25c-a14f9cc8698d	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Sucre	SUC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fcd9e537-517d-46d9-937e-5b0df89f8320	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Tolima	TOL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fd9a6159-443d-4994-beba-ff53592ceabc	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Valle del Cauca	VAC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3a02ca54-5d59-4f63-ad76-e6dd57c9819c	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Vaupés	VAU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c5ab9a6c-1bd5-4517-b254-e0d8566d5b9b	71a2a4f7-b399-4cbd-a091-07e2b30a605c	Vichada	VID	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3f8ce672-c371-4a7d-81ef-506637b590f4	b30b6346-a5d8-4589-ab9c-b69664f7e8e3	Anjouan	A	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
806f35ae-4c1a-4e8c-a599-7340e307c855	b30b6346-a5d8-4589-ab9c-b69664f7e8e3	Grande Comore	G	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4275df57-b893-432b-8797-f8bce0c4d7d5	b30b6346-a5d8-4589-ab9c-b69664f7e8e3	Mohéli	M	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
abe9753c-eae3-425b-9607-5efc33a76782	0a982ee7-e18a-4730-8901-22a54786ca12	Bouenza Department	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7818cca9-ec9c-4239-b392-49692fd2474a	0a982ee7-e18a-4730-8901-22a54786ca12	Brazzaville	BZV	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d45d1a74-5883-41f0-bfac-c7c2e134da40	0a982ee7-e18a-4730-8901-22a54786ca12	Cuvette Department	8	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2c233d8d-a8e2-4f9a-8794-4adf186495c9	0a982ee7-e18a-4730-8901-22a54786ca12	Cuvette-Ouest Department	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
da954442-5cec-4f53-a208-4a1fbf70e08c	0a982ee7-e18a-4730-8901-22a54786ca12	Kouilou Department	5	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
92939594-d90f-422f-9548-c7460c2b6099	0a982ee7-e18a-4730-8901-22a54786ca12	Likouala Department	7	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dd7130e6-ece0-4261-95b4-a30300236f30	0a982ee7-e18a-4730-8901-22a54786ca12	Lékoumou Department	2	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
86a99371-dd45-4727-9ca5-c36ac0c10201	0a982ee7-e18a-4730-8901-22a54786ca12	Niari Department	9	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dcba55b2-8a57-425e-84e3-30196e622658	0a982ee7-e18a-4730-8901-22a54786ca12	Plateaux Department	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a1296e52-e157-4ee3-b88a-5f95b8d1d099	0a982ee7-e18a-4730-8901-22a54786ca12	Pointe-Noire	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8f1dc154-f20b-452c-a7ad-423233c5e05a	0a982ee7-e18a-4730-8901-22a54786ca12	Pool Department	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ed64a510-164c-4684-b1ed-5f53cacd5303	0a982ee7-e18a-4730-8901-22a54786ca12	Sangha Department	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
51ed9cd8-6f3b-4284-943e-d68b42dc2ac8	ea85e39a-53a6-4902-8305-590e3304aa5d	Bas-Uélé	BU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fce9dd2c-d1e8-4057-b540-b1144ed76534	ea85e39a-53a6-4902-8305-590e3304aa5d	Haut-Katanga	HK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
654afa72-de17-4384-bdfa-7462df2a6da8	ea85e39a-53a6-4902-8305-590e3304aa5d	Haut-Lomami	HL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
52fb65d7-b2af-41d3-beb9-4654d8492e19	ea85e39a-53a6-4902-8305-590e3304aa5d	Haut-Uélé	HU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
faaf7b02-b7e6-40fb-a24e-f7d7514b86ed	ea85e39a-53a6-4902-8305-590e3304aa5d	Ituri	IT	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ed12539f-60ba-4185-a3e0-48c8e2b47b3f	ea85e39a-53a6-4902-8305-590e3304aa5d	Kasaï	KS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
07dcb836-7970-4513-a7d3-95f9360a263e	ea85e39a-53a6-4902-8305-590e3304aa5d	Kasaï Central	KC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
dd9e3d46-7483-4b45-bc9e-694b6a5c1c1c	ea85e39a-53a6-4902-8305-590e3304aa5d	Kasaï Oriental	KE	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
71c47884-992c-4261-bf5b-4bb29bce560f	ea85e39a-53a6-4902-8305-590e3304aa5d	Kinshasa	KN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
fb2f349d-e64c-4a4b-8672-0cd6fcd261a0	ea85e39a-53a6-4902-8305-590e3304aa5d	Kongo Central	BC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0bd1fe9e-ef84-4f2a-aff4-ddfe1f7e3142	ea85e39a-53a6-4902-8305-590e3304aa5d	Kwango	KG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1412cf6c-8348-45f8-acf9-1f7d28f74298	ea85e39a-53a6-4902-8305-590e3304aa5d	Kwilu	KL	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a3ba2216-b28e-4ff7-842e-d4c7c6bcf4e6	ea85e39a-53a6-4902-8305-590e3304aa5d	Lomami	LO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6029482e-97f9-44a2-8650-75aa1ef2a5d2	ea85e39a-53a6-4902-8305-590e3304aa5d	Lualaba	LU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
52c47832-7e43-4d39-bc0a-28cc0a481144	ea85e39a-53a6-4902-8305-590e3304aa5d	Mai-Ndombe	MN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d2932ee4-5aed-4621-9ba9-15bd4cc1cd1d	ea85e39a-53a6-4902-8305-590e3304aa5d	Maniema	MA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e5b15923-d661-4bf2-abe8-6f8471733c31	ea85e39a-53a6-4902-8305-590e3304aa5d	Mongala	MO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
40e6b120-8569-4dd9-b9ff-1c46537ae61e	ea85e39a-53a6-4902-8305-590e3304aa5d	Nord-Kivu	NK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d41baf8c-a3f3-4851-a83d-b3fec36807b3	ea85e39a-53a6-4902-8305-590e3304aa5d	Nord-Ubangi	NU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7e53ee2c-bd91-42b0-9216-95fc78eb673a	ea85e39a-53a6-4902-8305-590e3304aa5d	Sankuru	SA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e213a2e9-6cec-415c-a755-d59343e4e365	ea85e39a-53a6-4902-8305-590e3304aa5d	Sud-Kivu	SK	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
05b361a6-cdd1-4db3-bef6-1fe3d51861a1	ea85e39a-53a6-4902-8305-590e3304aa5d	Sud-Ubangi	SU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
cbde3ed3-6563-4608-96b5-c351613e9318	ea85e39a-53a6-4902-8305-590e3304aa5d	Tanganyika	TA	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
59ed65db-922e-4488-9976-aee62c3cdedb	ea85e39a-53a6-4902-8305-590e3304aa5d	Tshopo	TO	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c877caee-c121-4e49-baed-57c68635ca0d	ea85e39a-53a6-4902-8305-590e3304aa5d	Tshuapa	TU	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d8aaf305-1399-4c3f-8f4a-5532c771802e	ea85e39a-53a6-4902-8305-590e3304aa5d	Équateur	EQ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9e43774d-efec-4b7e-a125-8b8c684c8ae8	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Alajuela Province	A	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0d3c20e1-6563-469b-8638-ec37d6264fae	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Guanacaste Province	G	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4dbdf0f7-e70b-4572-827b-d253615fff39	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Heredia Province	H	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eeb4afa3-5a6c-4a3b-9aa8-33a6abe6c7ad	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Limón Province	L	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
63484868-b6ad-49bb-9baf-2302b9a19464	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Provincia de Cartago	C	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
19958a0f-9930-4dc8-aaac-54064dbf077a	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	Puntarenas Province	P	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
933380c9-45ae-4e7c-90d2-2a763edb88c5	0bc5d4d7-5cb5-4a4f-a293-4438a479415d	San José Province	SJ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e0c295c5-af4f-40eb-8332-be8b014a1715	297eb1b4-b11e-4aee-99ca-68a859259b3f	Abidjan	AB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d655b78f-379a-4034-9395-6ac7bb1a0469	297eb1b4-b11e-4aee-99ca-68a859259b3f	Agnéby	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
42c37c71-3f4a-4741-963f-b7bf51e8ca78	297eb1b4-b11e-4aee-99ca-68a859259b3f	Bafing Region	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d06e178d-5e92-44d8-8f3d-f8d721bde313	297eb1b4-b11e-4aee-99ca-68a859259b3f	Bas-Sassandra District	BS	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eb484c74-5b89-4646-958b-3a16970c117f	297eb1b4-b11e-4aee-99ca-68a859259b3f	Bas-Sassandra Region	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c4efb0cc-ae68-4dc8-813b-fed8d3ab38bf	297eb1b4-b11e-4aee-99ca-68a859259b3f	Comoé District	CM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
591a2890-2c24-4cfd-b3d4-398bde963e9c	297eb1b4-b11e-4aee-99ca-68a859259b3f	Denguélé District	DN	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d35d7210-caef-42e5-a852-2edc6e4199e7	297eb1b4-b11e-4aee-99ca-68a859259b3f	Denguélé Region	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
26a219cb-1a26-4cc9-958c-91e26dd2965a	297eb1b4-b11e-4aee-99ca-68a859259b3f	Dix-Huit Montagnes	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9a5e75b5-600e-4d2d-a320-4ec1134a094d	297eb1b4-b11e-4aee-99ca-68a859259b3f	Fromager	18	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b8aa619e-d4e1-4e89-b407-434817b22f68	297eb1b4-b11e-4aee-99ca-68a859259b3f	Gôh-Djiboua District	GD	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a0a544e6-71a6-4ec5-8cbf-fadd2fbf8ea5	297eb1b4-b11e-4aee-99ca-68a859259b3f	Haut-Sassandra	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
db27cd59-71f1-456c-bc8f-58418faa807b	297eb1b4-b11e-4aee-99ca-68a859259b3f	Lacs District	LC	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7f81bdef-c21f-4d9e-bf9b-c6c170af1383	297eb1b4-b11e-4aee-99ca-68a859259b3f	Lacs Region	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d1c4a66c-2da4-4b5b-99aa-7658447c95c6	297eb1b4-b11e-4aee-99ca-68a859259b3f	Lagunes District	LG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
201006f6-cf4c-4de4-b9b1-c96e4f1166c2	297eb1b4-b11e-4aee-99ca-68a859259b3f	Lagunes region	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b23755c9-d264-454e-9f84-7c990dd67edf	297eb1b4-b11e-4aee-99ca-68a859259b3f	Marahoué Region	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d76e2ad4-6c02-4c30-a481-235d442706cd	297eb1b4-b11e-4aee-99ca-68a859259b3f	Montagnes District	MG	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
09f9e669-e18d-4a5c-9e60-396871affab2	297eb1b4-b11e-4aee-99ca-68a859259b3f	Moyen-Cavally	19	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
32cb9a5c-1401-4dd5-8a89-97bd33bf689e	297eb1b4-b11e-4aee-99ca-68a859259b3f	Moyen-Comoé	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
09ca8a58-6f61-4c59-aed7-d0754638e5cc	297eb1b4-b11e-4aee-99ca-68a859259b3f	N'zi-Comoé	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
de8134ef-9925-4052-aa0b-f48601d749bf	297eb1b4-b11e-4aee-99ca-68a859259b3f	Sassandra-Marahoué District	SM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
93e45e5a-025d-407d-953f-8ebacfeb92c6	297eb1b4-b11e-4aee-99ca-68a859259b3f	Savanes Region	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2e3cd5fe-fd4e-4e3c-8e36-e9767ee968ac	297eb1b4-b11e-4aee-99ca-68a859259b3f	Sud-Bandama	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7c3cee42-8d5c-4efa-8ff2-b63c068a33a5	297eb1b4-b11e-4aee-99ca-68a859259b3f	Sud-Comoé	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
33c180f3-f575-43a0-8509-34d2174f7be7	297eb1b4-b11e-4aee-99ca-68a859259b3f	Vallée du Bandama District	VB	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
42419fa3-8062-4649-9ecc-1757d41f6e35	297eb1b4-b11e-4aee-99ca-68a859259b3f	Vallée du Bandama Region	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
102dacb8-bf7e-4dd7-af94-dc5a7e76ad6e	297eb1b4-b11e-4aee-99ca-68a859259b3f	Woroba District	WR	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c4ff4d0b-f47e-41d4-aff2-7ef02025abc1	297eb1b4-b11e-4aee-99ca-68a859259b3f	Worodougou	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
144b8f2b-89e8-4076-9541-a1c455c20bca	297eb1b4-b11e-4aee-99ca-68a859259b3f	Yamoussoukro	YM	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
32207eb5-72b2-4d4d-9bca-b33ca6b8f58a	297eb1b4-b11e-4aee-99ca-68a859259b3f	Zanzan Region	ZZ	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
290c23e5-6632-4d38-91a1-93edac01b44e	ae75d726-cc8c-48cc-8373-1516010f1408	Bjelovar-Bilogora County	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7b509bc2-74a8-45e8-98f1-86d1dc076697	ae75d726-cc8c-48cc-8373-1516010f1408	Brod-Posavina County	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6c54ba54-8601-4076-80f6-6eb003b6cc17	ae75d726-cc8c-48cc-8373-1516010f1408	Dubrovnik-Neretva County	19	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1804b723-d273-446d-9cb7-cdc9cbe65496	ae75d726-cc8c-48cc-8373-1516010f1408	Istria County	18	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
391a3706-9037-4c17-8db4-d7d22ea4f0d8	ae75d726-cc8c-48cc-8373-1516010f1408	Karlovac County	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
8ead8b3b-9977-4b2f-9bff-d7006df9bd8e	ae75d726-cc8c-48cc-8373-1516010f1408	Koprivnica-Križevci County	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
84e95372-b88a-4db7-82ed-5cbfc334adf3	ae75d726-cc8c-48cc-8373-1516010f1408	Krapina-Zagorje County	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
49e05de9-4854-41c2-8afd-62533b36a968	ae75d726-cc8c-48cc-8373-1516010f1408	Lika-Senj County	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6558af1b-2755-48eb-8574-ba2bb3c1999d	ae75d726-cc8c-48cc-8373-1516010f1408	Međimurje County	20	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b114ae68-fdc6-44cd-8e82-d2bbabd2491f	ae75d726-cc8c-48cc-8373-1516010f1408	Osijek-Baranja County	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
39b67554-e23f-4314-9002-b248fc307187	ae75d726-cc8c-48cc-8373-1516010f1408	Požega-Slavonia County	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e11b55db-cdd7-4e10-aae5-caa0ff73d383	ae75d726-cc8c-48cc-8373-1516010f1408	Primorje-Gorski Kotar County	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f186f722-6bbb-4dcd-9c42-a45c64cc03a9	ae75d726-cc8c-48cc-8373-1516010f1408	Sisak-Moslavina County	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2f01684d-6c74-4d82-8370-d76c2aa6eb69	ae75d726-cc8c-48cc-8373-1516010f1408	Split-Dalmatia County	17	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7ed4158b-d14f-4509-87c8-696462c576a9	ae75d726-cc8c-48cc-8373-1516010f1408	Virovitica-Podravina County	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a3ec585c-a534-4027-b58f-0da428ef6ff7	ae75d726-cc8c-48cc-8373-1516010f1408	Vukovar-Syrmia County	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c8ded1a9-1ed3-4474-9849-25038684f618	ae75d726-cc8c-48cc-8373-1516010f1408	Zadar County	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
326e0ef3-fcea-48e1-bcea-b03fec85e85c	ae75d726-cc8c-48cc-8373-1516010f1408	Zagreb	21	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
4ac67598-60e3-4b76-88b6-8ddae52c76ad	ae75d726-cc8c-48cc-8373-1516010f1408	Zagreb County	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3c6cf929-b85f-45dc-8da3-f1d960d80593	ae75d726-cc8c-48cc-8373-1516010f1408	Šibenik-Knin County	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
618214df-762d-405f-bbbe-15f7c638f22f	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Artemisa Province	15	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
38eafae6-4e44-4ce5-961f-972890f6438e	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Camagüey Province	09	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
df690b7c-80f6-4cbb-9f00-f5837f1dbf9d	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Ciego de Ávila Province	08	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3ed8822d-6d08-45c5-827e-4fb3fd9788b1	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Cienfuegos Province	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6e2fac29-9bfe-48cd-8ef2-31be6dbfbf54	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Granma Province	12	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
259a2b94-c4e1-4403-911d-5cee67cf210a	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Guantánamo Province	14	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
eed75968-9512-4e50-8b4e-85445428ae50	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Havana Province	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
75b0f8b9-ebe9-46c8-8a00-1dda1b68e37d	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Holguín Province	11	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
052689fa-d938-472a-95ef-3d8a78ef18c9	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Isla de la Juventud	99	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
7b9acb3e-801f-4f5a-baca-cc91b549a7fa	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Las Tunas Province	10	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5d28445a-66f3-4bf0-b819-7d78b58d52d6	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Matanzas Province	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
831e6645-c3af-40c0-9133-523b5462658d	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Mayabeque Province	16	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ee45f89a-238d-48d9-a9d2-daf71f7ffeb5	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Pinar del Río Province	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
44a7789a-c78d-4b3c-bd3d-6c21d6092275	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Sancti Spíritus Province	07	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
3d857f2a-d19d-4a38-a269-6a807197097a	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Santiago de Cuba Province	13	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a38af69b-2a7c-45e1-a42e-fb328a48610d	7d973cd7-1302-4f4e-8053-e1bd8506e1c4	Villa Clara Province	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1f4b2db8-dc6c-4ded-b18e-9e3b01ce631d	d7d74f41-f20e-4db3-9c4e-106e8726b122	Famagusta District (Mağusa)	04	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
963e7e68-0ddc-4e41-ba66-81d1f245699d	d7d74f41-f20e-4db3-9c4e-106e8726b122	Kyrenia District (Keryneia)	06	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d21e4825-e35c-46d9-a007-ba57d29210cd	d7d74f41-f20e-4db3-9c4e-106e8726b122	Larnaca District (Larnaka)	03	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2838881f-c417-4ce2-8d95-b5ee44f14e6b	d7d74f41-f20e-4db3-9c4e-106e8726b122	Limassol District (Leymasun)	02	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
d18560fc-b5d3-440c-ac97-8d9d29bd40a0	d7d74f41-f20e-4db3-9c4e-106e8726b122	Nicosia District (Lefkoşa)	01	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2d968978-8b6d-4c76-b39b-5f7fbe60e04d	d7d74f41-f20e-4db3-9c4e-106e8726b122	Paphos District (Pafos)	05	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
52d117d7-b506-4bd6-861c-2b2be36e93cc	165347e1-1ec2-4ead-9a24-815ab0166e81	Benešov	201	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
bda29b2d-4d1e-409e-a94c-696ae7d16b87	165347e1-1ec2-4ead-9a24-815ab0166e81	Beroun	202	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
96d379bb-2245-47c0-8c89-eadc56d1e9b5	165347e1-1ec2-4ead-9a24-815ab0166e81	Blansko	641	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
f1c422e3-f026-4879-8eae-24dc4f74fab2	165347e1-1ec2-4ead-9a24-815ab0166e81	Brno-město	642	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
07ad0dc9-73f1-4676-a9fb-fc82c1882303	165347e1-1ec2-4ead-9a24-815ab0166e81	Brno-venkov	643	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
1d24b947-b48c-414a-a54e-fcdfc953e73d	165347e1-1ec2-4ead-9a24-815ab0166e81	Bruntál	801	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6e08517b-bcf2-4ba4-807a-1ccee495b531	165347e1-1ec2-4ead-9a24-815ab0166e81	Břeclav	644	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
168a4aa7-5302-4f98-9f01-1a322a4d2d0b	165347e1-1ec2-4ead-9a24-815ab0166e81	Cheb	411	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
27b941b2-10dd-4f85-a79b-c9487c2b21e7	165347e1-1ec2-4ead-9a24-815ab0166e81	Chomutov	422	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
95c7ba38-42d0-4ffa-a52e-a75aaca6c222	165347e1-1ec2-4ead-9a24-815ab0166e81	Chrudim	531	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
c5185587-4539-47d4-8c60-f879df5b7cd4	165347e1-1ec2-4ead-9a24-815ab0166e81	Domažlice	321	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
2300f8f3-dc20-4989-9272-6cdfd60cdd74	165347e1-1ec2-4ead-9a24-815ab0166e81	Děčín	421	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
73886c35-b7aa-484f-a805-8655c711acce	165347e1-1ec2-4ead-9a24-815ab0166e81	Frýdek-Místek	802	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5f00464d-e75d-4c6c-acf3-f2f738125190	165347e1-1ec2-4ead-9a24-815ab0166e81	Havlíčkův Brod	631	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
42c12677-1f1d-483c-8b14-b68bad22bff5	165347e1-1ec2-4ead-9a24-815ab0166e81	Hodonín	645	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
ed95c9cc-1c1e-40cc-9bb8-7d99ba97625d	165347e1-1ec2-4ead-9a24-815ab0166e81	Hradec Králové	521	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
e9b18898-fdf2-444c-96be-957689212a4b	165347e1-1ec2-4ead-9a24-815ab0166e81	Jablonec nad Nisou	512	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
23db8e12-0e4a-49bb-aa6f-daf3bab1360f	165347e1-1ec2-4ead-9a24-815ab0166e81	Jeseník	711	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a6c31273-9361-418c-8cda-6e67a3c80329	165347e1-1ec2-4ead-9a24-815ab0166e81	Jihlava	632	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
5157f966-a57a-4741-a7ea-f5ad8dd65bfe	165347e1-1ec2-4ead-9a24-815ab0166e81	Jihomoravský kraj	64	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
0f8812dd-2b4b-478d-86af-05ecbe67825c	165347e1-1ec2-4ead-9a24-815ab0166e81	Jihočeský kraj	31	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
51f489a3-2730-4ebd-9c20-2bbe485f4efb	165347e1-1ec2-4ead-9a24-815ab0166e81	Jindřichův Hradec	313	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
6eed88fd-bc7c-41ed-8a02-dd8afe743b04	165347e1-1ec2-4ead-9a24-815ab0166e81	Jičín	522	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
9f83e1a5-c029-465a-9c1f-ae7f62488288	165347e1-1ec2-4ead-9a24-815ab0166e81	Karlovarský kraj	41	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a4f5217b-95a4-47bb-817e-4b560a9290a8	165347e1-1ec2-4ead-9a24-815ab0166e81	Karlovy Vary	412	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
a124ea04-3185-44ce-bbbd-77602fc913d9	165347e1-1ec2-4ead-9a24-815ab0166e81	Karviná	803	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
20783585-e017-40fd-8ae7-b541e54c80a6	165347e1-1ec2-4ead-9a24-815ab0166e81	Kladno	203	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
24368dd0-5a56-47a2-bbf7-bb332885fc77	165347e1-1ec2-4ead-9a24-815ab0166e81	Klatovy	322	t	2026-02-25 08:11:36.466	2026-02-25 08:11:36.466	\N	\N	\N	\N
b50d4b31-b05f-4d6b-9672-da857ccbe8de	165347e1-1ec2-4ead-9a24-815ab0166e81	Kolín	204	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cc06e43c-b60d-4c58-a72c-d6694bc55ecb	165347e1-1ec2-4ead-9a24-815ab0166e81	Kraj Vysočina	63	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
72c163e5-8877-403b-ad71-80d35698601a	165347e1-1ec2-4ead-9a24-815ab0166e81	Kroměříž	721	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
70c07394-f6c0-488a-a134-4c169e5b9853	165347e1-1ec2-4ead-9a24-815ab0166e81	Královéhradecký kraj	52	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
aac52c83-0f35-4b74-93ed-184d0b5763ab	165347e1-1ec2-4ead-9a24-815ab0166e81	Kutná Hora	205	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
77e1dff6-d016-4402-9af0-71d15c0ded8f	165347e1-1ec2-4ead-9a24-815ab0166e81	Liberec	513	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6da56f9d-5e67-40b1-8d48-5e35122809ee	165347e1-1ec2-4ead-9a24-815ab0166e81	Liberecký kraj	51	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ddc0c29a-9545-4dff-b7fe-691e851976ff	165347e1-1ec2-4ead-9a24-815ab0166e81	Litoměřice	423	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c418ef14-d744-4ae0-a817-87840a0f7b75	165347e1-1ec2-4ead-9a24-815ab0166e81	Louny	424	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
537a1493-9905-4c81-b5dc-34543ebec83a	165347e1-1ec2-4ead-9a24-815ab0166e81	Mladá Boleslav	207	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
48d433c7-2564-4d40-b76f-3963294b96dd	165347e1-1ec2-4ead-9a24-815ab0166e81	Moravskoslezský kraj	80	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
924ed977-19f8-4287-a7c3-db4265935808	165347e1-1ec2-4ead-9a24-815ab0166e81	Most	425	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ef690263-97b7-4a40-a6eb-3e2241d923a7	165347e1-1ec2-4ead-9a24-815ab0166e81	Mělník	206	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b335a320-eb62-439d-9b6e-7fa65f856fab	165347e1-1ec2-4ead-9a24-815ab0166e81	Nový Jičín	804	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d4079209-0afb-447d-b6b7-f79cb4d97fe0	165347e1-1ec2-4ead-9a24-815ab0166e81	Nymburk	208	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0815762b-1a64-446b-b067-971c32a85f2f	165347e1-1ec2-4ead-9a24-815ab0166e81	Náchod	523	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
746cc834-343f-4526-8d2f-d1a8150151b7	165347e1-1ec2-4ead-9a24-815ab0166e81	Olomouc	712	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dd7a05ff-3286-4193-972a-baa452a52bb3	165347e1-1ec2-4ead-9a24-815ab0166e81	Olomoucký kraj	71	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6ada1035-5b86-41e4-9c91-3b8805384a9b	165347e1-1ec2-4ead-9a24-815ab0166e81	Opava	805	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d31bd4a4-04a8-46b8-afce-bb212a22e28a	165347e1-1ec2-4ead-9a24-815ab0166e81	Ostrava-město	806	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1d7cfef3-9b9a-4db7-a8b2-7c8cbd370108	165347e1-1ec2-4ead-9a24-815ab0166e81	Pardubice	532	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a2333ace-01a1-41b3-a68a-eb529811c234	165347e1-1ec2-4ead-9a24-815ab0166e81	Pardubický kraj	53	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
08c1dcda-5848-47a8-a331-920b0c7d79ba	165347e1-1ec2-4ead-9a24-815ab0166e81	Pelhřimov	633	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b4331ce4-9996-4211-add1-96bf34d60671	165347e1-1ec2-4ead-9a24-815ab0166e81	Plzeň-jih	324	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
295d44d3-ea30-410a-b0ff-896e65301224	165347e1-1ec2-4ead-9a24-815ab0166e81	Plzeň-město	323	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c83bda29-edfc-4efb-b543-c0b5a268f746	165347e1-1ec2-4ead-9a24-815ab0166e81	Plzeň-sever	325	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bb53bcab-733b-4189-879a-7c691423ee0e	165347e1-1ec2-4ead-9a24-815ab0166e81	Plzeňský kraj	32	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c0e58765-3938-407b-a1cd-3adeb0eda161	165347e1-1ec2-4ead-9a24-815ab0166e81	Prachatice	315	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c49b22ee-a853-4a5f-9b09-7f1be082d870	165347e1-1ec2-4ead-9a24-815ab0166e81	Praha, Hlavní město	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ba41281f-aada-49d6-a61d-5fbd5ada66e8	165347e1-1ec2-4ead-9a24-815ab0166e81	Praha-východ	209	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
68f63b65-1ae2-4edb-8507-cbdae2398fe4	165347e1-1ec2-4ead-9a24-815ab0166e81	Praha-západ	20A	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f6e82c11-35ca-40e4-8969-6a2a92f31afc	165347e1-1ec2-4ead-9a24-815ab0166e81	Prostějov	713	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d647ce99-6d1f-411e-af0f-8918d56cab1e	165347e1-1ec2-4ead-9a24-815ab0166e81	Písek	314	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ce2aded3-fbdb-464b-a069-035124bf084d	165347e1-1ec2-4ead-9a24-815ab0166e81	Přerov	714	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4e2ab15c-3d8f-49cd-ab26-0f652b8ba430	165347e1-1ec2-4ead-9a24-815ab0166e81	Příbram	20B	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
380823ed-47e3-4e67-a35c-12940a7aaa01	165347e1-1ec2-4ead-9a24-815ab0166e81	Rakovník	20C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a3eec67-bab2-43ef-a2bc-eba919375981	165347e1-1ec2-4ead-9a24-815ab0166e81	Rokycany	326	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4042c9a9-1ab8-4389-95f1-1afd986b0691	165347e1-1ec2-4ead-9a24-815ab0166e81	Rychnov nad Kněžnou	524	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8a74202a-3741-4f41-b528-eea90d3c9a47	165347e1-1ec2-4ead-9a24-815ab0166e81	Semily	514	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c6796b55-bee7-491f-9bf0-d77ae3e4a61d	165347e1-1ec2-4ead-9a24-815ab0166e81	Sokolov	413	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3339c690-200c-461d-bd59-d867014e93e3	165347e1-1ec2-4ead-9a24-815ab0166e81	Strakonice	316	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6a1ac55a-85e2-4d23-9e72-15602e56b99a	165347e1-1ec2-4ead-9a24-815ab0166e81	Středočeský kraj	20	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bf65c559-7a4d-446c-bf00-a10067a85483	165347e1-1ec2-4ead-9a24-815ab0166e81	Svitavy	533	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7975e006-928a-42da-ac0f-5c60f7968d98	165347e1-1ec2-4ead-9a24-815ab0166e81	Tachov	327	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c96c2b74-004c-43d4-b666-3cf6e9b18fae	165347e1-1ec2-4ead-9a24-815ab0166e81	Teplice	426	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
822cff0d-d918-4edc-b197-1bc429833dc2	165347e1-1ec2-4ead-9a24-815ab0166e81	Trutnov	525	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
50f0bc69-8a7c-4d20-82be-e9b949be1e34	165347e1-1ec2-4ead-9a24-815ab0166e81	Tábor	317	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
33a97b56-d1ee-4d4f-8c01-c7c0d713aee1	165347e1-1ec2-4ead-9a24-815ab0166e81	Třebíč	634	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d915e8f5-9fe2-4d1e-a471-20027c241927	165347e1-1ec2-4ead-9a24-815ab0166e81	Uherské Hradiště	722	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
85e9bed5-f954-4179-a903-ae1770552d22	165347e1-1ec2-4ead-9a24-815ab0166e81	Vsetín	723	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
717c0f93-d94e-4054-98a6-7929d3e7da60	165347e1-1ec2-4ead-9a24-815ab0166e81	Vyškov	646	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
777bd937-eb62-4b8a-a3c6-2eeecedbd51a	165347e1-1ec2-4ead-9a24-815ab0166e81	Zlín	724	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
18fabb3f-c48c-41de-80e4-e43852ae3360	165347e1-1ec2-4ead-9a24-815ab0166e81	Zlínský kraj	72	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
da6c7a79-1d10-4779-836f-ff0cd34d4ac2	165347e1-1ec2-4ead-9a24-815ab0166e81	Znojmo	647	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2009c4c6-4c88-4993-bf91-9e81499c1c36	165347e1-1ec2-4ead-9a24-815ab0166e81	Ústecký kraj	42	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f61c2c75-2c57-4982-89ac-489b5ff1232f	165347e1-1ec2-4ead-9a24-815ab0166e81	Ústí nad Labem	427	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e9909c2e-5701-4500-8c73-4656ce2be5ad	165347e1-1ec2-4ead-9a24-815ab0166e81	Ústí nad Orlicí	534	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8d367695-d152-4bd0-8083-45924cf0e8d8	165347e1-1ec2-4ead-9a24-815ab0166e81	Česká Lípa	511	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e362a746-e177-4b60-bd58-11c80c1162bf	165347e1-1ec2-4ead-9a24-815ab0166e81	České Budějovice	311	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d732422a-67ad-4864-aa79-1833ee057407	165347e1-1ec2-4ead-9a24-815ab0166e81	Český Krumlov	312	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c044176c-12f6-4c56-8b62-50a2a82cca0b	165347e1-1ec2-4ead-9a24-815ab0166e81	Šumperk	715	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
21184604-4182-41a6-a78a-9212615dfd89	165347e1-1ec2-4ead-9a24-815ab0166e81	Žďár nad Sázavou	635	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
366588e1-d5e7-4d9c-91a0-d7698cd996d6	4b42526b-56f1-4ae2-9dd2-27f36093cffd	Capital Region of Denmark	84	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5e673a23-71c8-4454-b8af-1faa47b8a229	4b42526b-56f1-4ae2-9dd2-27f36093cffd	Central Denmark Region	82	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
951be407-3299-4412-94b1-9a96ddeaa8d2	4b42526b-56f1-4ae2-9dd2-27f36093cffd	North Denmark Region	81	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d59d9de2-b28d-425a-bf69-65d30d3aadf6	4b42526b-56f1-4ae2-9dd2-27f36093cffd	Region Zealand	85	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
84f96b5a-e37d-4a35-96ee-2f2c164fa34a	4b42526b-56f1-4ae2-9dd2-27f36093cffd	Region of Southern Denmark	83	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4387c5b5-5a86-4f23-ac28-9569b74fd309	8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Ali Sabieh Region	AS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
55da6687-63d2-4f1a-a80d-5bcb137e5c0d	8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Arta Region	AR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d27014ca-5fd3-443f-abac-4de128da4ed5	8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Dikhil Region	DI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
eaa81bc9-d1ee-40c3-bc8b-5dd55746eee3	8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Djibouti	DJ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
71643c35-fcd1-45f4-ad2e-2ed223697808	8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Obock Region	OB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
074a6947-90af-418f-94c8-12e424f3132c	8b50567d-c444-4f7f-b9ec-cb9dd0feefea	Tadjourah Region	TA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a3ac29e2-ff15-4b42-9b93-cc8105edaf01	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Andrew Parish	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
417045bd-1cd4-44d6-9b1d-7c1a3a262234	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint David Parish	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
347dc618-171c-49f2-bab6-dcf4c52094ed	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint George Parish	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
386cc42a-ec75-40b5-819c-54b0bd512651	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint John Parish	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0e9cee32-3e04-4cd0-be89-d7040e6d5912	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Joseph Parish	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a5553211-73a2-4789-a4f1-f266fb359079	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Luke Parish	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
19dff231-5570-42c0-8b5b-e4e96182df03	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Mark Parish	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e7e359d8-2939-4d28-b9bc-7baa4fdea7a6	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Patrick Parish	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cc9db1b6-21ca-4cf0-825d-99cdc0ce9793	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Paul Parish	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
52ccdbaa-7b2d-4ef4-a0c2-83ec504b0e63	d0ee1d1d-0484-4f29-87e5-9b13789d9c41	Saint Peter Parish	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ae3c2355-9609-43a6-9c1f-e4ff3cb16842	58f0d7b4-23f0-419d-b740-ff51572a8b02	Azua Province	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9ccb33ab-e6e8-4352-bfbd-bc7fbe3ddd5c	58f0d7b4-23f0-419d-b740-ff51572a8b02	Baoruco Province	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6765c4f0-f276-4632-9f88-7b8e80969a56	58f0d7b4-23f0-419d-b740-ff51572a8b02	Barahona Province	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e9fccf87-bebf-426a-8247-fa82ae6702cd	58f0d7b4-23f0-419d-b740-ff51572a8b02	Dajabón Province	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
85966dd8-d2c2-497d-b967-80a5bd245621	58f0d7b4-23f0-419d-b740-ff51572a8b02	Distrito Nacional	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0ccfc9c0-42e5-42d8-9dba-97347d3a142f	58f0d7b4-23f0-419d-b740-ff51572a8b02	Duarte Province	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2c46c531-a880-4954-a0ce-102298ee7f2f	58f0d7b4-23f0-419d-b740-ff51572a8b02	El Seibo Province	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a9af86aa-f4ab-4ad6-b09c-9b3165d7dce8	58f0d7b4-23f0-419d-b740-ff51572a8b02	Espaillat Province	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
342bab9b-ab4a-42ce-9d91-0756a672f3de	58f0d7b4-23f0-419d-b740-ff51572a8b02	Hato Mayor Province	30	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f7d03d8a-91cf-4321-bc75-77701d0c9071	58f0d7b4-23f0-419d-b740-ff51572a8b02	Hermanas Mirabal Province	19	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
550a7c6f-3d41-425d-9f3b-206ac9569312	58f0d7b4-23f0-419d-b740-ff51572a8b02	Independencia	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a671f6ff-c814-4b55-a8a9-175afb350473	58f0d7b4-23f0-419d-b740-ff51572a8b02	La Altagracia Province	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
27242746-663e-4fe7-ae21-42f66dbce892	58f0d7b4-23f0-419d-b740-ff51572a8b02	La Romana Province	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
23e7fae5-1f04-4e7c-a23a-2da35b94ae77	58f0d7b4-23f0-419d-b740-ff51572a8b02	La Vega Province	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f4886e6d-9b91-407b-8dab-505c130df026	58f0d7b4-23f0-419d-b740-ff51572a8b02	María Trinidad Sánchez Province	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
151f87e3-ffdc-4310-bb56-28448c290278	58f0d7b4-23f0-419d-b740-ff51572a8b02	Monseñor Nouel Province	28	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
21251860-725d-4305-a443-23358e75b289	58f0d7b4-23f0-419d-b740-ff51572a8b02	Monte Cristi Province	15	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a54b2ee4-f32a-4cbf-874f-b70eff3b9309	58f0d7b4-23f0-419d-b740-ff51572a8b02	Monte Plata Province	29	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
97be1908-1e5a-4e41-b2d0-a77da01e90cf	58f0d7b4-23f0-419d-b740-ff51572a8b02	Pedernales Province	16	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
64c3ef87-3905-46aa-8ce3-acd362e76b7a	58f0d7b4-23f0-419d-b740-ff51572a8b02	Peravia Province	17	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3cd050d9-1f5d-43a1-a6be-73d83a085260	58f0d7b4-23f0-419d-b740-ff51572a8b02	Puerto Plata Province	18	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8d7b94bd-0658-479e-be32-324cf89ca332	58f0d7b4-23f0-419d-b740-ff51572a8b02	Samaná Province	20	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
30324f93-4407-4f88-b6ac-56925a6dedc9	58f0d7b4-23f0-419d-b740-ff51572a8b02	San Cristóbal Province	21	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6eeef76e-f60d-408d-bcca-3f636388a2ae	58f0d7b4-23f0-419d-b740-ff51572a8b02	San José de Ocoa Province	31	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0dd470a3-cc15-4aa1-b0d2-6d815c9b7ed1	58f0d7b4-23f0-419d-b740-ff51572a8b02	San Juan Province	22	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fa8fe22a-c599-49a4-a6a2-c2531c79ae9e	58f0d7b4-23f0-419d-b740-ff51572a8b02	San Pedro de Macorís	23	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1ffe3ee7-9ae0-42f4-81be-805b0968fe4f	58f0d7b4-23f0-419d-b740-ff51572a8b02	Santiago Province	25	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8d991dd0-005c-4a92-a3e3-9d89e3dfca6f	58f0d7b4-23f0-419d-b740-ff51572a8b02	Santiago Rodríguez Province	26	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b0b77002-f17b-423e-b623-724ed1dc20cb	58f0d7b4-23f0-419d-b740-ff51572a8b02	Santo Domingo Province	32	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
357d8e28-c853-4543-b32a-e150137006ba	58f0d7b4-23f0-419d-b740-ff51572a8b02	Sánchez Ramírez Province	24	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3049c703-1e69-4f5b-b8c4-918ff200b46c	58f0d7b4-23f0-419d-b740-ff51572a8b02	Valverde Province	27	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8bfda921-8ac0-4f8a-96bb-1ca57551d2fb	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Aileu municipality	AL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
afc6d7e2-7e52-4b5b-9132-862486bf903d	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Ainaro Municipality	AN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0f4b3439-c3d4-4efb-ad6a-d16fdb9ff720	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Baucau Municipality	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
16b29932-5621-470e-bbf5-4d4d69862f81	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Bobonaro Municipality	BO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f614d08d-d540-415a-a0d7-97a2a6bf00ee	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Cova Lima Municipality	CO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d0241150-454d-41ea-b55d-ba36eb293736	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Dili municipality	DI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
80d2434e-d146-4cc8-b2a0-265354a43c97	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Ermera District	ER	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6129a583-a84c-4e51-96eb-fd630b1453b7	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Lautém Municipality	LA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
681e403f-af80-420b-a032-480f262d1404	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Liquiçá Municipality	LI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3cda4890-7dad-438e-9351-c634aaa8ac8a	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Manatuto District	MT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7ea77eef-1309-401c-8e69-7d169db37e45	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Manufahi Municipality	MF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
616dbe3d-5d70-4850-a480-7a1174786f3c	e4743e20-63bc-4940-a1b0-1569d2e8b1f2	Viqueque Municipality	VI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
77269e5c-fbe0-4fb0-b1de-dd709051f1cb	ec9085f3-896d-4f38-a064-7e14cc23f400	Azuay	A	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ed3c923c-c084-4a3f-9fd8-d18154c3c9af	ec9085f3-896d-4f38-a064-7e14cc23f400	Bolívar	B	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e4892fa5-245d-4841-af4a-9fd819143f33	ec9085f3-896d-4f38-a064-7e14cc23f400	Carchi	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0695e8d2-c44c-4002-b0a0-1b029a463f35	ec9085f3-896d-4f38-a064-7e14cc23f400	Cañar	F	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fe9dea52-ac23-4385-8072-cd519c983815	ec9085f3-896d-4f38-a064-7e14cc23f400	Chimborazo	H	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cb6aaa1d-c53b-44ed-a4b3-637215fea93c	ec9085f3-896d-4f38-a064-7e14cc23f400	Cotopaxi	X	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e9a124c-7dc4-42a4-83c5-57c7f7358612	ec9085f3-896d-4f38-a064-7e14cc23f400	El Oro	O	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5794170b-bc56-4ee0-956a-3b03d7f4c669	ec9085f3-896d-4f38-a064-7e14cc23f400	Esmeraldas	E	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b6495aed-c21b-41fb-9c41-d267757b6b73	ec9085f3-896d-4f38-a064-7e14cc23f400	Galápagos	W	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c473493f-2615-4511-983a-48cd6dd0ede5	ec9085f3-896d-4f38-a064-7e14cc23f400	Guayas	G	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3103b010-9ae0-430e-aa27-d2ee350b4853	ec9085f3-896d-4f38-a064-7e14cc23f400	Imbabura	I	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4c25f4e6-f2cf-41ae-994b-946e1b9e94f0	ec9085f3-896d-4f38-a064-7e14cc23f400	Loja	L	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
43c9a945-5b0e-466b-8110-c94e4540c852	ec9085f3-896d-4f38-a064-7e14cc23f400	Los Ríos	R	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6951e94c-7439-4aca-99cc-1e765ce17f8b	ec9085f3-896d-4f38-a064-7e14cc23f400	Manabí	M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cec06c8d-325b-4c7d-b944-ee97615fca5d	ec9085f3-896d-4f38-a064-7e14cc23f400	Morona-Santiago	S	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e7ea1909-22fc-4890-ba41-270c9db35b29	ec9085f3-896d-4f38-a064-7e14cc23f400	Napo	N	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
119a02a3-c1d4-4ec0-831c-29b021c4c505	ec9085f3-896d-4f38-a064-7e14cc23f400	Orellana	D	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bd3f86da-a8d3-4d81-9aed-74f12d2a5296	ec9085f3-896d-4f38-a064-7e14cc23f400	Pastaza	Y	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9633155d-a466-431a-be3d-ebc735aa5b58	ec9085f3-896d-4f38-a064-7e14cc23f400	Pichincha	P	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f052234b-1b93-490c-a997-b3d02e85783f	ec9085f3-896d-4f38-a064-7e14cc23f400	Santa Elena	SE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2442fb0e-69b0-4b0c-b581-0d4d929b745f	ec9085f3-896d-4f38-a064-7e14cc23f400	Santo Domingo de los Tsáchilas	SD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e3e7bea-6df5-4622-839d-06a33af941e9	ec9085f3-896d-4f38-a064-7e14cc23f400	Sucumbíos	U	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4e94e47d-e6de-4a52-b9ea-a46b7f0a158c	ec9085f3-896d-4f38-a064-7e14cc23f400	Tungurahua	T	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6d77a7d3-7c7c-4867-87ce-5959ebe10ac7	ec9085f3-896d-4f38-a064-7e14cc23f400	Zamora Chinchipe	Z	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
23cb2587-efff-438a-aa72-3a0109fc1e57	a104fcdb-d445-46b3-9f95-80df57697683	Alexandria	ALX	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1f2d0494-2fae-4564-837e-2d1afbb8798e	a104fcdb-d445-46b3-9f95-80df57697683	Aswan	ASN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a7aad1a3-9bd9-4b53-bebc-761d24d0e08b	a104fcdb-d445-46b3-9f95-80df57697683	Asyut	AST	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e8618107-b341-4a35-b7bf-4bad220aa2c9	a104fcdb-d445-46b3-9f95-80df57697683	Beheira	BH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
eb67cf0e-d134-4397-9a13-97ebb60b6529	a104fcdb-d445-46b3-9f95-80df57697683	Beni Suef	BNS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ff2105e7-0155-4e17-aeab-b0dd0b6fbf93	a104fcdb-d445-46b3-9f95-80df57697683	Cairo	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1478afcd-05b8-4620-bdc8-6d8c09f141e8	a104fcdb-d445-46b3-9f95-80df57697683	Dakahlia	DK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4d614750-b7ee-4404-aa9b-3567a5a4d96a	a104fcdb-d445-46b3-9f95-80df57697683	Damietta	DT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
975496b0-7233-41af-88be-d037bed20c48	a104fcdb-d445-46b3-9f95-80df57697683	Faiyum	FYM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fed09c1c-9f96-4292-aa0d-565d0384fa2e	a104fcdb-d445-46b3-9f95-80df57697683	Gharbia	GH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
61191228-fc7b-412b-acbc-23c48b406758	a104fcdb-d445-46b3-9f95-80df57697683	Giza	GZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
530b9cf4-b706-4c86-97e0-bbc347da1729	a104fcdb-d445-46b3-9f95-80df57697683	Ismailia	IS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d888b017-64ea-4283-9a7c-fa8063aa7f60	a104fcdb-d445-46b3-9f95-80df57697683	Kafr el-Sheikh	KFS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
779e8cd7-a556-48f7-8a4d-92a890b82cd7	a104fcdb-d445-46b3-9f95-80df57697683	Luxor	LX	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2e1dd855-7a85-45d1-bb46-0f014a6eedd7	a104fcdb-d445-46b3-9f95-80df57697683	Matrouh	MT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
18304209-333d-4894-a5be-9976c11bf030	a104fcdb-d445-46b3-9f95-80df57697683	Minya	MN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
75475502-cd5f-46ec-8727-5e7b1cc7beb6	a104fcdb-d445-46b3-9f95-80df57697683	Monufia	MNF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
151104cc-aa8b-4de6-810e-c6399930fe21	a104fcdb-d445-46b3-9f95-80df57697683	New Valley	WAD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d028bc10-f6bd-445e-9b71-a745363edad6	a104fcdb-d445-46b3-9f95-80df57697683	North Sinai	SIN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9ebb9c46-b36a-477f-99de-2a2508daf44c	a104fcdb-d445-46b3-9f95-80df57697683	Port Said	PTS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4716b9da-1583-432d-b87d-95f6d71ad275	a104fcdb-d445-46b3-9f95-80df57697683	Qalyubia	KB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8ffdd01f-b827-4664-b3b6-557c837fced8	a104fcdb-d445-46b3-9f95-80df57697683	Qena	KN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
668f7fa7-c399-4888-bd7a-7f0290ca9fde	a104fcdb-d445-46b3-9f95-80df57697683	Red Sea	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ab4f667e-0a0f-40d8-adf4-a4fd90fb7b46	a104fcdb-d445-46b3-9f95-80df57697683	Sharqia	SHR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c6cf9ca9-7dfa-4f55-bb3f-739c50da957e	a104fcdb-d445-46b3-9f95-80df57697683	Sohag	SHG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a3214a0e-2269-4076-9daf-ee4cc5f5b68c	a104fcdb-d445-46b3-9f95-80df57697683	South Sinai	JS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
588f2e9c-11e9-46ee-82e5-ca2bfd0a14b1	a104fcdb-d445-46b3-9f95-80df57697683	Suez	SUZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a91f8110-0ad7-47c8-83e4-6f9982cee13f	6371a41f-73d5-456f-8932-45992e432fc0	Ahuachapán Department	AH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9cf6306d-c1cf-420a-80f9-4ccf951959ef	6371a41f-73d5-456f-8932-45992e432fc0	Cabañas Department	CA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7b2aa759-e0e0-4173-a55f-6dd46c46068c	6371a41f-73d5-456f-8932-45992e432fc0	Chalatenango Department	CH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2b1a1847-fa15-4463-90a8-552c743e2619	6371a41f-73d5-456f-8932-45992e432fc0	Cuscatlán Department	CU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
edd7a4ef-a159-43d9-8b40-ee4d1fafe053	6371a41f-73d5-456f-8932-45992e432fc0	La Libertad Department	LI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
67966eea-c610-41b4-97e9-bda46132b45d	6371a41f-73d5-456f-8932-45992e432fc0	La Paz Department	PA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
46b53eb7-b978-4284-9ad4-95ca4beac9b8	6371a41f-73d5-456f-8932-45992e432fc0	La Unión Department	UN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6104d148-4e55-4efd-8d70-2f9cc4f69550	6371a41f-73d5-456f-8932-45992e432fc0	Morazán Department	MO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ad514abb-c92c-4f79-bb8b-f6647b783ea9	6371a41f-73d5-456f-8932-45992e432fc0	San Miguel Department	SM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fd8f997a-bcf1-4eb4-a766-2ec6f1ebc16e	6371a41f-73d5-456f-8932-45992e432fc0	San Salvador Department	SS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
22700529-39ae-4b22-83e6-7381fcf1d2a2	6371a41f-73d5-456f-8932-45992e432fc0	San Vicente Department	SV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
596e2056-3956-4c76-8417-41670e11c3ee	6371a41f-73d5-456f-8932-45992e432fc0	Santa Ana Department	SA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a085823d-2984-4e74-b222-d6e87613882f	6371a41f-73d5-456f-8932-45992e432fc0	Sonsonate Department	SO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2fa4141d-11ab-4f4f-85df-15c616f884a7	6371a41f-73d5-456f-8932-45992e432fc0	Usulután Department	US	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
de04ab0d-be29-465e-b03b-d6e405e2c3a0	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Annobón Province	AN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9f94bb72-6de6-49ce-ba7b-03c7d76cc418	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Bioko Norte Province	BN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0b82445a-55a8-4e4f-8d00-9f7035724c96	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Bioko Sur Province	BS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6fe21b9a-a00c-41d2-8b78-a7ed3cfcec37	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Centro Sur Province	CS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7e2c1517-445d-46fe-8fa1-f61c03469a9e	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Insular Region	I	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
93cc833a-4e08-43e9-88de-695a60bfce1b	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Kié-Ntem Province	KN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8c46dc6d-6225-477d-897d-01cc6369542f	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Litoral Province	LI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
11f2a6fe-cd53-4c9a-a4d4-a91de5a320fc	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Río Muni	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b6fb8312-6dcc-4a15-b0d6-df797073d86a	0ddf165f-bb44-4c1e-98b9-851c7520a9cd	Wele-Nzas Province	WN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4d7899fa-9e44-4b77-9982-176067b62424	a9f7d533-82c9-4476-836d-ac60e3221997	Anseba Region	AN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4e1b8737-fcc0-40f0-b4cb-a67c5ca66efb	a9f7d533-82c9-4476-836d-ac60e3221997	Debub Region	DU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8159ea72-b75e-47d4-89fe-c8bfd93f4b10	a9f7d533-82c9-4476-836d-ac60e3221997	Gash-Barka Region	GB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0480ea83-535b-4a69-9238-e371f2c3d588	a9f7d533-82c9-4476-836d-ac60e3221997	Maekel Region	MA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0f912f94-5ff2-40bd-9aab-fec96787c0bd	a9f7d533-82c9-4476-836d-ac60e3221997	Northern Red Sea Region	SK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a0175330-5b41-415a-b5a5-6de62e9af507	a9f7d533-82c9-4476-836d-ac60e3221997	Southern Red Sea Region	DK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3e01ed9d-b2fb-4ed1-bc94-20cedaadcacb	6b859a11-05d6-493f-84eb-1360f0493c47	Harju County	37	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
576ada26-a54b-402c-9ed6-b25754e3708a	6b859a11-05d6-493f-84eb-1360f0493c47	Hiiu County	39	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7bdc53f7-9298-467c-ad95-19eec938d8c2	6b859a11-05d6-493f-84eb-1360f0493c47	Ida-Viru County	44	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e5225bc6-afe1-4b97-84e6-89582f56a84a	6b859a11-05d6-493f-84eb-1360f0493c47	Järva County	51	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
174ee9b0-6e73-4057-9c1a-057836d7984b	6b859a11-05d6-493f-84eb-1360f0493c47	Jõgeva County	49	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d32cfacb-b5d5-43fc-b182-3472c8097946	6b859a11-05d6-493f-84eb-1360f0493c47	Lääne County	57	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
372fd32b-8f66-4306-8b9c-30f14e8b18cc	6b859a11-05d6-493f-84eb-1360f0493c47	Lääne-Viru County	59	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3bdf8ccd-8e40-4215-9d99-21258d76216d	6b859a11-05d6-493f-84eb-1360f0493c47	Pärnu County	67	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
230f261f-cb0a-430e-9089-8edaa98502a1	6b859a11-05d6-493f-84eb-1360f0493c47	Põlva County	65	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9b5be001-5b45-48d9-8383-06379949cd7d	6b859a11-05d6-493f-84eb-1360f0493c47	Rapla County	70	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1d2b671b-1e08-4dbb-a60c-e2f92582e100	6b859a11-05d6-493f-84eb-1360f0493c47	Saare County	74	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d8777b96-b211-4372-ad3c-7cfcb77babf6	6b859a11-05d6-493f-84eb-1360f0493c47	Tartu County	78	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b12b1db4-a6a6-4177-ab62-8754ff8ec412	6b859a11-05d6-493f-84eb-1360f0493c47	Valga County	82	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7e4d5994-58f2-4a05-b272-bce27485cf16	6b859a11-05d6-493f-84eb-1360f0493c47	Viljandi County	84	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dd5bb1e0-933e-4958-8013-19a5356aca94	6b859a11-05d6-493f-84eb-1360f0493c47	Võru County	86	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ce1d4dbe-eb18-4a81-a31d-f9b61e069a64	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Addis Ababa	AA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c08da478-5835-485d-8caa-6695c9af6c2d	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Afar Region	AF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
04571300-8b63-4d1b-9f9f-d39ac34244fe	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Amhara Region	AM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b6ff2586-3514-4d2e-a586-552f9148ef6f	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Benishangul-Gumuz Region	BE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b918d55d-93aa-41bb-9ccc-8dfa16ffe24b	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Dire Dawa	DD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0bb8cf1b-4759-4e59-bb2e-918f5c242e78	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Gambela Region	GA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
29a4f9ba-263d-452c-bf51-ed8692e6a109	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Harari Region	HA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ca1e2d32-526e-4444-bf17-953f3a4530bf	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Oromia Region	OR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
84c11163-80fd-42e9-989a-b0225e83157c	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Somali Region	SO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
03df3126-d53f-4c8e-8169-9ed991db38aa	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Southern Nations, Nationalities, and Peoples' Region	SN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
90587c3c-17f4-417a-8600-5e7b10dba6c5	1289c32b-b3f0-4833-8dc9-c65ec766d06f	Tigray Region	TI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2a64e982-2e6b-445e-bc93-6d4349fb59d2	4671149e-abf6-4a3e-9b88-63c64ca007b9	Ba	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
78eb011c-9d96-4749-a355-85c7b5ec14e8	4671149e-abf6-4a3e-9b88-63c64ca007b9	Bua	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d48738b6-f9e5-43ec-8d82-7028e6b5a304	4671149e-abf6-4a3e-9b88-63c64ca007b9	Cakaudrove	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cebb749e-70f5-4a8e-baf2-ddf250781bde	4671149e-abf6-4a3e-9b88-63c64ca007b9	Central Division	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1e90d976-7f28-4db4-bb90-bfc0980fb186	4671149e-abf6-4a3e-9b88-63c64ca007b9	Eastern Division	E	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a5a04e7c-f434-4c4e-90cb-549109041edf	4671149e-abf6-4a3e-9b88-63c64ca007b9	Kadavu	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4ef8f681-df82-4b61-b71b-ef98378986b0	4671149e-abf6-4a3e-9b88-63c64ca007b9	Lau	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c9d2ce79-f66e-4c5c-b376-8a2020e8a51a	4671149e-abf6-4a3e-9b88-63c64ca007b9	Lomaiviti	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a142ac8-13f0-4631-9a8c-ddc6cd4545db	4671149e-abf6-4a3e-9b88-63c64ca007b9	Macuata	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
67d0240d-8f2a-4fee-807c-6e814e7b7905	4671149e-abf6-4a3e-9b88-63c64ca007b9	Nadroga-Navosa	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
87b61508-9ad0-49f2-82fc-3283154d040f	4671149e-abf6-4a3e-9b88-63c64ca007b9	Naitasiri	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c11a5699-11f1-4128-961d-dc4f224a6d19	4671149e-abf6-4a3e-9b88-63c64ca007b9	Namosi	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f9342fac-137b-40ba-bcf2-a56c08e187b4	4671149e-abf6-4a3e-9b88-63c64ca007b9	Northern Division	N	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7d59c1d1-f4e5-41da-a478-4332d23d5c42	4671149e-abf6-4a3e-9b88-63c64ca007b9	Ra	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0d0b3a30-2550-4a9d-8416-d372a6dd94da	4671149e-abf6-4a3e-9b88-63c64ca007b9	Rewa	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8d47880e-0435-4ec0-bcfa-7c14727c496e	4671149e-abf6-4a3e-9b88-63c64ca007b9	Rotuma	R	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e2400b6-76a5-4105-b865-c79ace51bade	4671149e-abf6-4a3e-9b88-63c64ca007b9	Serua	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
659729e0-794c-4c05-a33b-1234201d8add	4671149e-abf6-4a3e-9b88-63c64ca007b9	Tailevu	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
851882b3-2c05-4846-b2ec-951d62f13c9d	4671149e-abf6-4a3e-9b88-63c64ca007b9	Western Division	W	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
74cc67b8-2303-4e36-978f-3dfb120c0b16	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Central Finland	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ca6778b8-bebb-4fe7-97bd-b9ddeb277456	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Central Ostrobothnia	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
078cbe2b-02eb-457c-ac8a-a84088c7123b	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Eastern Finland Province	IS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6cac9644-e20f-4040-b836-13412409d300	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Finland Proper	19	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c5e74c66-c890-40de-a665-043b53931a71	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Kainuu	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
900e78db-cb80-4171-955e-0adbfb7ca002	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Kymenlaakso	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f5c46335-0c88-44a4-b0d9-b688c5e7d5c6	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Lapland	LL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
68cc7e4f-cda9-4eb5-b84f-b7b8084a6461	da262717-6cf7-416d-8f2e-f3a6bdde12a3	North Karelia	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1bf78d43-be9f-4707-99bc-1fdd8fcc130b	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Northern Ostrobothnia	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
affdce7f-6d0c-46cd-9470-cfd17edf086c	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Northern Savonia	15	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
83d10132-5d7a-437e-aef1-38799e71d977	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Ostrobothnia	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e712a3ad-8265-4354-a823-016a07905296	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Oulu Province	OL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a6b60dea-70b4-49c7-b822-3655c6a57d4a	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Pirkanmaa	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3295529e-47eb-4751-b25d-562b19e1efdb	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Päijänne Tavastia	16	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
78ac6e51-594d-4e13-96a7-330a214185b3	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Satakunta	17	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a1dd45b1-1481-4bb8-b64b-60dd033adf75	da262717-6cf7-416d-8f2e-f3a6bdde12a3	South Karelia	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
21913fc6-b538-49fc-bd10-f37dc7ee22c7	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Southern Ostrobothnia	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8a44a384-537f-4664-8679-7519b4b38639	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Southern Savonia	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
29f9ad51-800e-4672-bded-adb20433efe0	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Tavastia Proper	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e51fbbcc-e921-4d2b-ab16-baa744f9800d	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Uusimaa	18	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
608f0681-bac3-4b1e-bc80-1b8eac80dea5	da262717-6cf7-416d-8f2e-f3a6bdde12a3	Åland Islands	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
21e19b75-8375-40ee-b6b0-ed0201ba7d23	7e190525-1ad3-45d5-9cc3-a72ecb552012	Ain	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
55777193-6291-4561-9601-4722744d0166	7e190525-1ad3-45d5-9cc3-a72ecb552012	Aisne	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
81584a0c-cf3e-41ca-aa5e-8bdb5f6d235c	7e190525-1ad3-45d5-9cc3-a72ecb552012	Allier	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f46395a8-8fbe-4f01-9555-c12ffa58383c	7e190525-1ad3-45d5-9cc3-a72ecb552012	Alpes-Maritimes	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5652bdfd-a524-491a-9273-9edbe55cb47f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Alpes-de-Haute-Provence	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fb7c1fa4-085d-4fba-b5e0-6259d864c4e0	7e190525-1ad3-45d5-9cc3-a72ecb552012	Alsace	6AE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ef018642-9a56-48b9-8061-409acbe64ab0	7e190525-1ad3-45d5-9cc3-a72ecb552012	Ardennes	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5647f609-4393-4831-8b39-c9fbe7257c08	7e190525-1ad3-45d5-9cc3-a72ecb552012	Ardèche	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d0099738-15fb-44bb-8cff-796d9ae8d75d	7e190525-1ad3-45d5-9cc3-a72ecb552012	Ariège	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c9bae09a-5421-4098-9b7c-478337d6d222	7e190525-1ad3-45d5-9cc3-a72ecb552012	Aube	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
74258d71-2c42-4ed9-aca2-4e86d3ec9ffe	7e190525-1ad3-45d5-9cc3-a72ecb552012	Aude	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a3e51aa-c79d-41a2-820f-24136af16036	7e190525-1ad3-45d5-9cc3-a72ecb552012	Auvergne-Rhône-Alpes	ARA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1bff5e4c-1f8f-47ff-9b74-6cd0f1d6e319	7e190525-1ad3-45d5-9cc3-a72ecb552012	Aveyron	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
878216dc-9ed2-4806-8928-542be2eda64d	7e190525-1ad3-45d5-9cc3-a72ecb552012	Bas-Rhin	67	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
46c6c7a5-0b68-4994-804d-1f8fb3e4bfb0	7e190525-1ad3-45d5-9cc3-a72ecb552012	Bouches-du-Rhône	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
10cf929d-79e9-4b87-a40d-c42d8b0fd6bc	7e190525-1ad3-45d5-9cc3-a72ecb552012	Bourgogne-Franche-Comté	BFC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
80aa0cd4-24aa-4e76-9e53-936212b4174e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Bretagne	BRE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a23057ff-f74c-4849-9bfe-52a8ac8ad92e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Calvados	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
11bd6897-a4b8-4553-9d9b-0c86b60ced9f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Cantal	15	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
72e5ec9a-14aa-4411-8f0f-06c2ae6e56d4	7e190525-1ad3-45d5-9cc3-a72ecb552012	Centre-Val de Loire	CVL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cc6c7063-02fd-4c0a-af2f-74e88b3a5dde	7e190525-1ad3-45d5-9cc3-a72ecb552012	Charente	16	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ee261c14-538d-4276-947f-ad10dbfb6ec2	7e190525-1ad3-45d5-9cc3-a72ecb552012	Charente-Maritime	17	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
313f4caf-4242-4f7f-9079-1dc3a483fdd7	7e190525-1ad3-45d5-9cc3-a72ecb552012	Cher	18	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d38d5120-7b4c-42b1-8360-22eebb6dce3a	7e190525-1ad3-45d5-9cc3-a72ecb552012	Clipperton	CP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
33a9398c-8d94-4401-8496-7cfa3bf74bbd	7e190525-1ad3-45d5-9cc3-a72ecb552012	Corrèze	19	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7d1cb9ee-0b5d-48ff-826e-daa82d3424ba	7e190525-1ad3-45d5-9cc3-a72ecb552012	Corse	20R	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ccd0f65a-edaf-4862-8db0-fb92984e4670	7e190525-1ad3-45d5-9cc3-a72ecb552012	Corse-du-Sud	2A	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f64d7f1b-0543-4460-88ed-25fa6b1f8664	7e190525-1ad3-45d5-9cc3-a72ecb552012	Creuse	23	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fbddd771-8883-46ff-a50f-61237354f158	7e190525-1ad3-45d5-9cc3-a72ecb552012	Côte-d'Or	21	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a3c7bf4-161a-4d95-b2f5-06df3b69e4bc	7e190525-1ad3-45d5-9cc3-a72ecb552012	Côtes-d'Armor	22	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
55b13ee7-d159-4bc9-a284-a3bc50595317	7e190525-1ad3-45d5-9cc3-a72ecb552012	Deux-Sèvres	79	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
48f46518-09ad-4e71-9c24-fe568438aa64	7e190525-1ad3-45d5-9cc3-a72ecb552012	Dordogne	24	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7400d696-0e30-4f3c-88a3-39ef0735381f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Doubs	25	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
25b6816d-80a6-47e4-9f1e-5662655d2c13	7e190525-1ad3-45d5-9cc3-a72ecb552012	Drôme	26	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9bfb786c-6fd3-4bb7-99f9-305adf51f75c	7e190525-1ad3-45d5-9cc3-a72ecb552012	Essonne	91	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
006cea03-9e71-4d42-9cd4-eb4152f71a7c	7e190525-1ad3-45d5-9cc3-a72ecb552012	Eure	27	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
05cba8f7-67de-4ecc-84fb-160f5d66f80f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Eure-et-Loir	28	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fd50f11c-4f27-4cc1-8474-4ff94a5fb74a	7e190525-1ad3-45d5-9cc3-a72ecb552012	Finistère	29	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b8f74d8f-ad47-454d-b270-ebcd9df66e35	7e190525-1ad3-45d5-9cc3-a72ecb552012	French Guiana	973	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
29d48f8a-3eb5-470f-837c-4897254021d0	7e190525-1ad3-45d5-9cc3-a72ecb552012	French Polynesia	PF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a86a8431-fc8e-40f4-981a-5225cda4a97a	7e190525-1ad3-45d5-9cc3-a72ecb552012	French Southern and Antarctic Lands	TF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f93cdeca-5b42-4be6-b225-f15d3c23b5c3	7e190525-1ad3-45d5-9cc3-a72ecb552012	Gard	30	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ee96b8fd-72cc-405a-b220-dd1221204993	7e190525-1ad3-45d5-9cc3-a72ecb552012	Gers	32	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d038f844-536d-4f6d-b8d8-513e6892a8fa	7e190525-1ad3-45d5-9cc3-a72ecb552012	Gironde	33	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cea300b3-1954-4724-a66d-f77af052ab09	7e190525-1ad3-45d5-9cc3-a72ecb552012	Grand-Est	GES	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f5e0e4f3-0d8f-4b59-ad0c-3f4581f0229a	7e190525-1ad3-45d5-9cc3-a72ecb552012	Guadeloupe	971	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
597b9bd1-07b5-4e42-8f1f-e74a4b6d97d0	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haut-Rhin	68	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e4d916a1-0ddf-4bfd-8581-9498e66ae2d8	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Corse	2B	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9116f829-218e-49f4-a91c-1d21f5592080	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Garonne	31	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
31769eb1-0d11-4201-b93e-0c5555a0956f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Loire	43	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5084a858-b89e-4eb5-9ec3-eb39b590b041	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Marne	52	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e64379fc-fdd3-40c2-a8f7-7b26b829fadc	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Savoie	74	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7c373f2c-9027-4db4-aeef-94405f77960e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Saône	70	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ed1847da-dee7-4438-a951-96f929a179ce	7e190525-1ad3-45d5-9cc3-a72ecb552012	Haute-Vienne	87	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0bd91396-509f-4c37-9d99-8a9c0188e521	7e190525-1ad3-45d5-9cc3-a72ecb552012	Hautes-Alpes	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
285c5549-6366-4ce2-8050-0b91ada98534	7e190525-1ad3-45d5-9cc3-a72ecb552012	Hautes-Pyrénées	65	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bc99badb-5d24-42b0-8b00-b71356846bc1	7e190525-1ad3-45d5-9cc3-a72ecb552012	Hauts-de-France	HDF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a0cf8bcc-9016-4001-8c4c-1c2ff397f143	7e190525-1ad3-45d5-9cc3-a72ecb552012	Hauts-de-Seine	92	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
67025816-a3c0-45bb-9197-27074ce4db1f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Hérault	34	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ed2bc657-5ceb-48ee-9c9f-b127aef28717	7e190525-1ad3-45d5-9cc3-a72ecb552012	Ille-et-Vilaine	35	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a2274a37-73ea-4d2d-bd36-ea1e50b2c74a	7e190525-1ad3-45d5-9cc3-a72ecb552012	Indre	36	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0d1234c6-0451-4dc7-8a4c-76c069b7247f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Indre-et-Loire	37	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5df478e8-63de-47c0-9719-727ea9b62b2a	7e190525-1ad3-45d5-9cc3-a72ecb552012	Isère	38	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
df6046a4-d401-4f8a-81f9-47b796f033de	7e190525-1ad3-45d5-9cc3-a72ecb552012	Jura	39	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9f5587c8-7384-4c66-92eb-c663657be6fb	7e190525-1ad3-45d5-9cc3-a72ecb552012	La Réunion	974	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a23e55a6-f423-4e15-866a-48f4751d06f1	7e190525-1ad3-45d5-9cc3-a72ecb552012	Landes	40	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f67d42a6-6f48-4128-aa9e-086584779bcd	7e190525-1ad3-45d5-9cc3-a72ecb552012	Loir-et-Cher	41	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8be4bdcc-68f5-448c-8e63-33b1e928d735	7e190525-1ad3-45d5-9cc3-a72ecb552012	Loire	42	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
25dc511e-9da6-4ba8-b2c4-5c1edb06c311	7e190525-1ad3-45d5-9cc3-a72ecb552012	Loire-Atlantique	44	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f6dcd1fe-5089-4e9a-8f06-1a6a27763b52	7e190525-1ad3-45d5-9cc3-a72ecb552012	Loiret	45	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
70cd302f-d7cd-4098-bca2-2146c128572e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Lot	46	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3e4b51aa-4e0c-43ae-929c-fac920c524d3	7e190525-1ad3-45d5-9cc3-a72ecb552012	Lot-et-Garonne	47	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a796b5d8-9498-406e-8ca6-fe50c9243b6b	7e190525-1ad3-45d5-9cc3-a72ecb552012	Lozère	48	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
015518b5-6f80-43fd-ae19-7e3a8ca14c51	7e190525-1ad3-45d5-9cc3-a72ecb552012	Maine-et-Loire	49	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5bd2e27c-0ba5-4652-bf20-dce26f10f6c4	7e190525-1ad3-45d5-9cc3-a72ecb552012	Manche	50	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
74fb2bd1-f4d5-4edb-9e44-a0244782c416	7e190525-1ad3-45d5-9cc3-a72ecb552012	Marne	51	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bf2fb934-a769-489e-8b8e-d19d7dae8baa	7e190525-1ad3-45d5-9cc3-a72ecb552012	Martinique	972	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b5edfc53-51d2-4fcc-9bfc-1f5bae5a7178	7e190525-1ad3-45d5-9cc3-a72ecb552012	Mayenne	53	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c7e7c127-2ece-42db-8391-6b05f17610ca	7e190525-1ad3-45d5-9cc3-a72ecb552012	Mayotte	976	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fea91569-d1da-4ae3-966e-dfc11849306e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Meurthe-et-Moselle	54	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
619891c6-98d8-49fb-8347-03ee074f3d5c	7e190525-1ad3-45d5-9cc3-a72ecb552012	Meuse	55	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
69b6ea36-fd9c-456e-9db9-5f35656b736c	7e190525-1ad3-45d5-9cc3-a72ecb552012	Morbihan	56	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8fb775cf-d2f4-4b27-b6dc-d8100f1298fa	7e190525-1ad3-45d5-9cc3-a72ecb552012	Moselle	57	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bd12fca6-5305-4797-9171-d51378d1952a	7e190525-1ad3-45d5-9cc3-a72ecb552012	Métropole de Lyon	69M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
73fd4d37-b026-47bf-807b-12a7dc65d184	7e190525-1ad3-45d5-9cc3-a72ecb552012	Nièvre	58	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b5defe6d-51da-4608-aac3-421fc9bce9fc	7e190525-1ad3-45d5-9cc3-a72ecb552012	Nord	59	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b0ff0659-7a65-4c1f-ba34-2e61efe81bb4	7e190525-1ad3-45d5-9cc3-a72ecb552012	Normandie	NOR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c89b57b8-ec8a-43f5-9bc1-e4829ef047a6	7e190525-1ad3-45d5-9cc3-a72ecb552012	Nouvelle-Aquitaine	NAQ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
80185c86-f209-4e49-aac1-9fbfcc857686	7e190525-1ad3-45d5-9cc3-a72ecb552012	Occitanie	OCC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
20c9d2b8-7153-45c4-bf55-927f53746670	7e190525-1ad3-45d5-9cc3-a72ecb552012	Oise	60	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6e23e5ec-d773-458e-84b9-8d5ccfff1eaf	7e190525-1ad3-45d5-9cc3-a72ecb552012	Orne	61	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
10e02415-33c0-403d-869e-7fd8b77699c4	7e190525-1ad3-45d5-9cc3-a72ecb552012	Paris	75C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2a2da4e6-3e25-4046-86f0-f0c83e1a9e8e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Pas-de-Calais	62	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ecb75e93-8573-49d0-9e9f-475b423e427b	7e190525-1ad3-45d5-9cc3-a72ecb552012	Pays-de-la-Loire	PDL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
20070a90-968c-46f2-a61d-8097eede0621	7e190525-1ad3-45d5-9cc3-a72ecb552012	Provence-Alpes-Côte-d’Azur	PAC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7ced6731-5f96-4258-8ee8-5aba27b244c7	7e190525-1ad3-45d5-9cc3-a72ecb552012	Puy-de-Dôme	63	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cf4ac835-1d7d-4576-87a1-88432cfe10e9	7e190525-1ad3-45d5-9cc3-a72ecb552012	Pyrénées-Atlantiques	64	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5db1979a-81f6-4b55-8750-f92dd94a2b85	7e190525-1ad3-45d5-9cc3-a72ecb552012	Pyrénées-Orientales	66	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
da5ed508-5b3a-4e93-9546-43780ae056e0	7e190525-1ad3-45d5-9cc3-a72ecb552012	Rhône	69	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14797868-d7ce-4819-987a-0cd1abb4a0d6	7e190525-1ad3-45d5-9cc3-a72ecb552012	Saint Pierre and Miquelon	PM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7f63e8ea-7836-4a1c-b8c2-89e36b7aacb2	7e190525-1ad3-45d5-9cc3-a72ecb552012	Saint-Barthélemy	BL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8acc3c9c-4af9-402f-9752-8a29026fba4f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Saint-Martin	MF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
74fe0ea4-74a0-4e2e-92df-1e76261e14b9	7e190525-1ad3-45d5-9cc3-a72ecb552012	Sarthe	72	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
65710d07-b886-4815-a7d5-40bf11ca6d70	7e190525-1ad3-45d5-9cc3-a72ecb552012	Savoie	73	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
33d0e9aa-48f9-4cff-ba38-c87236c5acf9	7e190525-1ad3-45d5-9cc3-a72ecb552012	Saône-et-Loire	71	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
22f25c1b-8d76-4630-9e46-6365908fdf3b	7e190525-1ad3-45d5-9cc3-a72ecb552012	Seine-Maritime	76	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b2bd27df-8b77-4c08-a62d-9e2e3f82de62	7e190525-1ad3-45d5-9cc3-a72ecb552012	Seine-Saint-Denis	93	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
13ae91a5-962d-4aee-8fd6-7aa6e0b1570d	7e190525-1ad3-45d5-9cc3-a72ecb552012	Seine-et-Marne	77	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b308e28c-6644-41f8-b7b6-782a3e7e40cc	7e190525-1ad3-45d5-9cc3-a72ecb552012	Somme	80	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f53c89de-d6eb-47f7-8cee-0079af51ad8f	7e190525-1ad3-45d5-9cc3-a72ecb552012	Tarn	81	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8b6d815a-7e23-40c9-b831-78de30570ea2	7e190525-1ad3-45d5-9cc3-a72ecb552012	Tarn-et-Garonne	82	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
744eb2bc-97dd-4467-87fa-99e96761abd3	7e190525-1ad3-45d5-9cc3-a72ecb552012	Territoire de Belfort	90	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ed400f38-f1cb-4d61-afd0-7d74abbd64c2	7e190525-1ad3-45d5-9cc3-a72ecb552012	Val-d'Oise	95	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8b91c947-ce89-497e-97f3-d2ee4ff985ad	7e190525-1ad3-45d5-9cc3-a72ecb552012	Val-de-Marne	94	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ba1415af-f876-421b-ab75-85b2456ba002	7e190525-1ad3-45d5-9cc3-a72ecb552012	Var	83	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e8025b7a-1fa1-4635-bd22-a5f1587edaff	7e190525-1ad3-45d5-9cc3-a72ecb552012	Vaucluse	84	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
747bb2c8-917c-4652-89d7-5ce47e2702f0	7e190525-1ad3-45d5-9cc3-a72ecb552012	Vendée	85	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0ccf0a69-4487-4ff4-be9d-045d71bc5445	7e190525-1ad3-45d5-9cc3-a72ecb552012	Vienne	86	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
89aeaccd-09e0-4fcb-a0f6-b5c9fe5d804e	7e190525-1ad3-45d5-9cc3-a72ecb552012	Vosges	88	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
69f84d62-4fc3-459d-b568-9a1e27348d96	7e190525-1ad3-45d5-9cc3-a72ecb552012	Wallis and Futuna	WF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ac1ef032-bb63-469d-8e46-c84ba7fa24fe	7e190525-1ad3-45d5-9cc3-a72ecb552012	Yonne	89	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
39cc3aab-9469-4f67-a6d2-caf92bc3c620	7e190525-1ad3-45d5-9cc3-a72ecb552012	Yvelines	78	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
17ff7cfa-c995-4735-a7a0-c68a3abccae9	7e190525-1ad3-45d5-9cc3-a72ecb552012	Île-de-France	IDF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14106b3f-bd2d-4780-9edd-4506b7916c92	348a47da-0436-4da5-954b-625d0237878f	Estuaire Province	1	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
880da4eb-33d3-472c-932f-8dfae7fc54c5	348a47da-0436-4da5-954b-625d0237878f	Haut-Ogooué Province	2	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e81b944f-885b-40de-978d-e9886e6f536e	348a47da-0436-4da5-954b-625d0237878f	Moyen-Ogooué Province	3	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7ca56308-980c-4790-8cfa-42fbdd02de8b	348a47da-0436-4da5-954b-625d0237878f	Ngounié Province	4	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f54c8178-27f2-47d5-ad7c-883030d3cb42	348a47da-0436-4da5-954b-625d0237878f	Nyanga Province	5	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
77e86d98-ab62-4fab-bb63-b786203b1917	348a47da-0436-4da5-954b-625d0237878f	Ogooué-Ivindo Province	6	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
861a3ad0-70d8-4082-9a56-e43472cfe6ea	348a47da-0436-4da5-954b-625d0237878f	Ogooué-Lolo Province	7	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
07d706b6-d258-473e-af09-acc81c5ab0b4	348a47da-0436-4da5-954b-625d0237878f	Ogooué-Maritime Province	8	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
93e7ea83-ac93-4434-a651-2b7dce3f2191	348a47da-0436-4da5-954b-625d0237878f	Woleu-Ntem Province	9	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4f4b4ec3-0c3f-4fcc-8eae-4ca39620bb74	b730bf01-a091-4406-8aff-2ffdd1987607	Banjul	B	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d3dc0f20-9ef9-4597-aa25-4d87c3a4ecc7	b730bf01-a091-4406-8aff-2ffdd1987607	Central River Division	M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
29547ebd-fff0-4e3a-af4f-71daa3a37b8d	b730bf01-a091-4406-8aff-2ffdd1987607	Lower River Division	L	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
afabd2a5-3db4-45ea-add8-9a6987fd6fe1	b730bf01-a091-4406-8aff-2ffdd1987607	North Bank Division	N	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e79609ce-59e6-45c4-a0db-198fd2ffa9a1	b730bf01-a091-4406-8aff-2ffdd1987607	Upper River Division	U	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8151b53e-6537-40be-860b-038ec4bbdcde	b730bf01-a091-4406-8aff-2ffdd1987607	West Coast Division	W	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0747aa88-cf82-4289-8966-1eee09d341fa	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Adjara	AJ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4d9e2a1f-2579-4603-b234-ba4836d7674d	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Autonomous Republic of Abkhazia	AB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9a17b567-397f-4466-9325-14e37948b083	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Guria	GU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
54600c5b-f575-4691-9328-ed90f33ff3ed	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Imereti	IM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6dc9fe08-2c03-40fd-85c2-03bbe94a3dce	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Kakheti	KA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b08d99d5-110a-4073-b11c-c108f04ca629	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Khelvachauri Municipality	29	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0658ba6c-d520-4f40-a8cb-52554f46e433	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Kvemo Kartli	KK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
658e0e8d-0e3a-4401-9aee-06063b82a88a	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Mtskheta-Mtianeti	MM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4c153682-50d1-4fd4-8198-1b7c1c6dd2eb	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Racha-Lechkhumi and Kvemo Svaneti	RL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ec3ad7d4-79ea-4e53-b46e-31c45a35e774	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Samegrelo-Zemo Svaneti	SZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2211f63e-9b7a-4478-ba4b-ce1cb8e3d678	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Samtskhe-Javakheti	SJ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2c087601-9e85-49a4-942d-f04b63e27f1d	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Senaki Municipality	50	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f09e2c9a-dc00-4df0-b1ba-f6e070fac2e9	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Shida Kartli	SK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
31f01707-610a-416a-8088-ce002e673c4f	afb8e8eb-90d5-4229-83c3-1b250dfeb5ed	Tbilisi	TB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bfe247b2-8a99-4ff6-8ebe-18f2b2d77c2b	3a607480-35fd-4347-937f-6cd2ad81d51e	Baden-Württemberg	BW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b23f878c-fa2c-4334-9b68-7a234f2f8c13	3a607480-35fd-4347-937f-6cd2ad81d51e	Bavaria	BY	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
144ac7ea-1225-4d59-9074-1ff1d65145ef	3a607480-35fd-4347-937f-6cd2ad81d51e	Berlin	BE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
98f07c45-6815-4e51-86bb-96d5bac56c66	3a607480-35fd-4347-937f-6cd2ad81d51e	Brandenburg	BB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f86d381e-f3f3-413a-a2ec-9e3740689dd3	3a607480-35fd-4347-937f-6cd2ad81d51e	Bremen	HB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3887ff65-2307-42b6-85f6-255d0e880d8e	3a607480-35fd-4347-937f-6cd2ad81d51e	Hamburg	HH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ad77d1bb-902e-4cf5-b00a-021a67353356	3a607480-35fd-4347-937f-6cd2ad81d51e	Hesse	HE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f495cc92-940f-45ee-aa1d-ea1b7df917fb	3a607480-35fd-4347-937f-6cd2ad81d51e	Lower Saxony	NI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
76b17150-56a8-40fe-82da-3c3f7d641412	3a607480-35fd-4347-937f-6cd2ad81d51e	Mecklenburg-Vorpommern	MV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
47bed07c-72d6-42ab-8711-22b0a96b3134	3a607480-35fd-4347-937f-6cd2ad81d51e	North Rhine-Westphalia	NW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
42df7d50-6b99-43c5-83c8-d571c3f054f2	3a607480-35fd-4347-937f-6cd2ad81d51e	Rhineland-Palatinate	RP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dadd8738-87be-44a8-b5ed-5cb1e122171e	3a607480-35fd-4347-937f-6cd2ad81d51e	Saarland	SL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e77ac819-a393-41e1-b992-762d5c0d0fec	3a607480-35fd-4347-937f-6cd2ad81d51e	Saxony	SN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bc7cacb8-6a14-40a2-b189-ce23c6963d94	3a607480-35fd-4347-937f-6cd2ad81d51e	Saxony-Anhalt	ST	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7ef49256-ccca-4ddc-b9d9-bc81ede7f6d9	3a607480-35fd-4347-937f-6cd2ad81d51e	Schleswig-Holstein	SH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0da5e5cd-26e4-4023-9951-9390d965b37e	3a607480-35fd-4347-937f-6cd2ad81d51e	Thuringia	TH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c9342d95-423a-4971-8ec2-87a0f5dfb76f	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Ahafo	AF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e2eecd5-a26b-4e94-91c3-a31f7d8aa848	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Ashanti	AH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a5fdb61d-9cf5-4d82-ae18-195bbe7c7a29	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Bono	BO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ea2240c4-821b-412b-b9b3-36fcfc1c85c1	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Bono East	BE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3d03bec9-de82-4941-a2e8-e9b8a1b02c1e	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Central	CP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
53fd22a8-c78c-4b30-ac17-607d7b996eac	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Eastern	EP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
229f9c45-d450-4779-a872-594817017f88	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Greater Accra	AA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d8cfa17b-c0ca-4f1b-b4de-eeb976147a48	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	North East	NE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0f13b3dc-9e38-4da4-bad6-1dbb774c55e4	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Northern	NP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
15c7bd76-80fe-4a49-b8e4-30c8f3085419	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Oti	OT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9652fcf8-2dcd-4685-a68a-5e292d8a0486	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Savannah	SV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cea27258-2dea-4273-874b-86ea8cd30ec9	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Upper East	UE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
70a8ebf3-2f2e-4e22-a404-af5a3f076d8f	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Upper West	UW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
411ed804-4410-46ca-bac1-924ca295df1e	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Volta	TV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9f36fad1-f577-45d8-8265-f29fc1656081	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Western	WP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7b39329e-1da6-4066-8abd-5af69e92c5e8	60bd0105-e192-4d0d-9dd5-8cafbe26dde0	Western North	WN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
09c6c4e3-bf00-4e2c-ab1a-1fe573491af4	a896d507-abf5-4173-8c66-0c147815f277	Achaea Regional Unit	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
eeb54145-e210-4452-9d24-e2e2054e5387	a896d507-abf5-4173-8c66-0c147815f277	Aetolia-Acarnania Regional Unit	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f4f5c428-d23c-4a54-86d4-3c2828893bf5	a896d507-abf5-4173-8c66-0c147815f277	Arcadia Prefecture	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
99472b63-c424-41cf-ab69-da7457ff03a7	a896d507-abf5-4173-8c66-0c147815f277	Argolis Regional Unit	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
076c8a5e-3caf-4fdb-841a-29b8c990f165	a896d507-abf5-4173-8c66-0c147815f277	Attica Region	I	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ea981555-b140-40c9-9c50-8ad2045698a1	a896d507-abf5-4173-8c66-0c147815f277	Boeotia Regional Unit	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
eea6a872-87f1-4ef7-9fc9-ebda7066953d	a896d507-abf5-4173-8c66-0c147815f277	Central Greece Region	H	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a3e9fc54-4f24-4dbb-9e79-e39956d51cdd	a896d507-abf5-4173-8c66-0c147815f277	Central Macedonia	B	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14a385d7-af2e-4245-b49e-80a4927ad4cb	a896d507-abf5-4173-8c66-0c147815f277	Chania Regional Unit	94	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
46e65590-f987-4da4-895b-56adaf887689	a896d507-abf5-4173-8c66-0c147815f277	Corfu Prefecture	22	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
202fef90-fe42-4c59-ba9c-ef3c6d4e5034	a896d507-abf5-4173-8c66-0c147815f277	Corinthia Regional Unit	15	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
05bcd493-35ab-42f6-b85f-2ad4c928de8b	a896d507-abf5-4173-8c66-0c147815f277	Crete Region	M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
73dc4f47-7cfc-4b0f-a8f2-8d0a1bd278ec	a896d507-abf5-4173-8c66-0c147815f277	Drama Regional Unit	52	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8582281b-cf9f-40ea-abc8-22a9eeee521d	a896d507-abf5-4173-8c66-0c147815f277	East Attica Regional Unit	A2	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2e4643b4-ed76-49d1-a968-8a88db108f1a	a896d507-abf5-4173-8c66-0c147815f277	East Macedonia and Thrace	A	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9fbc6100-064b-4bb9-8372-565b4064dc70	a896d507-abf5-4173-8c66-0c147815f277	Epirus Region	D	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
56e3aa7f-f587-4124-acd1-71324e8f6b25	a896d507-abf5-4173-8c66-0c147815f277	Euboea	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d7f0f36f-a3ef-4178-8102-8c113030a4e3	a896d507-abf5-4173-8c66-0c147815f277	Grevena Prefecture	51	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0bb36234-47d2-4157-bf3a-feb45abc7161	a896d507-abf5-4173-8c66-0c147815f277	Imathia Regional Unit	53	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cc3d7a10-8279-4969-b686-41ed39eeda65	a896d507-abf5-4173-8c66-0c147815f277	Ioannina Regional Unit	33	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
564ff248-ccc7-4ae8-b74b-8ff5853573f5	a896d507-abf5-4173-8c66-0c147815f277	Ionian Islands Region	F	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b24168d7-55b4-4e56-a8b5-b1ebee211b03	a896d507-abf5-4173-8c66-0c147815f277	Karditsa Regional Unit	41	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
586b33cb-ce28-4a63-bbed-c57ed3799899	a896d507-abf5-4173-8c66-0c147815f277	Kastoria Regional Unit	56	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
55511fd3-f36a-4255-af1f-c9558242807a	a896d507-abf5-4173-8c66-0c147815f277	Kefalonia Prefecture	23	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bf4c9809-2098-453a-98e0-74f4d0dc7472	a896d507-abf5-4173-8c66-0c147815f277	Kilkis Regional Unit	57	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bc9f9846-59d9-4fbe-ac48-18be2deb9581	a896d507-abf5-4173-8c66-0c147815f277	Kozani Prefecture	58	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
580907dc-bae8-454b-a3f4-957045529ba1	a896d507-abf5-4173-8c66-0c147815f277	Laconia	16	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5d7f76fd-40b0-4a12-b116-887bf56b2f0c	a896d507-abf5-4173-8c66-0c147815f277	Larissa Prefecture	42	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e29ea118-e203-41a9-895e-212af062c8cd	a896d507-abf5-4173-8c66-0c147815f277	Lefkada Regional Unit	24	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7bb590a7-1b61-4f02-9deb-b409d0162848	a896d507-abf5-4173-8c66-0c147815f277	Pella Regional Unit	59	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d2b26aac-1ffb-40f9-a0b1-f82b66f85ec0	a896d507-abf5-4173-8c66-0c147815f277	Peloponnese Region	J	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f42f3ed3-e741-46bc-8bd4-7e7995cae309	a896d507-abf5-4173-8c66-0c147815f277	Phthiotis Prefecture	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2760a39d-13d7-4b30-962f-362d680f50a9	a896d507-abf5-4173-8c66-0c147815f277	Preveza Prefecture	34	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6e0b1ba0-0f6b-41d8-a643-f557bbdeebff	a896d507-abf5-4173-8c66-0c147815f277	Serres Prefecture	62	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a53e190e-619a-4c7f-bf1c-7eb7bb716bbd	a896d507-abf5-4173-8c66-0c147815f277	South Aegean	L	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ca447848-378d-4604-9007-510e33a24332	a896d507-abf5-4173-8c66-0c147815f277	Thessaloniki Regional Unit	54	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8fcca012-9486-4cc5-8f7c-f969a3dbad60	a896d507-abf5-4173-8c66-0c147815f277	West Greece Region	G	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5d4b97c3-a1d2-4312-b84b-45a7d8bc616e	a896d507-abf5-4173-8c66-0c147815f277	West Macedonia Region	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1b4a37ea-fe77-466d-9326-d9d63820de03	541717da-2815-403d-b922-29dea4e9892e	Carriacou and Petite Martinique	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6aeb8bed-b200-427e-8eb6-730f03a935cb	541717da-2815-403d-b922-29dea4e9892e	Saint Andrew Parish	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c8fdb9d4-8bde-4356-b7a6-aa8f46641695	541717da-2815-403d-b922-29dea4e9892e	Saint David Parish	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
60ff43eb-f174-428b-9ca3-d35c490addfa	541717da-2815-403d-b922-29dea4e9892e	Saint George Parish	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
afcc502a-de55-4db9-b9f3-6a20d6717629	541717da-2815-403d-b922-29dea4e9892e	Saint John Parish	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a2d7821-67f3-4e15-920b-1e392a420c09	541717da-2815-403d-b922-29dea4e9892e	Saint Mark Parish	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bb10b3ab-c8ec-431e-8079-8ae21b631bf4	541717da-2815-403d-b922-29dea4e9892e	Saint Patrick Parish	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14457c91-4c7b-4aa8-b5b5-1590a766d9d1	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Alta Verapaz Department	AV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
13e2ea3e-888d-48a7-9eb1-2277bc32dde8	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Baja Verapaz Department	BV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
be47feca-71b1-48b1-82bc-4101473f21da	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Chimaltenango Department	CM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
54a4c152-e4e5-4afe-aae9-76f3e6d0ac78	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Chiquimula Department	CQ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4f4bb8b7-9e4b-4757-af78-e40fcdcf247a	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	El Progreso Department	PR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bfa11f38-415a-42f7-a2c2-ec95b9923ff7	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Escuintla Department	ES	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7f160dfe-203c-4527-bb6e-697b86f05b16	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Guatemala Department	GU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0be45c56-b19c-4bd5-9c38-8b3c5e2ba3cf	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Huehuetenango Department	HU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e3c062b6-4c0d-44e9-8c9b-52aba31a36f5	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Izabal Department	IZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9a372727-2670-4a4b-ba3c-82a8bc69c23e	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Jalapa Department	JA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fe6d4aed-5e82-40ed-a6ce-ec05c888322d	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Jutiapa Department	JU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c7993647-7a16-4d27-9f08-45b8d479f9ae	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Petén Department	PE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9417c909-fb03-4d89-8743-f9a7c356a428	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Quetzaltenango Department	QZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f72e9caf-ae01-4c93-8353-9018e779bc46	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Quiché Department	QC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8392e960-c8a1-4c32-9a12-aee8f619336e	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Retalhuleu Department	RE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
278831cd-6807-493b-a145-9244a62e0dd0	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Sacatepéquez Department	SA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
35dbaf9c-8476-41fc-a69d-4e7b839830f1	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	San Marcos Department	SM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f6ec76b2-c537-4af3-bc7b-df66131f7536	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Santa Rosa Department	SR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1de423b4-3cfb-4a7a-85d2-57e235f96845	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Sololá Department	SO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
adbd660a-e0c9-47f7-8e20-e8695355d07e	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Suchitepéquez Department	SU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ef73f334-518c-4403-89ae-eb7caa220566	4f3001ca-47d6-43c5-8ce1-9f53eacffe08	Totonicapán Department	TO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
73f555d2-308f-4ea7-b902-65a05ff146e9	447d5059-0194-4c27-9c85-6ad3031591d5	Beyla Prefecture	BE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f4715df4-550c-47df-b4ce-bd5c292a556b	447d5059-0194-4c27-9c85-6ad3031591d5	Boffa Prefecture	BF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1da021fc-03c0-43f6-bf21-8374e02a28dd	447d5059-0194-4c27-9c85-6ad3031591d5	Boké Prefecture	BK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e1d48432-09be-4374-989d-b64de88284ae	447d5059-0194-4c27-9c85-6ad3031591d5	Boké Region	B	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
66b0ad93-31aa-455a-96ee-b5e467478f60	447d5059-0194-4c27-9c85-6ad3031591d5	Conakry	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
23929535-1cf6-49cf-aa0f-eba9072730e6	447d5059-0194-4c27-9c85-6ad3031591d5	Coyah Prefecture	CO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8a934983-54d2-478e-b7f7-e5d9d55b5ade	447d5059-0194-4c27-9c85-6ad3031591d5	Dabola Prefecture	DB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
87925796-ebe7-43e5-9c27-4a62360181ac	447d5059-0194-4c27-9c85-6ad3031591d5	Dalaba Prefecture	DL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
10f97a08-bc2a-42fe-bc1d-9d482ac05495	447d5059-0194-4c27-9c85-6ad3031591d5	Dinguiraye Prefecture	DI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2ce54dc1-30aa-40c7-a605-62eb9a44f683	447d5059-0194-4c27-9c85-6ad3031591d5	Dubréka Prefecture	DU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fcb831f2-da1f-44de-8ea2-991fba618a9c	447d5059-0194-4c27-9c85-6ad3031591d5	Faranah Prefecture	FA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b4148476-874e-4b9a-8514-e1042e18bdcb	447d5059-0194-4c27-9c85-6ad3031591d5	Forécariah Prefecture	FO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
99aa0507-8423-4b6e-9db6-cfbbc1a5c9b8	447d5059-0194-4c27-9c85-6ad3031591d5	Fria Prefecture	FR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b9fcaa56-dcad-4f46-8ad5-7ffbd752a36d	447d5059-0194-4c27-9c85-6ad3031591d5	Gaoual Prefecture	GA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
af470877-bce6-4750-b15b-bd473a18ec57	447d5059-0194-4c27-9c85-6ad3031591d5	Guéckédou Prefecture	GU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7da1da75-84fb-4f03-a38b-fe6915728e16	447d5059-0194-4c27-9c85-6ad3031591d5	Kankan Prefecture	KA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1a1ca52c-78cc-42fc-8bbd-35275ea0b7cb	447d5059-0194-4c27-9c85-6ad3031591d5	Kankan Region	K	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a3eda87b-8788-4cd4-b797-6ac075b9d6d9	447d5059-0194-4c27-9c85-6ad3031591d5	Kindia Prefecture	KD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
89af4c8c-8934-4c2c-a65b-ff7f233daba3	447d5059-0194-4c27-9c85-6ad3031591d5	Kindia Region	D	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14b87622-96e7-4973-878c-4ff900a9653d	447d5059-0194-4c27-9c85-6ad3031591d5	Kissidougou Prefecture	KS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7ed33cfd-5fdb-4a0f-a3e5-1621691fd85e	447d5059-0194-4c27-9c85-6ad3031591d5	Koubia Prefecture	KB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a5061b76-1d36-42ac-b2f4-858fca67b552	447d5059-0194-4c27-9c85-6ad3031591d5	Koundara Prefecture	KN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8cd1a611-2aa3-40f8-9e4e-2c503c7c5a08	447d5059-0194-4c27-9c85-6ad3031591d5	Kouroussa Prefecture	KO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
756edbbb-a2ea-4bd6-8043-65831d71d7e5	447d5059-0194-4c27-9c85-6ad3031591d5	Kérouané Prefecture	KE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d7b3bf35-5c62-474e-b87f-51e74aa0bdb4	447d5059-0194-4c27-9c85-6ad3031591d5	Labé Prefecture	LA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fc50fec0-4810-4491-a573-529bdccf0667	447d5059-0194-4c27-9c85-6ad3031591d5	Labé Region	L	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b0aeaf61-8e6c-427d-be93-623555a19ec3	447d5059-0194-4c27-9c85-6ad3031591d5	Lola Prefecture	LO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ea893c6c-8154-4f7a-9122-9665f4ede09f	447d5059-0194-4c27-9c85-6ad3031591d5	Lélouma Prefecture	LE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9c8f5b01-44b8-455f-99bb-9b3595119b63	447d5059-0194-4c27-9c85-6ad3031591d5	Macenta Prefecture	MC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b8236532-435b-4293-97c2-b135543063ba	447d5059-0194-4c27-9c85-6ad3031591d5	Mali Prefecture	ML	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
918001bb-51d0-4396-ad49-12b0fc642cfb	447d5059-0194-4c27-9c85-6ad3031591d5	Mamou Prefecture	MM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1282077c-0b12-4bc8-bdde-da6671a82d56	447d5059-0194-4c27-9c85-6ad3031591d5	Mamou Region	M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b7496745-5cf9-4523-b874-1653d85e19cb	447d5059-0194-4c27-9c85-6ad3031591d5	Mandiana Prefecture	MD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cda88c1b-960a-4d52-a13c-536a74dcd185	447d5059-0194-4c27-9c85-6ad3031591d5	Nzérékoré Prefecture	NZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a3238326-5005-4fb4-b2da-41fa30abaf98	447d5059-0194-4c27-9c85-6ad3031591d5	Nzérékoré Region	N	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a996259-571f-44ee-8492-6358031a5613	447d5059-0194-4c27-9c85-6ad3031591d5	Pita Prefecture	PI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
21f2e909-19a0-403f-ab38-aae444411cd8	447d5059-0194-4c27-9c85-6ad3031591d5	Siguiri Prefecture	SI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fac886f9-2b55-4fca-8091-44c9ef43083f	447d5059-0194-4c27-9c85-6ad3031591d5	Tougué Prefecture	TO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ea90263e-cdb6-4b41-98ed-d1c5b5e7f916	447d5059-0194-4c27-9c85-6ad3031591d5	Télimélé Prefecture	TE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e94cbda-28ae-4667-91ba-c16ee3dcbde8	447d5059-0194-4c27-9c85-6ad3031591d5	Yomou Prefecture	YO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c922e7d2-255f-4ca3-a2ef-b5dc944a804e	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Bafatá	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
234916a9-c4b4-49be-afa4-7699899f8548	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Biombo Region	BM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b9766dba-1d2f-4bd0-88ff-7c96ef3cc56f	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Bolama Region	BL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
aa4974f2-fae0-45ca-9e87-9e1b40e26704	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Cacheu Region	CA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
91285388-89da-4b39-b071-ec27c6701bd6	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Gabú Region	GA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0c3dc02a-988c-4a94-a46a-03bc86010751	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Leste Province	L	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2af2b424-7cdc-462f-92dc-6ec96149c12c	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Norte Province	N	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e5b1ab5b-df5a-4b24-82d0-679b963032ab	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Oio Region	OI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fd61c784-7413-4875-ad65-8ea970658316	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Quinara Region	QU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a94cee3f-9488-40d9-ae73-1f1b841ff56c	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Sul Province	S	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
95738551-63cf-4b87-9060-a745127821c7	52fd40a1-53e9-4c43-84f7-cd9447498ad2	Tombali Region	TO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
41787127-89ec-46dc-8888-430965a022ea	cf42bf36-b453-4f10-ac61-4ba5138c666d	Barima-Waini	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
101f01d3-79d7-4d57-8e99-169a3fee5b59	cf42bf36-b453-4f10-ac61-4ba5138c666d	Cuyuni-Mazaruni	CU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0a48fcd8-5bef-44b1-af38-1ab7bbc0a2ce	cf42bf36-b453-4f10-ac61-4ba5138c666d	Demerara-Mahaica	DE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dec08a7b-8e54-4d3c-941e-767528d90ba6	cf42bf36-b453-4f10-ac61-4ba5138c666d	East Berbice-Corentyne	EB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6eeb6ff1-dd85-41d1-8ccd-cdc4c0038d45	cf42bf36-b453-4f10-ac61-4ba5138c666d	Essequibo Islands-West Demerara	ES	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b90bdbcb-27ba-4d91-a0f2-6f16ab08cd70	cf42bf36-b453-4f10-ac61-4ba5138c666d	Mahaica-Berbice	MA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fded58eb-51af-4805-b1a0-dc3f84b874b7	cf42bf36-b453-4f10-ac61-4ba5138c666d	Pomeroon-Supenaam	PM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b6ed2713-4fb6-4427-bfac-f9490f24a2c3	cf42bf36-b453-4f10-ac61-4ba5138c666d	Potaro-Siparuni	PT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e1d08a57-d50b-4574-b9fc-ee53cc5b5f2a	cf42bf36-b453-4f10-ac61-4ba5138c666d	Upper Demerara-Berbice	UD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f9f60743-562d-4a0c-843f-1afaf9257b1f	cf42bf36-b453-4f10-ac61-4ba5138c666d	Upper Takutu-Upper Essequibo	UT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a7f59324-86c1-4a82-9ec1-49116dc41079	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Artibonite	AR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
54c2c3b7-1687-4913-8797-dbf8c10f192a	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Centre	CE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f392ee88-d320-48ab-8b74-5bfa46883281	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Grand'Anse	GA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
45465e72-86f0-4fd5-b605-103cce24713c	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Nippes	NI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0a80cf81-61d6-4609-a48d-270167142fc5	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Nord	ND	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dbfa1aa6-d517-4ca8-ab91-3d1e06e1aaa8	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Nord-Est	NE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
223cc012-e8b4-40e2-88da-adcf5632892f	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Nord-Ouest	NO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
60c254a4-fa9d-4d72-90fc-2559f7adf4b1	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Ouest	OU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e3f77984-4537-4faf-83a2-7436b45be1c9	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Sud	SD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e53acc3a-1ca4-4795-b78b-c10c00977c2a	f4c780dc-3dd6-4d70-831a-e153d4b54c57	Sud-Est	SE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7bf5e5bf-350c-4e44-9a33-d0fa93b5e5d9	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Atlántida Department	AT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e66c6cd7-91eb-4658-bfda-40173f19c83e	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Bay Islands Department	IB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5bcecddd-c667-48aa-9cd0-8a52e565b04b	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Choluteca Department	CH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
400c5126-a817-4660-bd8f-3d6b82aa9110	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Colón Department	CL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
881ab4db-7260-47d2-bdfc-2ca869470a63	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Comayagua Department	CM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
821eef23-4090-4f06-b585-58731702552a	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Copán Department	CP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
96791bb9-b10c-46c7-8c8f-c259bba26994	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Cortés Department	CR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e02e63a0-fa58-4d1f-a4a8-38600ccc7941	3c9a7870-a718-4e8d-bc48-2f0103bb0733	El Paraíso Department	EP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
764f4f05-c3b9-4fdf-9e7d-d189328a1267	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Francisco Morazán Department	FM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0fce857d-6cdf-4f77-905a-7cf10b7d9ea7	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Gracias a Dios Department	GD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8508e140-faa9-4927-9403-d91d27bcd1b9	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Intibucá Department	IN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
73be1a3c-9190-4064-b279-c6e12056b618	3c9a7870-a718-4e8d-bc48-2f0103bb0733	La Paz Department	LP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f197d96a-da3b-444e-a2fc-7125000edbb8	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Lempira Department	LE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
08a2be1b-fc34-4ef4-b71c-3e24cca8a469	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Ocotepeque Department	OC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b663bafd-0592-4bf9-97bd-197d3c19ec52	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Olancho Department	OL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0a1709ea-ce52-4f94-abaf-f4017fd62bbe	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Santa Bárbara Department	SB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d1f4b8a6-05ce-4571-8498-3e92df2cd81f	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Valle Department	VA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
61dfb55e-6b84-41c8-8f8c-8a46970e68a9	3c9a7870-a718-4e8d-bc48-2f0103bb0733	Yoro Department	YO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
81df4da0-70dd-4815-9654-6af9df11506d	4c30fba5-1a83-4772-b1a5-cd827716d947	Central and Western District	HCW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2d25d502-6f2f-44c5-8181-6518b615e9a1	4c30fba5-1a83-4772-b1a5-cd827716d947	Eastern	HEA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b757fbe7-c56a-4bc4-885e-1a73e54e764d	4c30fba5-1a83-4772-b1a5-cd827716d947	Islands District	NIS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
474393e7-3427-433e-9320-45340869aee7	4c30fba5-1a83-4772-b1a5-cd827716d947	Kowloon City	KKC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9cc7575c-b420-4478-ac9c-b96156c8e1e9	4c30fba5-1a83-4772-b1a5-cd827716d947	Kwai Tsing	NKT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
faf5740e-c261-4708-862c-caf206e5b777	4c30fba5-1a83-4772-b1a5-cd827716d947	Kwun Tong	KKT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
15555b03-b0f3-4006-a51d-92e30b6b1ab6	4c30fba5-1a83-4772-b1a5-cd827716d947	North	NNO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
602dda53-4f49-421a-bd45-9173df831669	4c30fba5-1a83-4772-b1a5-cd827716d947	Sai Kung District	NSK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
757d5ad8-340b-42ce-8428-49c43670aedf	4c30fba5-1a83-4772-b1a5-cd827716d947	Sha Tin	NST	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c9ad646a-bdb0-4de6-9496-2ead26679187	4c30fba5-1a83-4772-b1a5-cd827716d947	Sham Shui Po	KSS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f093abc6-1a61-4d20-8c4f-fddb4c753587	4c30fba5-1a83-4772-b1a5-cd827716d947	Southern	HSO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fc9defb8-b3b3-4c26-aec0-046d775fc43a	4c30fba5-1a83-4772-b1a5-cd827716d947	Tsuen Wan District	NTW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1ddbd7c4-e166-4737-b9e7-88565df7a139	4c30fba5-1a83-4772-b1a5-cd827716d947	Tuen Mun	NTM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1bc168d9-acff-4b54-b29a-b662045766cb	4c30fba5-1a83-4772-b1a5-cd827716d947	Wan Chai	HWC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0c1cd1ef-9bf8-4c9c-a73a-9da958c7f185	4c30fba5-1a83-4772-b1a5-cd827716d947	Wong Tai Sin	KWT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f2483414-0ca8-46ea-9f7f-7c4719a54f55	4c30fba5-1a83-4772-b1a5-cd827716d947	Yau Tsim Mong	KYT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b7f651ab-246b-4911-93f6-0be8018bf3a9	4c30fba5-1a83-4772-b1a5-cd827716d947	Yuen Long District	NYL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a1085bcd-230a-4d57-a1b6-98d8a9320362	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Baranya County	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
91760144-d9fa-4b23-ad65-85a91ecc1a7f	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Borsod-Abaúj-Zemplén County	BZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ec4c558e-07bd-4b6b-a8b2-0eaf019eee84	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Budapest	BU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
42a87a1a-81f3-4d30-acd4-837cd589be99	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Bács-Kiskun County	BK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
da89c8dd-e60c-4136-a3c7-2e4a5f64bccb	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Békés County	BE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
629ce7a2-6d8b-4e22-98e7-22f4dd5574e2	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Békéscsaba	BC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
91ca403d-8534-4ba9-ab5d-4aa6dfa6aba9	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Csongrád County	CS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8409dbd3-2c8c-4fa7-8817-dd1c38feb3ad	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Debrecen	DE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8321ff3c-b3bf-4356-a5f2-ea5b310e0a52	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Dunaújváros	DU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9ceb78e5-670e-4fd4-b93d-aa9792d22cc2	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Eger	EG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
979f2a8e-9e2f-405c-aa56-749ccdb149ce	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Fejér County	FE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b9187f58-2122-4b5f-8178-596b607d2a02	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Győr	GY	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3cad4cfd-f6b2-4638-b65f-9cf1cd1a4776	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Győr-Moson-Sopron County	GS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
41bc54e7-380a-4397-b709-0030e6dbca97	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Hajdú-Bihar County	HB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bee55851-c137-463b-aaef-70b9e41de7eb	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Heves County	HE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3096233d-5cc3-4e86-bb03-652b52c22c78	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Hódmezővásárhely	HV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1e9d906f-d003-43a5-8b1a-f242a57511af	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Jász-Nagykun-Szolnok County	JN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a714c3cd-345a-4b28-a452-8c1bf1dbfe6d	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Kaposvár	KV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
91375da7-565d-4c91-ba4c-011b42dd51fc	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Kecskemét	KM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cc011417-22cf-4ec9-93bf-09554150a0e2	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Miskolc	MI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b5544522-0818-4286-95ec-46fafc31523e	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Nagykanizsa	NK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
128d0d72-84ba-4c76-85d2-5f23706d4bc7	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Nyíregyháza	NY	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a39a5415-1d8f-4e2b-a4d3-f0bd20646512	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Nógrád County	NO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b2eafa0f-cea9-4d37-895f-dc2a97d85e34	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Pest County	PE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
da33e144-ea24-4924-a107-d16e2cab0f1f	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Pécs	PS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
008facda-0353-40de-a9d9-15ddad2dbe3e	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Salgótarján	ST	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a1d74f5c-948a-49a7-afe1-40f5fd22cff8	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Somogy County	SO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2f16a159-11fc-4687-bc9f-78ba2e9f0730	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Sopron	SN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
89fc555e-06fe-4f7b-9b65-e37eae14bfce	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Szabolcs-Szatmár-Bereg County	SZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2d9e673c-bec0-4907-9a80-a0188403effc	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Szeged	SD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
78f0be40-15dc-4ddc-b000-29fb4cde428a	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Szekszárd	SS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2551d012-a8c9-4409-943e-d8ae09823b65	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Szolnok	SK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
20cd3382-63b6-413b-9a62-50082b45b351	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Szombathely	SH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d0ac41c1-cdea-46f7-b4ff-02abea501423	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Székesfehérvár	SF	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ebe4cb7f-7041-473a-b88f-a8695e1cf52d	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Tatabánya	TB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
44b0c7b8-4de3-44a8-be92-2e8bcba727b3	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Tolna County	TO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b7ff1d6b-5171-4dec-85e9-9408c96acdf2	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Vas County	VA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d4b9401a-8462-48a2-bc73-3ccbdca80de2	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Veszprém	VM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
afada03b-5cdb-49ea-8b8d-9e26e954353e	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Veszprém County	VE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0d13bf2a-e396-4e9c-ae5b-221191f6419a	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Zala County	ZA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
48eebad3-3746-413d-90fa-8dbbd93ae859	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Zalaegerszeg	ZE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b75a2ab9-22af-4097-a82b-cbeeb0b43133	e4d01cd3-74b7-41ec-b2a4-85126b008e7c	Érd	ER	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ce6ec4f5-9cc5-4cf1-9dcc-46b73239abf7	fd8bc807-ede3-43c8-bba6-084535610b94	Capital Region	1	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14596fa4-020a-42d6-8878-1ff245be1b6c	fd8bc807-ede3-43c8-bba6-084535610b94	Eastern Region	7	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4793e3f1-c7ad-490e-83f1-15d845465f7b	fd8bc807-ede3-43c8-bba6-084535610b94	Northeastern Region	6	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bbecc4b9-0734-490b-a918-4ce490bfff10	fd8bc807-ede3-43c8-bba6-084535610b94	Northwestern Region	5	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
628618a3-15f2-4ab5-aa2c-9df44b93215f	fd8bc807-ede3-43c8-bba6-084535610b94	Southern Peninsula Region	2	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
239c300f-0558-4556-b047-6ff0d1a758ec	fd8bc807-ede3-43c8-bba6-084535610b94	Southern Region	8	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cd9ed60f-e3e7-444e-a0fd-77be1c1764b3	fd8bc807-ede3-43c8-bba6-084535610b94	Western Region	3	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9f08f81b-29b7-4ef2-a22a-8b8377f996c1	fd8bc807-ede3-43c8-bba6-084535610b94	Westfjords	4	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
238cee9c-62b7-44dd-8600-cf0be78c587b	c3621391-f0be-4cb3-80d6-1ffaac440c61	Andaman and Nicobar Islands	AN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8a9e96db-98ba-477e-9920-a3021046fe40	c3621391-f0be-4cb3-80d6-1ffaac440c61	Andhra Pradesh	AP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3886583d-50fb-4f0c-9640-47a183109dea	c3621391-f0be-4cb3-80d6-1ffaac440c61	Arunachal Pradesh	AR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1bf895ed-53a1-4e6c-8028-06ffdd80b031	c3621391-f0be-4cb3-80d6-1ffaac440c61	Assam	AS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ac9d8caf-148b-41c7-bcb7-af3dc1e2da3c	c3621391-f0be-4cb3-80d6-1ffaac440c61	Bihar	BR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
75352f30-4f4d-40d0-ace1-70c1eeaa5a90	c3621391-f0be-4cb3-80d6-1ffaac440c61	Chandigarh	CH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e0c05262-d335-48e1-a095-c1345e470fb3	c3621391-f0be-4cb3-80d6-1ffaac440c61	Chhattisgarh	CT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
96f5fc2b-0c57-49b3-903b-5ccde988d0aa	c3621391-f0be-4cb3-80d6-1ffaac440c61	Dadra and Nagar Haveli and Daman and Diu	DH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
13cef82d-52b0-4f8e-a41c-2fc419efc8f1	c3621391-f0be-4cb3-80d6-1ffaac440c61	Delhi	DL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
539440be-9574-4612-919d-ea52af94cbb5	c3621391-f0be-4cb3-80d6-1ffaac440c61	Goa	GA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b8ac5b25-a1f6-4a13-a904-076dc2965ab8	c3621391-f0be-4cb3-80d6-1ffaac440c61	Gujarat	GJ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3d29dbcf-c66a-4e70-b044-e864ae7e4829	c3621391-f0be-4cb3-80d6-1ffaac440c61	Haryana	HR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f90b90f3-13c4-45a6-b6a4-6a13f4ba0983	c3621391-f0be-4cb3-80d6-1ffaac440c61	Himachal Pradesh	HP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
901ebf7c-e16f-41be-9b45-fba5dad4feb8	c3621391-f0be-4cb3-80d6-1ffaac440c61	Jammu and Kashmir	JK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2a710e39-6ed9-459a-b337-371c82ebf540	c3621391-f0be-4cb3-80d6-1ffaac440c61	Jharkhand	JH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
57b53de8-80c5-4aa7-9308-ad0ce7e54310	c3621391-f0be-4cb3-80d6-1ffaac440c61	Karnataka	KA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
80e92f30-f6f9-4fd7-9e43-d8fa11a468e7	c3621391-f0be-4cb3-80d6-1ffaac440c61	Kerala	KL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
660701fb-99d6-46fd-91bf-2dfbb6540bcd	c3621391-f0be-4cb3-80d6-1ffaac440c61	Ladakh	LA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2591285a-dd74-4195-ae42-1f36a621697d	c3621391-f0be-4cb3-80d6-1ffaac440c61	Lakshadweep	LD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2b05744b-f75d-4e69-b077-def005bc205a	c3621391-f0be-4cb3-80d6-1ffaac440c61	Madhya Pradesh	MP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
74f4c2f8-7ddd-45df-be2a-c5bc59ce5e91	c3621391-f0be-4cb3-80d6-1ffaac440c61	Maharashtra	MH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8fd5d7ff-b6ca-43a6-aa00-478f88307b06	c3621391-f0be-4cb3-80d6-1ffaac440c61	Manipur	MN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d2da00b1-cf24-4ff7-941a-a9226ebce640	c3621391-f0be-4cb3-80d6-1ffaac440c61	Meghalaya	ML	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cbd1db42-047a-4624-a0e6-2b332142927f	c3621391-f0be-4cb3-80d6-1ffaac440c61	Mizoram	MZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
428a77b1-3f17-490a-bddb-62b3d82d36a8	c3621391-f0be-4cb3-80d6-1ffaac440c61	Nagaland	NL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4d514627-7186-4b6c-a222-b3288c5f14fc	c3621391-f0be-4cb3-80d6-1ffaac440c61	Odisha	OR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5cb12a1e-237f-4284-b007-00a0511d9b7c	c3621391-f0be-4cb3-80d6-1ffaac440c61	Puducherry	PY	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3b24fa11-ca63-4bfa-98ac-6c389cc1202c	c3621391-f0be-4cb3-80d6-1ffaac440c61	Punjab	PB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c336a737-15f9-49b8-824d-26420875056d	c3621391-f0be-4cb3-80d6-1ffaac440c61	Rajasthan	RJ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
83f2cf5d-d67a-4192-90e0-69da8720adbf	c3621391-f0be-4cb3-80d6-1ffaac440c61	Sikkim	SK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fe60732f-048e-4704-910a-f87c7524deda	c3621391-f0be-4cb3-80d6-1ffaac440c61	Tamil Nadu	TN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ee02b56b-42b7-4dfa-884e-1f374a75d0bb	c3621391-f0be-4cb3-80d6-1ffaac440c61	Telangana	TG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
14100234-ef2f-41d2-9552-a728b50df490	c3621391-f0be-4cb3-80d6-1ffaac440c61	Tripura	TR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
950822c7-ce3c-4848-a2db-7278c932f8b7	c3621391-f0be-4cb3-80d6-1ffaac440c61	Uttar Pradesh	UP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5a8f4c33-2b6a-4968-9df8-b17ebac2633e	c3621391-f0be-4cb3-80d6-1ffaac440c61	Uttarakhand	UT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c8e854c5-460a-407c-976f-0417c8356111	c3621391-f0be-4cb3-80d6-1ffaac440c61	West Bengal	WB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0b89d138-d351-4d96-948e-03de584e1097	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Aceh	AC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a04dd449-48ca-4f86-a42c-d7621dd8dffc	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Bali	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f7ec02eb-9afa-4445-b429-ebbf558873a3	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Banten	BT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e08ddf74-aa41-4ab4-8327-7c78f13803da	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Bengkulu	BE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cf5074af-92d3-465d-a05c-42002af294bd	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	DI Yogyakarta	YO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b6071eb2-4d4a-4860-afae-3bd00df043bc	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	DKI Jakarta	JK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
39cad494-6f9b-4bd3-8057-b87896125917	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Gorontalo	GO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
faafb00d-da53-439c-b4f0-41e82ca904cb	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Jambi	JA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bc285ebf-e5b3-463d-9f12-934123fb45de	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Jawa Barat	JB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0ac34f1d-6eaa-44c8-af59-c01f60bcbbf9	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Jawa Tengah	JT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ead37a37-5f37-44ff-a25f-5e89a1e02d4a	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Jawa Timur	JI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5dfe617f-a96d-4510-ac43-2fdc1356681f	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kalimantan Barat	KA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1bfb1158-56ec-404d-bf18-d99f2ca84618	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kalimantan Selatan	KS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ae5619cf-d8bd-4eb8-a5fd-cdb80ff8a016	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kalimantan Tengah	KT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
610d3bea-452e-46ee-b590-f9d97c207a81	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kalimantan Timur	KI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e2a1d542-1f3a-4fa3-8e74-1feea7f954fa	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kalimantan Utara	KU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
898116a5-5e85-4321-b664-5de950c51e69	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kepulauan Bangka Belitung	BB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
914a2fa9-4668-4ecc-993c-2c07fe6320da	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Kepulauan Riau	KR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a65bdddb-37a5-4e50-8096-40cd50dd45e0	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Lampung	LA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b738a12e-0636-4da1-9c41-3a7a74cca6ee	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Maluku	MA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
307866bf-befa-4d11-a67a-5caf1b586aec	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Maluku Utara	MU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fa72d430-a2fb-49fd-9f84-fc6ac160ece1	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Nusa Tenggara Barat	NB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2ac2be3c-25fc-4754-810d-bcc0ca0714ef	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Nusa Tenggara Timur	NT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d2fd0b12-f1c4-4c5b-981c-f509416d23e2	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Papua	PA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
805be171-2da5-469f-8f5c-5f1a62dd79f3	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Papua Barat	PB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5b9c1d42-b2d3-4ec7-bd38-a10f60bfda03	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Riau	RI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
df4e4b2c-89dd-42fe-b38d-ece891b6061a	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sulawesi Barat	SR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d6bbfd7e-051f-4246-b9f3-930dadd6615b	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sulawesi Selatan	SN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b2e80b55-fb4e-4cfd-b2dd-54a7d19aac5e	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sulawesi Tengah	ST	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
59cd58ec-9a63-407d-b59d-310a22b565a6	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sulawesi Tenggara	SG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7429050d-e3b8-4511-aa09-e05ecfd5ea9c	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sulawesi Utara	SA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d2737651-a3a2-41ae-adf5-816c4e1c68cb	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sumatera Barat	SB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
62e26124-5ef1-498a-8213-7ec4d9bd13ef	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sumatera Selatan	SS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
838707de-2688-45da-8033-3da18895358c	21e589fb-bc6c-4d07-bcb2-46d5d518e9d8	Sumatera Utara	SU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fef8f368-5c42-4e3e-8e74-97064c820f2c	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Alborz	30	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b469b911-b22a-4fba-9d8d-736221a7ea6b	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Ardabil	24	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
efd62948-2847-4c1e-ad52-ae61c353300d	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Bushehr	18	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ee65bd83-e7a5-4c90-b76d-ecc27edcc6b9	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Chaharmahal and Bakhtiari	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
12617f85-1846-4558-8e4a-cbab651eb72f	dff389d1-0969-4d8b-8edc-7593f56b9a3c	East Azerbaijan	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b3fc48c1-b098-40af-bbca-06ad2305f14c	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Fars	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
11c809a7-9547-412f-bdb4-228f36061c53	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Gilan	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2a274db6-4878-4cd2-a217-a62df8081976	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Golestan	27	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4845757f-65b6-481b-bbe3-c812929d5c48	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Hamadan	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7972a060-a466-4980-8434-1e1dbb53c5dd	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Hormozgan	22	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e69ab8d0-cc7b-470a-8cf9-fa37955b36a7	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Ilam	16	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
18a51240-a8a2-45d9-a9f6-51ea11181fe5	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Isfahan	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
86ebcf73-af47-42ab-bda1-7e581758800f	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Kerman	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c0e7ca63-cb16-4a6c-bb77-852043e49b33	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Kermanshah	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1e677430-5dfc-4112-9225-82771e14deaa	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Khuzestan	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
098f0d14-2806-49d8-b191-fa629457829a	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Kohgiluyeh and Boyer-Ahmad	17	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
24a8a111-95c8-4cbf-8c1f-f0b63e64fdc6	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Kurdistan	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9c24e925-3192-4121-acfb-125c7e06d835	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Lorestan	15	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8963cf8a-7136-453e-a503-897d99eb4176	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Markazi	00	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b310ea3e-3315-4459-86f4-715ce4676c6b	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Mazandaran	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
77f86c04-0ddf-4572-9e52-475e5f92d463	dff389d1-0969-4d8b-8edc-7593f56b9a3c	North Khorasan	28	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
251dce89-16c5-41f4-ab17-e4d19a2631c1	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Qazvin	26	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
72334166-bc0d-4fea-aa0d-847f6d25b4d3	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Qom	25	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fc6de9e8-d771-4361-943e-82fe4fda6c5f	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Razavi Khorasan	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6610f378-a896-464e-bdbe-28806e58b900	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Semnan	20	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8da7cb5c-e0ba-40ed-aec0-74ad364def14	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Sistan and Baluchestan	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8669c16a-595f-4293-a71b-dcaef8aedb2a	dff389d1-0969-4d8b-8edc-7593f56b9a3c	South Khorasan	29	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2c964278-bf2b-4a4f-adda-51db6da1fd9e	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Tehran	23	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d6312b82-0a5c-40c4-ba2c-1d591d1b0b40	dff389d1-0969-4d8b-8edc-7593f56b9a3c	West Azarbaijan	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ea96cd68-94ec-48dc-b12b-4e611755d662	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Yazd	21	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
be7d6f1c-9eb9-4a1d-ba28-129c3095c20c	dff389d1-0969-4d8b-8edc-7593f56b9a3c	Zanjan	19	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
adb2ffce-c51b-4e3f-a0e2-42acf516a3c4	8c4aca66-9f99-447b-9671-60020cbcbbe4	Al Anbar Governorate	AN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
af90a7f4-b36b-4c67-9978-624e2e6df6c8	8c4aca66-9f99-447b-9671-60020cbcbbe4	Al Muthanna Governorate	MU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
03362be7-60a4-4682-a7ee-af1d2b47d498	8c4aca66-9f99-447b-9671-60020cbcbbe4	Al-Qādisiyyah Governorate	QA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5ea770ff-b5ca-420f-892a-b738f2bbc3a3	8c4aca66-9f99-447b-9671-60020cbcbbe4	Babylon Governorate	BB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4a760f3e-a566-478d-9270-e6e0115f6537	8c4aca66-9f99-447b-9671-60020cbcbbe4	Baghdad Governorate	BG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b0f738f7-2ce0-4a16-8e94-0e415e8783ba	8c4aca66-9f99-447b-9671-60020cbcbbe4	Basra Governorate	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6a944872-e1c6-45ff-9755-55fe44617230	8c4aca66-9f99-447b-9671-60020cbcbbe4	Dhi Qar Governorate	DQ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3dc5f0fd-1b20-4286-9ffa-8648b2d3c327	8c4aca66-9f99-447b-9671-60020cbcbbe4	Diyala Governorate	DI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d5238a91-b34d-4592-ab89-a16e24c7b408	8c4aca66-9f99-447b-9671-60020cbcbbe4	Dohuk Governorate	DA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e3c9653-69c2-455d-ab24-f4bef51b808a	8c4aca66-9f99-447b-9671-60020cbcbbe4	Erbil Governorate	AR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4e95bc57-db2f-4516-bcb7-0fca9e08fde0	8c4aca66-9f99-447b-9671-60020cbcbbe4	Karbala Governorate	KA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
71394635-eb9e-401d-8f86-a699bc248564	8c4aca66-9f99-447b-9671-60020cbcbbe4	Kirkuk Governorate	KI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e2f48e7c-bf25-42f5-850b-f6ae7ec3e29a	8c4aca66-9f99-447b-9671-60020cbcbbe4	Maysan Governorate	MA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
39c0ca80-77a9-4084-a888-f69d1ef1602f	8c4aca66-9f99-447b-9671-60020cbcbbe4	Najaf Governorate	NA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3769fca8-30e6-4fd8-8c15-646ccea8c33c	8c4aca66-9f99-447b-9671-60020cbcbbe4	Nineveh Governorate	NI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
51724aff-fac3-4c3b-8182-4a38b40b905d	8c4aca66-9f99-447b-9671-60020cbcbbe4	Saladin Governorate	SD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0e925659-6c97-4f43-a4c8-77e43a5f9a21	8c4aca66-9f99-447b-9671-60020cbcbbe4	Sulaymaniyah Governorate	SU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
15c41f0a-2993-455d-a9f5-c91a53e27602	8c4aca66-9f99-447b-9671-60020cbcbbe4	Wasit Governorate	WA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
69d9554f-6e0b-4609-be6f-78d75b430afd	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Carlow	CW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d43b5480-7f2e-42a1-a16f-a1e8b58fa0ae	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Cavan	CN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4f5a4622-ec77-4c89-a116-dafb3db6aae9	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Clare	CE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
837bdde3-31c8-4306-8968-aa36900e3341	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Connacht	C	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
13757e3b-960a-48bb-b3aa-c4f9990e537b	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Cork	CO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
25d4dabc-4034-4aeb-9a7f-a2cf16daf0a7	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Donegal	DL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
18a8f9ea-6275-46d1-a7da-06668a2652cf	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Dublin	D	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2a618d03-cfb4-4d39-b7ff-41c66ea2c37c	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Galway	G	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3c2a52c7-5159-4c54-877d-9943eb52dbac	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Kerry	KY	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
41405b5e-5975-468c-96cd-3d9c6ef35698	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Kildare	KE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dc7e6c9b-9115-4d3f-aa44-9957bb33aa18	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Kilkenny	KK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3764998f-c967-40ad-8668-b045dd3e33c5	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Laois	LS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1f04781a-5d0b-44f3-99f2-066be1b440aa	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Leinster	L	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
756699cc-9520-4397-99b4-b324e09c0050	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Limerick	LK	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ff505ec9-05f3-4a71-b7b7-db7c65ee11b1	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Longford	LD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
04e31c60-5346-479b-8e2b-6d39ed2dbceb	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Louth	LH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e8fbdc1a-7ae4-44df-ac6e-66fa6d40ed69	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Mayo	MO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e87d074b-8c65-49db-b342-a18dc3a40875	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Meath	MH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
de5fe254-e260-446a-84f4-9bd9380e2a80	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Monaghan	MN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
64649900-bd1b-403d-a17d-e24d858befd9	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Munster	M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ae9a8f4f-ecca-40bd-81c4-02b1ed3e90e9	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Offaly	OY	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
512ae40d-a7cd-4810-b264-44c6c737e995	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Roscommon	RN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4babcd1c-9985-4d1b-a080-83ea8283cc02	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Sligo	SO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7b81f4ff-9201-448c-931d-6ff33344e427	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Tipperary	TA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3f292d6a-5596-4a07-9246-772d44a3ee03	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Ulster	U	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c7b0c444-40ea-422f-9f46-c8b3adfdbe13	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Waterford	WD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b4bc7f55-3a2d-4c2e-bced-e647c72a879c	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Westmeath	WH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8a38d36e-2f05-4352-abcc-6dab0f228a0a	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Wexford	WX	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9c2edefe-d9a3-462c-9cdd-9d584af41a8c	c45459b7-2e98-4ef5-803b-9f4e4da1cee6	Wicklow	WW	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1b7eb794-532d-4be9-9667-05ba927a749d	4ac1cb99-fa66-48d3-9d80-014b01041e7f	Central District	M	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9d7d4d62-465d-46a0-a4bd-40268e56ee4c	4ac1cb99-fa66-48d3-9d80-014b01041e7f	Haifa District	HA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
19fd8f53-2bf6-4b8a-94a5-f4f17bb0a7fc	4ac1cb99-fa66-48d3-9d80-014b01041e7f	Jerusalem District	JM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ff2b0722-8c12-4bc2-a51c-e6347f7fd46a	4ac1cb99-fa66-48d3-9d80-014b01041e7f	Northern District	Z	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1c29c6f4-8ae4-42c6-98f4-6ea3a11464d1	4ac1cb99-fa66-48d3-9d80-014b01041e7f	Southern District	D	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8f373141-101f-4de3-bec5-8127e4ae3d35	4ac1cb99-fa66-48d3-9d80-014b01041e7f	Tel Aviv District	TA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
83d9e691-b960-4406-b232-c0c294ab5ada	b9571bc9-03c4-4256-8752-49d9e36e77b6	Abruzzo	65	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
63296ce0-9438-4204-8518-51f855432026	b9571bc9-03c4-4256-8752-49d9e36e77b6	Aosta Valley	23	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
090b4e70-211a-4683-becf-c960afe8fbf1	b9571bc9-03c4-4256-8752-49d9e36e77b6	Apulia	75	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
92dddb45-a015-4307-b42b-c216ce4e1247	b9571bc9-03c4-4256-8752-49d9e36e77b6	Basilicata	77	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
63d8c380-db6b-4c7d-8166-f206d1412ec0	b9571bc9-03c4-4256-8752-49d9e36e77b6	Benevento Province	BN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
91ede173-3ad8-4483-95f4-bb708ccb0bbf	b9571bc9-03c4-4256-8752-49d9e36e77b6	Calabria	78	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8effb0e0-ed7d-470c-b91d-aa0ace701298	b9571bc9-03c4-4256-8752-49d9e36e77b6	Campania	72	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
eda2c4c9-552d-4b64-a0e1-238976bb764b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Emilia-Romagna	45	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
32c60b39-c7c3-4822-a851-7427f800d1d3	b9571bc9-03c4-4256-8752-49d9e36e77b6	Friuli–Venezia Giulia	36	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
48fbf676-79f4-405f-ae62-5bd392c18c51	b9571bc9-03c4-4256-8752-49d9e36e77b6	Lazio	62	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6c115bad-f860-4f0b-838c-9be283c9035a	b9571bc9-03c4-4256-8752-49d9e36e77b6	Libero consorzio comunale di Agrigento	AG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fe48863c-35be-45a8-b03e-66bab09dde3a	b9571bc9-03c4-4256-8752-49d9e36e77b6	Libero consorzio comunale di Caltanissetta	CL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
574cb8a5-ca8d-48e4-9794-3da04ddc0f63	b9571bc9-03c4-4256-8752-49d9e36e77b6	Libero consorzio comunale di Enna	EN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1a098879-8d76-4428-916e-d037d6667ec3	b9571bc9-03c4-4256-8752-49d9e36e77b6	Libero consorzio comunale di Ragusa	RG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e2e9bfd4-6a4a-4b6a-ac3c-e3794549d019	b9571bc9-03c4-4256-8752-49d9e36e77b6	Libero consorzio comunale di Siracusa	SR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
58cb0dc7-b3d4-4e30-a320-a8519d6707a0	b9571bc9-03c4-4256-8752-49d9e36e77b6	Libero consorzio comunale di Trapani	TP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0b5ddc89-ec38-4307-83b1-f4af8dacfb4e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Liguria	42	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ae7cdafc-0adf-4458-bc44-718fdb3cef41	b9571bc9-03c4-4256-8752-49d9e36e77b6	Lombardy	25	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
06e67e95-36e8-4c2f-8550-2f5a0979c564	b9571bc9-03c4-4256-8752-49d9e36e77b6	Marche	57	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
22bf0f7d-98c8-407b-a61e-29a94ff85517	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Bari	BA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c394fba1-792c-4d79-a8fc-f334ba651c06	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Bologna	BO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0629aec6-310f-40d2-a819-440ef9b0903a	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Cagliari	CA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
034c2cd8-df90-454d-ad1b-5c4c8df2feaa	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Catania	CT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c960b2c4-ff0a-4ff5-a0ae-e927612642c8	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Florence	FI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
43254517-e14b-41ca-9483-42009e29cc2d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Genoa	GE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2b83a95a-d964-4a1d-8ee8-50cd020a0253	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Messina	ME	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
aa541581-57a2-42b0-8df9-2980e6152835	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Milan	MI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5cef6a40-ae7e-4fe2-a064-9aad021e2ba6	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Naples	NA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c213011e-78c6-494f-9e51-9cb27200a3f8	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Palermo	PA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
493a1fdc-1ccf-4a6c-8986-5afd3ecc2589	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Reggio Calabria	RC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f705664a-05b1-4c85-aa6a-b6ef4f5e5e6e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Rome	RM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cb45e480-76be-4c0a-a91a-4f4d2d46d6a5	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Turin	TO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
88ce7f7e-8d4f-41ca-bf13-0add18144832	b9571bc9-03c4-4256-8752-49d9e36e77b6	Metropolitan City of Venice	VE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5ed17daa-5f62-4921-8b75-3800d371f5e9	b9571bc9-03c4-4256-8752-49d9e36e77b6	Molise	67	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1db61e63-996d-4977-93a4-62d6d0724c02	b9571bc9-03c4-4256-8752-49d9e36e77b6	Pesaro and Urbino Province	PU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ef8ba6dd-12e4-441a-8432-5794564c0c13	b9571bc9-03c4-4256-8752-49d9e36e77b6	Piedmont	21	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
170ae3d9-47fa-47fb-b803-2f0358cfa5cd	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Alessandria	AL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
db2d4da9-adcf-4438-8766-d63a66a112b0	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Ancona	AN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ecd4b61f-1b7d-41a8-8819-0c1c8e292f3d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Ascoli Piceno	AP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2c7be48a-d9a7-47bc-baca-182dc343d281	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Asti	AT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
22747374-230a-4e15-abc5-8e3d02c80e10	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Avellino	AV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d229e11d-844d-4b76-a8e9-c7e84bcc6395	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Barletta-Andria-Trani	BT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e3c49762-e25b-4cf6-bd60-502773708b8c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Belluno	BL	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
56f227e0-92ac-4511-95b5-c7d22e54471a	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Bergamo	BG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6d85569b-a41b-4d29-9bc6-4fc7cb963837	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Biella	BI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6e2bc5a1-28fb-41e5-830d-e61ac87196c2	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Brescia	BS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b74eb4e7-4084-4eb9-8de3-7ba1727c2aac	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Brindisi	BR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cca263c9-f646-4a29-8e1c-05f2fc631d1b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Campobasso	CB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cb2987e1-a150-4a3f-832c-fca51363f343	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Carbonia-Iglesias	CI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e3f62294-c82c-4849-9fbb-39e1313f5a67	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Caserta	CE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5aef9508-1851-4685-af41-ae4c92688a72	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Catanzaro	CZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4ac06f21-38cb-4c2d-ab16-f4941c8a803b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Chieti	CH	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7baeb869-7cbe-4d86-a4ea-6d0b5e5f7742	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Como	CO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fe0db022-5e5d-4044-a318-51b740e92ddf	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Cosenza	CS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ee8631fa-dbd1-4f27-83e5-422adf0da216	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Cremona	CR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5db4c9ab-5068-4d02-bcf3-21048a92885c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Crotone	KR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2be88383-698a-42c9-b35d-289b6cbe75ef	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Cuneo	CN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a4cd71d9-158d-4842-af88-324b2d8ad4ce	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Fermo	FM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3dd811de-a2b7-4393-84bc-81ac198f074e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Ferrara	FE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
772edfeb-958d-4726-b17b-be0b42412cb4	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Foggia	FG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ed8e962f-b46f-47c3-9dc7-c7595e63b88d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Forlì-Cesena	FC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
607ce036-28f7-4206-a258-d7fb459f46c0	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Frosinone	FR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f23f03f1-d3b9-4840-8c83-407e0a2ba809	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Gorizia	GO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
33342d2a-e3a3-47aa-9ef2-c348262d32c4	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Grosseto	GR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d8fa4b2c-556a-41e3-9039-ba35f505f37c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Imperia	IM	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3a2885a9-dd43-473b-84ec-7084445b56fb	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Isernia	IS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a5c6caf8-7a18-4e87-b6be-fe6c50841a1c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of L'Aquila	AQ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5650e395-8945-4ec5-8bb6-ec47dca7717d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of La Spezia	SP	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
79564fd7-5553-4373-b3d4-374760b2270d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Latina	LT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
03feac8f-d066-48d7-9066-570fac141c8f	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Lecce	LE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3dd0150a-f41a-4444-a691-491f2d4b8fc6	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Lecco	LC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1d694c42-895a-4617-8511-c8f4d6eb69bf	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Livorno	LI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d5f53aff-ce83-4d63-ae10-9f76b376eab5	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Lodi	LO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c347278b-8b59-480b-8428-4e554b65ddf8	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Lucca	LU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
30de9355-fc9c-4d72-b734-35822f3d341b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Macerata	MC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a9348875-791a-499d-91a1-d97e9659a13b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Mantua	MN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a774d265-2104-4fef-b026-8259d4c0219c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Massa and Carrara	MS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
98fe9781-b1d4-4465-91f4-8fd69753dd66	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Matera	MT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d4e70d5c-a7a9-4a15-af4c-a3aaf7283437	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Medio Campidano	VS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8e8114f0-ec0b-4e0c-9ab9-4e31c9a9f570	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Modena	MO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d1adb694-3392-41e9-92e6-514d6f01a7e6	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Monza and Brianza	MB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b08c4cde-232d-4fab-8200-43ce3d2b886e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Novara	NO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2c88ce5f-f61b-464d-a7ed-fb452d878e95	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Nuoro	NU	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8c7258d3-19bf-43b0-80b6-c8a19761bbb3	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Ogliastra	OG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
13b7a17b-7165-4128-99bd-5461de60b384	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Olbia-Tempio	OT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
887fbf26-8ed8-4ace-9c10-2502f014b46e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Oristano	OR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fc964197-1b9a-466d-925c-dfcb8f6bad19	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Padua	PD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
951299c4-8c10-4e7b-b9d3-e72d18b35eb5	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Parma	PR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9313b0f7-03dc-4bfd-90ff-e7e68e11fe88	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Pavia	PV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3ac41811-48b8-4de1-8942-8448cbf07792	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Perugia	PG	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ef85ab34-76d4-45d9-890c-e88804b12217	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Pescara	PE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c1bfee39-89b7-4fda-bd23-7ec2ef8eb1ce	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Piacenza	PC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d00ac192-9c24-44a5-99a0-fa97c722ac60	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Pisa	PI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
95ba4150-9cfa-474b-aa31-24023d9c104b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Pistoia	PT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
5feb87ad-fa3e-47d9-9e57-f0b25757d612	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Pordenone	PN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d45632a8-5f30-4f9a-b60b-fa2cb6e2c1a4	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Potenza	PZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f33c0e81-6eea-4d20-a2b7-c0a97ecd8b69	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Prato	PO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
82780d21-237f-493f-87f3-36fb55ef5451	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Ravenna	RA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6696fa8a-4560-42a4-9c1d-a655a2512d2e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Reggio Emilia	RE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
800fdaa6-714e-4f15-8fa6-44e3601cb2ba	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Rieti	RI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e90a7f60-e08b-481e-aba4-4f8642e77e54	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Rimini	RN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6cefe2d0-24d5-41f8-9c05-1504cba3223f	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Rovigo	RO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6ecb7aee-d799-4694-ba60-5a7e85700536	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Salerno	SA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
409f0fcc-b43c-4597-a8cb-86196dbe3b6b	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Sassari	SS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
a7ac47ad-a4d2-4a59-a711-ba06423f9a6c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Savona	SV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
47ff5220-784b-47bf-a53a-ffb13ab0e62d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Siena	SI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7ba95b43-a5ad-4b6d-8b0a-037914bb171f	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Sondrio	SO	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9790c124-c168-4797-9259-4347f53fa3ea	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Taranto	TA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2a0b13bf-754f-414a-a7dd-0ce836d9417c	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Teramo	TE	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cd8440e0-2b41-475d-8f40-c8542a952fc5	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Terni	TR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d04d368c-6bcb-4d0b-b374-bd983ac41ec8	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Treviso	TV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
b02d4220-7bd7-4193-a085-9ad3632f55c0	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Trieste	TS	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f1733425-54b5-4db1-ac82-f5614c5cd44e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Udine	UD	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
39867a93-11c6-4590-ab08-3b6211ca0b25	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Varese	VA	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
023d1eb7-0010-4c5d-b486-39db3918580e	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Verbano-Cusio-Ossola	VB	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
43bd7764-f633-4e1b-adec-671303978148	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Vercelli	VC	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
870fd818-5c2a-4a27-bbd1-9ead18e57ecc	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Verona	VR	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
28515b96-e25d-4804-9891-333bfb55336a	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Vibo Valentia	VV	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
ef69aa10-1a6c-4973-a347-5f60821c7a13	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Vicenza	VI	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
c80e43e3-98f2-43d3-bed7-af047e42e771	b9571bc9-03c4-4256-8752-49d9e36e77b6	Province of Viterbo	VT	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
830cbfcb-e8d7-490d-aa2a-c4bd95a70d1f	b9571bc9-03c4-4256-8752-49d9e36e77b6	Sardinia	88	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0f1ea1be-bccc-42e9-ad42-9bab2da151c3	b9571bc9-03c4-4256-8752-49d9e36e77b6	Sicily	82	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
1e84e839-5750-43c4-8789-96e54b497600	b9571bc9-03c4-4256-8752-49d9e36e77b6	South Tyrol	BZ	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9687b12b-298d-424a-a3ec-965f7e4821f2	b9571bc9-03c4-4256-8752-49d9e36e77b6	Trentino	TN	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
31526e79-ba76-42c1-a65b-62cad6a11ee6	b9571bc9-03c4-4256-8752-49d9e36e77b6	Trentino-South Tyrol	32	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9c31a9d0-d4ce-4e2b-8abb-7896edc406cc	b9571bc9-03c4-4256-8752-49d9e36e77b6	Tuscany	52	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
49811192-155e-4775-82fa-7d2a889ac5ce	b9571bc9-03c4-4256-8752-49d9e36e77b6	Umbria	55	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3b1dfad6-2483-44a2-aadc-b6fe7ef4555d	b9571bc9-03c4-4256-8752-49d9e36e77b6	Veneto	34	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fc6e1fac-3601-42c7-b424-4b442dd71a03	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Clarendon Parish	13	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
35f43faa-5555-4ad4-b040-ec1a23368f3f	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Hanover Parish	09	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fadcf6f7-5043-4000-9b05-4a3c1de8f7ce	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Kingston Parish	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
bdf9bfec-8755-49fe-9392-4244e6631480	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Manchester Parish	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
50ddcf83-9238-4336-aab1-3aea4a590ad2	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Portland Parish	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fb450e25-d289-46e5-a08b-758dbdf68732	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint Andrew	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
260e76d2-b5ff-4668-b99a-88f8ae754c8b	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint Ann Parish	06	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2abd36d1-3fb9-44f1-bbb8-972dbd83beaf	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint Catherine Parish	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
21feb450-5cf1-4d93-a166-adfac6888224	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint Elizabeth Parish	11	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9064d77a-a14b-486b-b5ea-2264ddff0ca2	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint James Parish	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4c963cd9-9336-4148-b7c1-f5a9e8e69aa5	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint Mary Parish	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
59f1d99c-3df6-41e5-b1f0-aa34c0c2f76c	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Saint Thomas Parish	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
6dfeff48-b2d4-4d7b-b9de-e08d54a2c57c	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Trelawny Parish	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
fd4f98b8-bd04-4ac3-ab3a-ca3f2211a30e	f70432a1-3d54-40ba-85a0-bcad4d1d52c0	Westmoreland Parish	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
cb0e167b-0473-483f-9ff5-aad7ddd6c512	f69f653c-1ace-445b-b985-07b9599b739c	Aichi Prefecture	23	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4e8e9b45-81a8-44a9-840a-b65ae691e595	f69f653c-1ace-445b-b985-07b9599b739c	Akita Prefecture	05	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
74de27a8-ffc6-4ad3-a272-28fe42f11c84	f69f653c-1ace-445b-b985-07b9599b739c	Aomori Prefecture	02	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f44693ad-b48f-48b5-a0fb-25c68f60514e	f69f653c-1ace-445b-b985-07b9599b739c	Chiba Prefecture	12	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
d670a783-c04c-4456-a931-3537bd2e94a6	f69f653c-1ace-445b-b985-07b9599b739c	Ehime Prefecture	38	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2fa6af39-c0d2-492e-8ae6-6a3ba27f6746	f69f653c-1ace-445b-b985-07b9599b739c	Fukui Prefecture	18	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
7df4f21f-0b93-4b49-993d-5c497b16bee7	f69f653c-1ace-445b-b985-07b9599b739c	Fukuoka Prefecture	40	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2fec170b-d77e-440e-8fef-98486d5f852e	f69f653c-1ace-445b-b985-07b9599b739c	Fukushima Prefecture	07	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0ca9f74f-3723-4527-aa45-e26f9825425d	f69f653c-1ace-445b-b985-07b9599b739c	Gifu Prefecture	21	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
27edb031-7e56-40a6-8340-d5572bd1c3b2	f69f653c-1ace-445b-b985-07b9599b739c	Gunma Prefecture	10	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
dd09d464-480e-4048-aefc-7ff450c9f7db	f69f653c-1ace-445b-b985-07b9599b739c	Hiroshima Prefecture	34	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
8f66045e-b282-4160-992c-cc3544c05a65	f69f653c-1ace-445b-b985-07b9599b739c	Hokkaidō Prefecture	01	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0146a008-0cde-4d61-a079-2432803b8612	f69f653c-1ace-445b-b985-07b9599b739c	Hyōgo Prefecture	28	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
31a8b9e4-9151-4bc3-b1ad-36a889784816	f69f653c-1ace-445b-b985-07b9599b739c	Ibaraki Prefecture	08	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
0be0d545-aafe-489d-94cf-582edbbe1d05	f69f653c-1ace-445b-b985-07b9599b739c	Ishikawa Prefecture	17	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
19596457-7d94-46cf-95dc-bf0e5d5d7827	f69f653c-1ace-445b-b985-07b9599b739c	Iwate Prefecture	03	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9e46a0fa-f1aa-48ee-bb90-d5891e678f43	f69f653c-1ace-445b-b985-07b9599b739c	Kagawa Prefecture	37	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
2cf8d25f-0bc8-4a7f-a7dc-87f465715206	f69f653c-1ace-445b-b985-07b9599b739c	Kagoshima Prefecture	46	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
4c2628b3-a331-464d-bfc6-fd61b4e65507	f69f653c-1ace-445b-b985-07b9599b739c	Kanagawa Prefecture	14	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
42875e2a-f21a-450c-971b-cc969d0d5668	f69f653c-1ace-445b-b985-07b9599b739c	Kumamoto Prefecture	43	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
f427f830-27ec-41c6-b899-7ac42343c654	f69f653c-1ace-445b-b985-07b9599b739c	Kyōto Prefecture	26	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
48551baf-b90f-4daa-bbb5-d351acc3fbb3	f69f653c-1ace-445b-b985-07b9599b739c	Kōchi Prefecture	39	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
9ed2e3bb-fe90-4748-949b-bcedb0b64dea	f69f653c-1ace-445b-b985-07b9599b739c	Mie Prefecture	24	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
81e69c23-0eef-420a-a432-c371e761d61b	f69f653c-1ace-445b-b985-07b9599b739c	Miyagi Prefecture	04	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
61c52701-be2e-42f5-8854-4275dd640876	f69f653c-1ace-445b-b985-07b9599b739c	Miyazaki Prefecture	45	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
3f9a0630-3d09-434f-86ef-adf81e87784e	f69f653c-1ace-445b-b985-07b9599b739c	Nagano Prefecture	20	t	2026-02-25 08:11:36.529	2026-02-25 08:11:36.529	\N	\N	\N	\N
e4a6a778-9af8-43d5-b825-a7aa122fbf70	f69f653c-1ace-445b-b985-07b9599b739c	Nagasaki Prefecture	42	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
845e2512-91ee-466c-810f-bbfa82185137	f69f653c-1ace-445b-b985-07b9599b739c	Nara Prefecture	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4049d5ea-5c9a-49c2-bd08-e6c831477ee6	f69f653c-1ace-445b-b985-07b9599b739c	Niigata Prefecture	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
064d5f4a-559d-44ec-a8cd-ffc856ec61d4	f69f653c-1ace-445b-b985-07b9599b739c	Okayama Prefecture	33	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
85d3e52e-d18f-431e-93d4-e69d8a3eb31f	f69f653c-1ace-445b-b985-07b9599b739c	Okinawa Prefecture	47	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
390cd72d-2806-4382-be2d-8c5ff2b5c7d9	f69f653c-1ace-445b-b985-07b9599b739c	Saga Prefecture	41	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e6ab84ec-bbcc-4f2f-b37f-afbb4d42b024	f69f653c-1ace-445b-b985-07b9599b739c	Saitama Prefecture	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
44da52b6-9072-4119-b54f-75a877e5217b	f69f653c-1ace-445b-b985-07b9599b739c	Shiga Prefecture	25	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
08219bc2-5a67-42db-ad67-ae01c63189f8	f69f653c-1ace-445b-b985-07b9599b739c	Shimane Prefecture	32	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8e07ea47-9887-4149-a7d8-c00f16aec195	f69f653c-1ace-445b-b985-07b9599b739c	Shizuoka Prefecture	22	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7fb6610d-bc3c-4801-985d-cb2402c1755f	f69f653c-1ace-445b-b985-07b9599b739c	Tochigi Prefecture	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
53765a65-df29-4089-93ad-a4cfa10f660b	f69f653c-1ace-445b-b985-07b9599b739c	Tokushima Prefecture	36	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4383b915-25ac-478e-b0d5-a9c18c8d71d5	f69f653c-1ace-445b-b985-07b9599b739c	Tokyo	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9352b88c-1023-4283-a16a-4f295ff7b463	f69f653c-1ace-445b-b985-07b9599b739c	Tottori Prefecture	31	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a5c00322-1a9b-46cd-9fd1-3fdaaa80ef8c	f69f653c-1ace-445b-b985-07b9599b739c	Toyama Prefecture	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
55b800c3-f1df-4c65-95d2-a5e351e77efd	f69f653c-1ace-445b-b985-07b9599b739c	Wakayama Prefecture	30	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8e69750e-5977-4e84-aa03-747a54e69533	f69f653c-1ace-445b-b985-07b9599b739c	Yamagata Prefecture	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8e835cf1-1b46-4cff-9fd3-0787edcb9180	f69f653c-1ace-445b-b985-07b9599b739c	Yamaguchi Prefecture	35	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c117ea3a-4293-4dcf-8036-1a915bf9b361	f69f653c-1ace-445b-b985-07b9599b739c	Yamanashi Prefecture	19	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
677ebf2c-aa12-419c-8789-c88beba80d4f	f69f653c-1ace-445b-b985-07b9599b739c	Ōita Prefecture	44	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b1c37168-e2e0-49ef-9949-e936e5c20de3	f69f653c-1ace-445b-b985-07b9599b739c	Ōsaka Prefecture	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6b817ba3-2132-4f09-90b2-caf4fc257e3b	abf2efb4-e689-4ea8-a736-f958eb57df70	Ajloun Governorate	AJ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f9e22fd1-2e5a-4e78-9717-50e44c8fa3d0	abf2efb4-e689-4ea8-a736-f958eb57df70	Amman Governorate	AM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c2edd935-3d7a-4a3d-9d4e-75dfc7d82131	abf2efb4-e689-4ea8-a736-f958eb57df70	Aqaba Governorate	AQ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b445b3fc-6cdb-438c-bfbd-8b3fe0854b5d	abf2efb4-e689-4ea8-a736-f958eb57df70	Balqa Governorate	BA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
af559d0c-186b-4bfd-9e49-f8742757172a	abf2efb4-e689-4ea8-a736-f958eb57df70	Irbid Governorate	IR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e65e467a-d7cd-4e39-8fa0-0a2514db8ae5	abf2efb4-e689-4ea8-a736-f958eb57df70	Jerash Governorate	JA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c09e27a4-ae55-4ba8-9849-77042fb81225	abf2efb4-e689-4ea8-a736-f958eb57df70	Karak Governorate	KA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1a2a4007-ff1c-4532-882b-3d66040cf599	abf2efb4-e689-4ea8-a736-f958eb57df70	Ma'an Governorate	MN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
196af4ac-7aaa-44a8-912b-1c88dac8fbce	abf2efb4-e689-4ea8-a736-f958eb57df70	Madaba Governorate	MD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
62a2ea2c-81a9-4271-83cc-716cbc4c3aab	abf2efb4-e689-4ea8-a736-f958eb57df70	Mafraq Governorate	MA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fd07ef05-ca67-48f2-8c5c-0a2be4b3fc0c	abf2efb4-e689-4ea8-a736-f958eb57df70	Tafilah Governorate	AT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b8b5957d-e7a3-420a-bcc1-20d08a01e3b6	abf2efb4-e689-4ea8-a736-f958eb57df70	Zarqa Governorate	AZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f494f653-2c96-41b3-b9c9-a0f23ac82420	91d5a77a-8f46-4be1-a961-22fa88c16a07	Akmola Region	AKM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f9d3c5e0-8706-4921-9044-ef139cc8cb68	91d5a77a-8f46-4be1-a961-22fa88c16a07	Aktobe Region	AKT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2d6a0e6d-be3a-4a22-8988-9b2f8d86ddeb	91d5a77a-8f46-4be1-a961-22fa88c16a07	Almaty	ALA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2b3392b6-6fa6-47ab-bc65-459811c34c08	91d5a77a-8f46-4be1-a961-22fa88c16a07	Almaty Region	ALM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9d8f24da-2821-426b-8776-56feb84732de	91d5a77a-8f46-4be1-a961-22fa88c16a07	Atyrau Region	ATY	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c39f5a69-dd0e-4500-a686-2d35ce7f2996	91d5a77a-8f46-4be1-a961-22fa88c16a07	Baikonur	BAY	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4a1f42db-bebe-46e1-9dcd-1337e0813c63	91d5a77a-8f46-4be1-a961-22fa88c16a07	East Kazakhstan Region	VOS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e48ec4d6-a12c-4a30-8e02-0c6c16ba6c03	91d5a77a-8f46-4be1-a961-22fa88c16a07	Jambyl Region	ZHA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e6f41a28-b352-4b2f-896d-6acbecf38df1	91d5a77a-8f46-4be1-a961-22fa88c16a07	Karaganda Region	KAR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5898c109-7493-4b3c-b72e-f11161e1e115	91d5a77a-8f46-4be1-a961-22fa88c16a07	Kostanay Region	KUS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f36e01f6-85f9-4956-8251-b991ceecab5b	91d5a77a-8f46-4be1-a961-22fa88c16a07	Kyzylorda Region	KZY	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9ab700da-8054-46c9-b2f5-55500c42f413	91d5a77a-8f46-4be1-a961-22fa88c16a07	Mangystau Region	MAN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b3e94b5d-4755-4e10-aa3f-11cff0b966b5	91d5a77a-8f46-4be1-a961-22fa88c16a07	North Kazakhstan Region	SEV	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b32797b5-0eb3-4a2f-9eeb-252b67c44721	91d5a77a-8f46-4be1-a961-22fa88c16a07	Nur-Sultan	AST	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6ca9b7c2-baff-4c6d-815d-6aea9cf1d78d	91d5a77a-8f46-4be1-a961-22fa88c16a07	Pavlodar Region	PAV	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
857001b7-41d8-42f8-800b-53590929ebca	91d5a77a-8f46-4be1-a961-22fa88c16a07	Turkestan Region	YUZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
937b16fe-1679-434e-9ec5-2cc4cb486f42	91d5a77a-8f46-4be1-a961-22fa88c16a07	West Kazakhstan Province	ZAP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
479940e4-4190-4daf-a2b1-61bce8d77a1b	b8915397-43a7-4f6b-8781-6193e02ff9bb	Baringo	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a4d1ff9f-cc35-4285-829a-77ef3287b669	b8915397-43a7-4f6b-8781-6193e02ff9bb	Bomet	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
781a80c4-8ef2-409c-b624-91d1b34c041a	b8915397-43a7-4f6b-8781-6193e02ff9bb	Bungoma	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0cf58620-2731-4f09-99b8-98f9b6fd48de	b8915397-43a7-4f6b-8781-6193e02ff9bb	Busia	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cf806bbf-b66e-4620-a068-d7173ffba488	b8915397-43a7-4f6b-8781-6193e02ff9bb	Elgeyo-Marakwet	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e7170ec2-c52b-4e17-a0be-1fb1a2272293	b8915397-43a7-4f6b-8781-6193e02ff9bb	Embu	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4cee8343-4992-4299-a892-ed976c4e03fa	b8915397-43a7-4f6b-8781-6193e02ff9bb	Garissa	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f1d216f2-2d5f-4e52-a201-5ae5c007bb39	b8915397-43a7-4f6b-8781-6193e02ff9bb	Homa Bay	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
60a8c848-6560-4f39-a1e7-00fddbd598c7	b8915397-43a7-4f6b-8781-6193e02ff9bb	Isiolo	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
722d1f0d-3735-4887-8edb-db5818e0a5f4	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kajiado	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1458d897-6cb1-41a7-8696-b0d94d20b978	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kakamega	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4649da54-1a97-4752-b99b-8cf1f7f91ace	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kericho	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
14246ef8-520c-4889-bbb1-51017358708b	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kiambu	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
32aacaa9-85a5-4fea-93b6-51cdf16a687c	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kilifi	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0705ca9d-f345-46a0-a19b-f505cf958a08	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kirinyaga	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2ece940e-dfe7-4d3d-80e7-c603187a0e18	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kisii	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b278454b-4855-40a7-823c-58b14d6db19f	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kisumu	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
44eb575c-7b12-4e16-9d5a-dffd91c14673	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kitui	18	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8f12e557-0049-4bf5-8103-a5589de20d45	b8915397-43a7-4f6b-8781-6193e02ff9bb	Kwale	19	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7c59e78e-25cf-473e-ad26-4f01dbfca2fc	b8915397-43a7-4f6b-8781-6193e02ff9bb	Laikipia	20	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2f54f329-656e-47d2-8a5a-543faac9b6f3	b8915397-43a7-4f6b-8781-6193e02ff9bb	Lamu	21	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bdfe3ddc-fbb3-4948-9a14-750009f88162	b8915397-43a7-4f6b-8781-6193e02ff9bb	Machakos	22	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4e410a40-f769-4c2f-a81c-3e0c0991931f	b8915397-43a7-4f6b-8781-6193e02ff9bb	Makueni	23	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a05a71e3-c407-49e7-96e6-ebe902bb8b52	b8915397-43a7-4f6b-8781-6193e02ff9bb	Mandera	24	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
88b509ac-4270-403c-b847-903c313ea478	b8915397-43a7-4f6b-8781-6193e02ff9bb	Marsabit	25	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
add4a13e-bb27-4461-bc72-eaa4cae7b4e6	b8915397-43a7-4f6b-8781-6193e02ff9bb	Meru	26	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6a043399-e6f7-483a-adcd-e904bef1f360	b8915397-43a7-4f6b-8781-6193e02ff9bb	Migori	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e9a770d5-3045-4d1c-9f49-90addaadc3c3	b8915397-43a7-4f6b-8781-6193e02ff9bb	Mombasa	28	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bc405c7f-19d4-40f5-8baf-d02aabbb3c4c	b8915397-43a7-4f6b-8781-6193e02ff9bb	Murang'a	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e01503f1-d9d3-4773-ab94-53f54878cdbc	b8915397-43a7-4f6b-8781-6193e02ff9bb	Nairobi City	30	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fd8ec50b-281a-48d5-b15a-137570ee62f2	b8915397-43a7-4f6b-8781-6193e02ff9bb	Nakuru	31	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
75510ff5-48cf-4529-bf1e-90d7d29f685d	b8915397-43a7-4f6b-8781-6193e02ff9bb	Nandi	32	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
78114095-36bd-488d-8c91-98ca1701e48f	b8915397-43a7-4f6b-8781-6193e02ff9bb	Narok	33	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7b816cbe-7512-4e4f-81f2-4926fb701c1b	b8915397-43a7-4f6b-8781-6193e02ff9bb	Nyamira	34	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ad022934-6f71-4467-9691-c06253b57180	b8915397-43a7-4f6b-8781-6193e02ff9bb	Nyandarua	35	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
825c7dff-a3f2-41f3-bb38-a4321cce80a8	b8915397-43a7-4f6b-8781-6193e02ff9bb	Nyeri	36	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b32e7203-f46c-4851-89c1-3060e310786f	b8915397-43a7-4f6b-8781-6193e02ff9bb	Samburu	37	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
34e8d5d7-3a70-4423-b944-29e7babf5649	b8915397-43a7-4f6b-8781-6193e02ff9bb	Siaya	38	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ec7f564b-7811-4ddc-8297-0f1b4b4422d0	b8915397-43a7-4f6b-8781-6193e02ff9bb	Taita–Taveta	39	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
77b9bbf2-6840-4271-9d42-09d808fbb349	b8915397-43a7-4f6b-8781-6193e02ff9bb	Tana River	40	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
12b192ef-7f90-406a-b337-38e05e4d1c01	b8915397-43a7-4f6b-8781-6193e02ff9bb	Tharaka-Nithi	41	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d15cb0f2-6286-4d8c-9a65-e6890d0443b0	b8915397-43a7-4f6b-8781-6193e02ff9bb	Trans Nzoia	42	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0db00234-517f-474d-ac7f-53635a823374	b8915397-43a7-4f6b-8781-6193e02ff9bb	Turkana	43	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f51c36f5-c9de-4282-837e-42f73f65bd09	b8915397-43a7-4f6b-8781-6193e02ff9bb	Uasin Gishu	44	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
780b64a7-c7f7-4bfb-a553-067a13dd984b	b8915397-43a7-4f6b-8781-6193e02ff9bb	Vihiga	45	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
624aacab-c781-4912-a4ec-db6cc1968e91	b8915397-43a7-4f6b-8781-6193e02ff9bb	Wajir	46	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
99a0f734-1493-4dd1-a686-55a7705f4b40	b8915397-43a7-4f6b-8781-6193e02ff9bb	West Pokot	47	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2081a785-c396-4fe8-a8c0-bbba4ecde608	03f258af-a1f3-43d0-b02e-d3e5585498cb	Gilbert Islands	G	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
49b4ad40-eae4-4494-a45a-c71efd1de521	03f258af-a1f3-43d0-b02e-d3e5585498cb	Line Islands	L	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0de7a42d-c292-4945-9fc5-8ad2b60e81bb	03f258af-a1f3-43d0-b02e-d3e5585498cb	Phoenix Islands	P	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c97029fb-a21c-4a5c-9b9c-89773e6081a5	2ab2998a-8616-43bd-a2fc-bfcd266599d5	Chagang Province	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3eee81ba-a524-4ad9-b226-060c05fffabd	2ab2998a-8616-43bd-a2fc-bfcd266599d5	Kangwon Province	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
113310ce-e8ab-4710-867d-f23df5f1f780	2ab2998a-8616-43bd-a2fc-bfcd266599d5	North Hamgyong Province	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
93f688d3-8a34-49d3-959a-214b39244792	2ab2998a-8616-43bd-a2fc-bfcd266599d5	North Hwanghae Province	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
83f73d9c-2c21-49c8-94e0-7cd345b1d9d0	2ab2998a-8616-43bd-a2fc-bfcd266599d5	North Pyongan Province	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c0d323cf-6559-401a-8ad1-a1094bc3fbd8	2ab2998a-8616-43bd-a2fc-bfcd266599d5	Pyongyang	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
872fc22b-b997-4bd3-9eae-f42a79276cad	2ab2998a-8616-43bd-a2fc-bfcd266599d5	Rason	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e1b861e6-dedd-4ca5-88cc-5ee5b38f3ae4	2ab2998a-8616-43bd-a2fc-bfcd266599d5	Ryanggang Province	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ea108fb6-325c-41e6-ad24-d942301e0694	2ab2998a-8616-43bd-a2fc-bfcd266599d5	South Hamgyong Province	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ea4cd8e3-09ff-4d03-b576-b36069f084c1	2ab2998a-8616-43bd-a2fc-bfcd266599d5	South Hwanghae Province	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8f0c192e-67ef-40c1-a4c7-a0cb4bbffa06	2ab2998a-8616-43bd-a2fc-bfcd266599d5	South Pyongan Province	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0f3734cd-0a2b-4fe6-84e0-2f63926c98e0	779cfcc9-a252-4ade-83ba-95dec1554a42	Busan	26	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d9914b5d-7fea-42f9-95b0-b6baa12259df	779cfcc9-a252-4ade-83ba-95dec1554a42	Daegu	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0ef68a87-2fa1-4401-9c34-dbf0fc582eb2	779cfcc9-a252-4ade-83ba-95dec1554a42	Daejeon	30	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b60aa649-72a8-400a-bfaa-e986b45ab12d	779cfcc9-a252-4ade-83ba-95dec1554a42	Gangwon Province	42	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e86b10d3-a2ba-4396-841a-385898565bba	779cfcc9-a252-4ade-83ba-95dec1554a42	Gwangju	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0ea052fe-3373-4694-bd56-1630905d32b6	779cfcc9-a252-4ade-83ba-95dec1554a42	Gyeonggi Province	41	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ec7a2398-5cf1-4abf-9be6-016229dc97dc	779cfcc9-a252-4ade-83ba-95dec1554a42	Incheon	28	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0968b887-f958-4b87-8369-f0cd100925a5	779cfcc9-a252-4ade-83ba-95dec1554a42	Jeju	49	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b0b34c39-1772-45ae-a8c5-1da8f8b9e885	779cfcc9-a252-4ade-83ba-95dec1554a42	North Chungcheong Province	43	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f934848a-8fb7-420f-b540-6f679fb0fb25	779cfcc9-a252-4ade-83ba-95dec1554a42	North Gyeongsang Province	47	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
98177b27-af4f-466f-b487-958df6f58a1c	779cfcc9-a252-4ade-83ba-95dec1554a42	North Jeolla Province	45	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
46922092-1969-4f28-9711-64188936b17e	779cfcc9-a252-4ade-83ba-95dec1554a42	Sejong City	50	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9a2b4d2a-8965-4005-a39a-e69cf1d5e7e3	779cfcc9-a252-4ade-83ba-95dec1554a42	Seoul	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c5d502e0-07fc-45da-b916-d0d480d2f69b	779cfcc9-a252-4ade-83ba-95dec1554a42	South Chungcheong Province	44	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bbdebc10-a10c-4c4e-a5cf-9362840bfee4	779cfcc9-a252-4ade-83ba-95dec1554a42	South Gyeongsang Province	48	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b73bdef5-d513-4d93-aa2d-80d0eb51ceb5	779cfcc9-a252-4ade-83ba-95dec1554a42	South Jeolla Province	46	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ef7f7230-baab-4fda-822c-20f40ce8b8bf	779cfcc9-a252-4ade-83ba-95dec1554a42	Ulsan	31	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5aaac2e9-1749-4ade-b7cd-2d4f0b81061a	3d211681-2665-41db-b1a8-894f7555afd0	Al Ahmadi Governorate	AH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
670f4281-e367-4b8d-8f52-fff7c8ebdf88	3d211681-2665-41db-b1a8-894f7555afd0	Al Farwaniyah Governorate	FA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
382de48d-b0d1-4b98-8304-d4bdf447f284	3d211681-2665-41db-b1a8-894f7555afd0	Al Jahra Governorate	JA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
42eaf12f-a2f5-48ad-9e91-5a0824465354	3d211681-2665-41db-b1a8-894f7555afd0	Capital Governorate	KU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
468276d2-cae0-4bac-85f9-aa5208ff7616	3d211681-2665-41db-b1a8-894f7555afd0	Hawalli Governorate	HA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
24adf08a-423e-4338-a378-a50becca5ecb	3d211681-2665-41db-b1a8-894f7555afd0	Mubarak Al-Kabeer Governorate	MU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
13e0d513-983f-4104-a038-30ecc505702e	406cc5bb-b3bd-47c4-9ba1-b06742404823	Batken Region	B	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
50e9948c-f16d-4472-9528-6a25f2600bb5	406cc5bb-b3bd-47c4-9ba1-b06742404823	Bishkek	GB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e152123f-bd83-4477-b2cc-ab9b89288a1c	406cc5bb-b3bd-47c4-9ba1-b06742404823	Chuy Region	C	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8ee66578-18fd-4713-a7c2-ef9adf5efbe8	406cc5bb-b3bd-47c4-9ba1-b06742404823	Issyk-Kul Region	Y	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d412b021-28dc-4b6f-86d5-586f566a021f	406cc5bb-b3bd-47c4-9ba1-b06742404823	Jalal-Abad Region	J	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f59f61a9-eff3-4d2a-a9cc-87afd2728768	406cc5bb-b3bd-47c4-9ba1-b06742404823	Naryn Region	N	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
73c18f5f-2987-4f05-8556-66816a1778f6	406cc5bb-b3bd-47c4-9ba1-b06742404823	Osh	GO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d2bd51d2-aab4-46b4-b43a-3ceabc14363e	406cc5bb-b3bd-47c4-9ba1-b06742404823	Osh Region	O	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f218c4f7-3ebc-42db-aa93-756ef32d0199	406cc5bb-b3bd-47c4-9ba1-b06742404823	Talas Region	T	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2063930e-139b-4f0c-94ec-8723ab6796a3	8da77644-7ac9-4424-864d-d1f0f10b87ce	Attapeu Province	AT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6c01fc2b-09c8-4f3f-a22b-52222e9dcee1	8da77644-7ac9-4424-864d-d1f0f10b87ce	Bokeo Province	BK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a5e66343-5de4-4993-8948-cf7a65f54207	8da77644-7ac9-4424-864d-d1f0f10b87ce	Bolikhamsai Province	BL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6e13d126-a00d-4d40-b723-d2e0fc79d765	8da77644-7ac9-4424-864d-d1f0f10b87ce	Champasak Province	CH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
19a1225f-6406-4049-aac7-0aa290d1ccb1	8da77644-7ac9-4424-864d-d1f0f10b87ce	Houaphanh Province	HO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
eb14c416-319d-4fcd-a7a1-f991e09aab71	8da77644-7ac9-4424-864d-d1f0f10b87ce	Khammouane Province	KH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b07c062d-2c2f-4d45-9d8f-68c89ea51cd8	8da77644-7ac9-4424-864d-d1f0f10b87ce	Luang Namtha Province	LM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4f57479a-f506-4835-835c-3bc1504d323d	8da77644-7ac9-4424-864d-d1f0f10b87ce	Luang Prabang Province	LP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d1846b7f-2449-4b00-ba84-4acf1967fbb5	8da77644-7ac9-4424-864d-d1f0f10b87ce	Oudomxay Province	OU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
46286350-9231-4659-ba53-3d3eb3db5eda	8da77644-7ac9-4424-864d-d1f0f10b87ce	Phongsaly Province	PH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0cd31f50-9560-4264-a332-df238786661e	8da77644-7ac9-4424-864d-d1f0f10b87ce	Sainyabuli Province	XA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9f502bd1-9a0a-4bba-94df-237e6fe9b62f	8da77644-7ac9-4424-864d-d1f0f10b87ce	Salavan Province	SL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d4ad5481-8612-449d-b381-d3ab8d5e3bc3	8da77644-7ac9-4424-864d-d1f0f10b87ce	Savannakhet Province	SV	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9e105ac9-e820-4cac-beea-096f16215fe5	8da77644-7ac9-4424-864d-d1f0f10b87ce	Sekong Province	XE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
079c3f36-61b7-4133-82c8-164ed2d296b6	8da77644-7ac9-4424-864d-d1f0f10b87ce	Vientiane Prefecture	VT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
600eef17-637c-4811-9ed7-a106ff767121	8da77644-7ac9-4424-864d-d1f0f10b87ce	Vientiane Province	VI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9ee54280-7727-448f-b5aa-b602ac64c3b5	8da77644-7ac9-4424-864d-d1f0f10b87ce	Xaisomboun	XN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a55741c6-f2fe-47f0-a73f-5572b85bfccc	8da77644-7ac9-4424-864d-d1f0f10b87ce	Xaisomboun Province	XS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8ddea848-04ce-4c48-b970-5867f1d67918	8da77644-7ac9-4424-864d-d1f0f10b87ce	Xiangkhouang Province	XI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
01bfb0ae-f35b-4ea2-a4da-d25fa0bbfc5a	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Aglona Municipality	001	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ad9161a8-0dfa-4ce2-9082-dd873f1e4451	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Aizkraukle Municipality	002	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ed6408d4-fd7f-4941-aa6b-a507b9b46d94	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Aizpute Municipality	003	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f029067c-7c8f-4960-963b-44b764a6e74a	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Aknīste Municipality	004	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
30f46945-a6c8-46a9-aa4c-12951a056f6c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Aloja Municipality	005	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a0ce51ee-6b8f-45ea-a2a2-3a4ab1a3cab8	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Alsunga Municipality	006	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
43cb776e-acfe-4ee9-8f13-54984dd2b0cc	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Alūksne Municipality	007	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6df6fe33-8b2c-4da6-b4df-b5707e1efdd3	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Amata Municipality	008	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7cea2070-8148-4ac3-a5a3-0fd580c30204	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ape Municipality	009	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
76ef133d-1cea-4a9b-88ca-916da9482b6b	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Auce Municipality	010	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
570bcea2-0652-4b59-810a-bfc38e7dc343	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Babīte Municipality	012	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9af0408c-0c52-444c-886b-4c5d9fecf837	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Baldone Municipality	013	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
38e3c00c-c087-4c3f-b869-b488703aa09f	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Baltinava Municipality	014	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dd1a1089-b2c5-4f1e-bc3e-fbadf858c2e8	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Balvi Municipality	015	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4dc823c2-68dd-48a2-9b7a-e9e111615004	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Bauska Municipality	016	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
db0aa707-3e43-4029-8546-7381c08011e6	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Beverīna Municipality	017	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1e232415-d6af-4ba7-8e3f-ade18c567399	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Brocēni Municipality	018	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a452b379-2d41-4f06-9c9f-36f9084e5044	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Burtnieki Municipality	019	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
14415d11-e89c-4df9-9102-410d41d93825	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Carnikava Municipality	020	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
98d2e68e-3853-4e18-b1ea-f6651a43ca02	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Cesvaine Municipality	021	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7ff44642-fdb1-49e6-8c06-8139f93a00e7	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Cibla Municipality	023	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e8f43960-5374-493d-8598-8bc78f29e576	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Cēsis Municipality	022	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ff276e5e-7fcb-4328-9600-7bbbe8dc5042	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Dagda Municipality	024	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
190a6a44-c93d-430f-85df-71e62f65c028	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Daugavpils	DGV	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
385983bf-5114-41ce-99e9-f2cab3e60d28	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Daugavpils Municipality	025	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5655d398-ab01-4c7f-b783-f0064952a78d	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Dobele Municipality	026	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7c4528ac-937f-42f5-bdab-1e66e4241d77	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Dundaga Municipality	027	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
944a1fc9-fdb2-4005-b6ec-3e6997ce87ed	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Durbe Municipality	028	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
97b360d6-16f8-451e-98da-2e588261a4f5	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Engure Municipality	029	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1182301d-f5c0-4cdd-9c42-9f7747fddefb	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Garkalne Municipality	031	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f9797666-42a2-4e69-8510-fe481608a771	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Grobiņa Municipality	032	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2b845732-b55e-44ea-86dd-ac07ef61b892	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Gulbene Municipality	033	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
53fe39bf-1750-4ffc-be6d-298153059012	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Iecava Municipality	034	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
585b449f-2db5-43af-8827-c99f51daf2ff	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ikšķile Municipality	035	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
261a1d85-3652-40c4-9f8c-4d988db09fa6	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ilūkste Municipality	036	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cd1c327e-3e18-4061-97af-a5cc157aad4e	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Inčukalns Municipality	037	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7683ce7b-78ec-4592-a0bb-a7a46662878e	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jaunjelgava Municipality	038	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
abe3fad0-0d6a-4342-9884-6a85326bddda	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jaunpiebalga Municipality	039	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c59211be-5269-4cc6-89f9-615ae86d90db	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jaunpils Municipality	040	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
390d6070-52cc-4eb7-8772-75780f10b4bf	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jelgava	JEL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c739f6e6-885c-480a-bbb7-5d657bb41862	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jelgava Municipality	041	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
210599be-0f8f-45aa-b0fd-c6a076070c2b	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jēkabpils	JKB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
df2a2d02-41d3-45b3-8514-493c8ddbd913	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jēkabpils Municipality	042	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fbd34aec-876f-4988-aa41-96e03ed4494c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Jūrmala	JUR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
48b8b31d-21c3-4266-8e82-f7afb666bb3e	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Kandava Municipality	043	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7070c9a8-6ce8-458b-8cd2-63b22dc5eab9	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Kocēni Municipality	045	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
93351f6f-ddf1-4792-ac51-64c60a723acb	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Koknese Municipality	046	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9e53e084-4a4c-49ba-a3fb-a311317cf783	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Krimulda Municipality	048	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2458e3ed-688b-4b46-a0b9-020b4f6c0aac	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Krustpils Municipality	049	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
eb8bcdc2-b8e7-494d-bb58-fb568965606b	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Krāslava Municipality	047	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fbdab8f7-5141-413f-99de-0d93db21b793	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Kuldīga Municipality	050	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
03c8167e-986f-4838-819c-34e4fedc3613	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Kārsava Municipality	044	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
58d4492e-fd34-4019-a0aa-fd8c4fbd09c9	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Lielvārde Municipality	053	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f588e330-ecf4-4685-b2ce-5b1eea7fad59	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Liepāja	LPX	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1181e985-7d7a-4c91-beb1-77b8820ebe99	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Limbaži Municipality	054	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d6479202-7789-43c3-820b-121ac7acbe85	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Lubāna Municipality	057	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
15926e72-bba9-44ce-bd3a-ac92265453b1	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ludza Municipality	058	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ce65869c-6393-4864-b4f3-eca4b8c949cc	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Līgatne Municipality	055	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a0a6ea83-8e7e-4034-89f7-1bbdd7d6193d	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Līvāni Municipality	056	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f105eaab-5a07-4418-98d2-a740a96cb6a6	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Madona Municipality	059	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f5542b8b-19ce-4d01-bf35-b3701ca147b7	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Mazsalaca Municipality	060	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
22fdf6f1-f19a-4ebb-a0f0-8ec46aaca03e	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Mālpils Municipality	061	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
35fb78d7-aae3-4533-82aa-46c2eef319db	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Mārupe Municipality	062	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
27b8f871-5bac-45a4-90f4-9e626cea4221	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Mērsrags Municipality	063	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
aafb0f87-cc63-4cdc-a51d-ba9753b2635d	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Naukšēni Municipality	064	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de057fcb-fdb2-4d87-98e6-fc6f1ce299c4	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Nereta Municipality	065	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f6cdc70d-d025-4f16-b480-fc8db452330d	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Nīca Municipality	066	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e9a99990-a8b8-42da-bc70-f86b60622e97	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ogre Municipality	067	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dd521c4b-fad2-407b-becc-c25045cb5177	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Olaine Municipality	068	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
536ad7bc-6acb-43fe-83af-1b09ff8eeea9	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ozolnieki Municipality	069	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c1091eec-eb16-483e-afb1-4fc54182a9e6	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Preiļi Municipality	073	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e11cb637-74a9-45bf-b01e-53750fc6f5ea	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Priekule Municipality	074	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e7eb55f7-3bd4-4e9d-b298-0addfc93cff9	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Priekuļi Municipality	075	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
206798a4-8ea8-4112-b738-741e0140f22c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Pārgauja Municipality	070	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8a19007f-30b8-4648-ac33-00f06fb66030	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Pāvilosta Municipality	071	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4f596c46-cc60-4137-94f8-384fa9aaf31d	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Pļaviņas Municipality	072	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
782d8733-5989-4baa-98be-45f9da1740c5	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rauna Municipality	076	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b2b06643-1190-44af-8ea0-b9117d34f1d3	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Riebiņi Municipality	078	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f24e1faf-b475-4d7a-98c4-7113cd054084	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Riga	RIX	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
57d8cc09-7d5d-4a85-8e5a-45160fbeea50	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Roja Municipality	079	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c9c1fcba-3923-48ef-a312-f2872fa2aa54	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ropaži Municipality	080	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de629074-c441-4b25-bc48-26a7bc4fe730	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rucava Municipality	081	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
130c4e6e-fa89-43be-bee2-be73ed44b3e7	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rugāji Municipality	082	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5ce42230-bc65-470f-95c2-905fdbe1b133	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rundāle Municipality	083	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
aa56982f-4ae1-49ba-ab6c-72e4d6f4b7a3	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rēzekne	REZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
595a0d7a-d467-48ab-82eb-ded142b6904c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rēzekne Municipality	077	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
651434cb-e4b1-4265-9cc2-0f9cf48e3c20	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Rūjiena Municipality	084	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b1c6aee0-062c-4239-bd56-318b76279680	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Sala Municipality	085	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4d31ad26-6991-4a5d-acf6-d31523777f50	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Salacgrīva Municipality	086	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9ac58c1a-24fe-4936-871e-1fdb3e572111	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Salaspils Municipality	087	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
15f72d55-0e6f-4c8e-ba31-8b3ad3951521	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Saldus Municipality	088	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1a38a5ab-366a-4ed2-b118-a915cf5e2c2e	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Saulkrasti Municipality	089	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
036778e9-f644-4e59-9788-17f1af2b6a7c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Sigulda Municipality	091	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1a51fa55-2818-4278-b1c2-024f2c67dc00	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Skrunda Municipality	093	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
532ef0cb-68ec-4140-a4d7-4a0bd50f348c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Skrīveri Municipality	092	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
97ef80ea-a4aa-4838-918f-097f8e6d8833	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Smiltene Municipality	094	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f0702711-b06a-4376-9a0f-3551bb1a353c	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Stopiņi Municipality	095	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b314b259-7218-4aad-8750-828337cb7aa9	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Strenči Municipality	096	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6a152814-fe6c-4fe6-ada9-d2af58786b59	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Sēja Municipality	090	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8ee66757-4044-4b1b-8c8b-e9ea8ffff02a	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Talsi Municipality	097	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
56887df6-1055-4e85-8101-afbc7954a7e7	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Tukums Municipality	099	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5cc67fdc-50e9-40ac-8616-50d7d9c51df2	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Tērvete Municipality	098	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
89a944b4-c4cd-41fe-ad9d-cf305be3bcab	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Vaiņode Municipality	100	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
46318f01-95f5-40dc-b19e-e47d636a1ccb	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Valka Municipality	101	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2ea6947b-e50d-4dae-ab44-bece85841941	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Valmiera	VMR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
50cad28b-747c-4f9a-bf7b-cc8142e75616	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Varakļāni Municipality	102	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d08f8597-fcc8-4fe6-941b-33104b3df15e	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Vecpiebalga Municipality	104	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4b7a195d-b598-4473-a1d5-db6c667f5c34	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Vecumnieki Municipality	105	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7ef2689e-7169-4ed0-8f5f-ed8dfdf1b464	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ventspils	VEN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bc5d4f2a-198d-4c7f-84f6-31a7704809dc	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ventspils Municipality	106	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
61ec3e15-e350-49fe-bed2-8e47c3e1c132	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Viesīte Municipality	107	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fb03fc8d-6ee0-4c47-bedc-17aacd23aa56	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Viļaka Municipality	108	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8de88390-0289-4c43-a274-27a4aa169568	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Viļāni Municipality	109	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c0f29cc0-0b24-4364-be84-d158eadcce5f	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Vārkava Municipality	103	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ba179fe0-6762-4ea0-a46c-c1ea48007a79	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Zilupe Municipality	110	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
15e335c6-910c-4868-9976-df5544c10a17	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ērgļi Municipality	030	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1be9cdd9-e9eb-41b8-ba7b-cf56c6e9803d	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ķegums Municipality	051	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6c4d061b-91f7-42a8-8cd5-7b05c6acc7ca	a6dc9c12-4000-4f62-8bcd-fef1976fd7e1	Ķekava Municipality	052	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3cd7faaa-db80-4c7e-b102-bc42e5ad8467	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Akkar Governorate	AK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
99cf8327-7fd1-452b-b1e0-0c13da0b3632	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Baalbek-Hermel Governorate	BH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6fa3d4bf-3ed0-406c-94a9-5f89a8f4d321	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Beirut Governorate	BA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bfc800e2-1f42-4bbe-b216-afec413543a4	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Beqaa Governorate	BI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9154fc4e-8533-49db-ae8c-7465149f42a4	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Mount Lebanon Governorate	JL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7ec0a936-c12d-49b0-be9c-5cef22138bd1	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	Nabatieh Governorate	NA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f3b67fcd-d63c-488c-8c7b-bcd8939e56da	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	North Governorate	AS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2a287df5-e236-4d2e-92d8-2857dd0179c0	d1a7f91c-2fe2-4486-9d08-d80b5d8788f8	South Governorate	JA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f543f224-a246-4754-968a-9b82bb4c6a18	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Berea District	D	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
342af3f3-6f66-4671-bf73-9d562e75e43f	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Butha-Buthe District	B	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fc5d59bd-49ec-4d32-9887-72be92ba6ac6	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Leribe District	C	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3f9ea22a-317c-45ee-8383-083cb1366c4c	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Mafeteng District	E	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ee8ae024-1ad8-4c2c-b521-f47e0c4caf2f	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Maseru District	A	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1f1e8049-ccad-4e85-88b0-a9b9d4d912d4	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Mohale's Hoek District	F	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
55394405-3cde-4c4b-b24a-2d408a8f28db	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Mokhotlong District	J	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ed98a614-db13-4181-be96-f91707731f31	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Qacha's Nek District	H	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3d4b6605-31fb-4a00-9d8c-82c20ec64ed2	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Quthing District	G	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e5ddd7f7-9638-4c22-9895-d78a4d8b757a	92e61d67-1a0b-45ff-95fb-fa6c36127ec1	Thaba-Tseka District	K	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
631efb99-f5e2-4e11-8509-954f7c669a02	8ad9ac47-7360-425e-b100-def064b5c153	Bomi County	BM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
83467b96-d194-4f93-96cf-0712f89d91ce	8ad9ac47-7360-425e-b100-def064b5c153	Bong County	BG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
914a88c1-3e3b-4c5a-81de-e8b890215658	8ad9ac47-7360-425e-b100-def064b5c153	Gbarpolu County	GP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
be4b25fa-94a7-4bb3-95fe-5f4b334b97c7	8ad9ac47-7360-425e-b100-def064b5c153	Grand Bassa County	GB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
90da4937-9a12-499b-b5cb-4d9b9ef04e60	8ad9ac47-7360-425e-b100-def064b5c153	Grand Cape Mount County	CM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
465b6a32-054f-4193-a404-68922ad26cbd	8ad9ac47-7360-425e-b100-def064b5c153	Grand Gedeh County	GG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
39f97c5a-8d03-4938-ad02-ffe68ae46dbe	8ad9ac47-7360-425e-b100-def064b5c153	Grand Kru County	GK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7265b92e-4310-4d18-a9bb-3dcb61a900e5	8ad9ac47-7360-425e-b100-def064b5c153	Lofa County	LO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a9b054f9-bd24-419d-9d7e-1799d88eeba0	8ad9ac47-7360-425e-b100-def064b5c153	Margibi County	MG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
80488da2-b69b-48a0-b623-6880d38f7cae	8ad9ac47-7360-425e-b100-def064b5c153	Maryland County	MY	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a2368846-59df-4677-afd0-38e1cefbd696	8ad9ac47-7360-425e-b100-def064b5c153	Montserrado County	MO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fd8bb98f-4817-41d3-82de-8ca03a5be915	8ad9ac47-7360-425e-b100-def064b5c153	Nimba	NI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
effc515f-d7cf-4068-b2a5-890b24e3d627	8ad9ac47-7360-425e-b100-def064b5c153	River Cess County	RI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8fa928c6-4e33-4fc4-be99-6571e7737578	8ad9ac47-7360-425e-b100-def064b5c153	River Gee County	RG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6f145413-4c55-462f-9269-766b29373687	8ad9ac47-7360-425e-b100-def064b5c153	Sinoe County	SI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
85059ed3-0606-4c35-9f58-f8ade13cbc65	4d2e629c-848d-497f-b345-82959acd8487	Al Wahat District	WA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e293b1aa-a42f-49a5-8b3a-c77043d09123	4d2e629c-848d-497f-b345-82959acd8487	Benghazi	BA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dbae9894-146a-412b-b3f2-a6b36ae2adc8	4d2e629c-848d-497f-b345-82959acd8487	Derna District	DR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c93d6e9b-90b1-472b-b0aa-3e9f61c71e4f	4d2e629c-848d-497f-b345-82959acd8487	Ghat District	GT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4009924f-f24e-4204-a947-c1c1b0aad30a	4d2e629c-848d-497f-b345-82959acd8487	Jabal al Akhdar	JA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f8f738b7-0f2a-4d0e-a30c-d8c1f566f211	4d2e629c-848d-497f-b345-82959acd8487	Jabal al Gharbi District	JG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a886d6cd-ef12-4684-bbff-dc276332b1f8	4d2e629c-848d-497f-b345-82959acd8487	Jafara	JI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8e3fa77b-b0d6-4783-b4d5-4a63ad6c606f	4d2e629c-848d-497f-b345-82959acd8487	Jufra	JU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8ea461c1-18a2-4582-9704-cd24ea08b23f	4d2e629c-848d-497f-b345-82959acd8487	Kufra District	KF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f0fe5eda-8a9f-4010-b290-3b21be5cb437	4d2e629c-848d-497f-b345-82959acd8487	Marj District	MJ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a2933213-e0a2-4a3a-94ba-17b4b3d481ea	4d2e629c-848d-497f-b345-82959acd8487	Misrata District	MI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
06ac4d75-3894-4468-819a-302b1d506cdd	4d2e629c-848d-497f-b345-82959acd8487	Murqub	MB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9fad3b27-0e84-4fb0-951c-b35e0bdb1510	4d2e629c-848d-497f-b345-82959acd8487	Murzuq District	MQ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2ec775d2-0aa9-48b2-a860-c852e2dbcae5	4d2e629c-848d-497f-b345-82959acd8487	Nalut District	NL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1477ceb9-a3ba-4bc6-88af-8424e0dc70ba	4d2e629c-848d-497f-b345-82959acd8487	Nuqat al Khams	NQ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5c20744f-f15c-4256-9c69-da85beb5c060	4d2e629c-848d-497f-b345-82959acd8487	Sabha District	SB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4dbf6572-2fe5-4ffe-a6d7-46921a10db63	4d2e629c-848d-497f-b345-82959acd8487	Sirte District	SR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a14386b5-7a91-48aa-a6ca-90def03b6fd7	4d2e629c-848d-497f-b345-82959acd8487	Tripoli District	TB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6aef4c49-6538-42b8-ba7d-a0eb14b76353	4d2e629c-848d-497f-b345-82959acd8487	Wadi al Hayaa District	WD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
849ea4c4-41a5-49bb-87ef-6843aba29356	4d2e629c-848d-497f-b345-82959acd8487	Wadi al Shatii District	WS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f59269f8-857c-457a-8a26-1a7bd13b6009	4d2e629c-848d-497f-b345-82959acd8487	Zawiya District	ZA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7d1bc9b3-cdcf-4464-9a18-35a13a529675	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Balzers	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b5a44e5e-4fbd-4c62-a0dd-c8293ec5fc81	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Eschen	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b558a8af-d461-4062-ac0f-2c734cc7455f	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Gamprin	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
398c27b9-0d53-425a-ae53-d757f747d510	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Mauren	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9d1e8db4-f249-49fe-8f82-413b70587735	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Planken	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f21a9587-5a4f-429d-912a-71db9ea84532	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Ruggell	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c7af42bc-5d1e-457f-9e08-1e88ba00dd19	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Schaan	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0abb61af-1904-47dd-bfcd-0360cbeb6829	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Schellenberg	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
19eedabe-e186-45e6-9253-4f52a7ae1d02	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Triesen	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c5a743ac-7db0-4dc0-93b2-062d966bce31	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Triesenberg	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
38c8bd8e-de10-441c-9212-45a5a693c3bf	0726044c-f9ec-4d95-92c4-3f6f904bfec3	Vaduz	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
420def0a-51ab-4b18-8b08-d343b4368908	33b5fc4a-499c-4d82-b829-f2fc99680209	Akmenė District Municipality	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a2825adc-c727-4ea7-843d-3d95d5f68c3a	33b5fc4a-499c-4d82-b829-f2fc99680209	Alytus City Municipality	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0491d521-2311-400c-9e10-02a158639adf	33b5fc4a-499c-4d82-b829-f2fc99680209	Alytus County	AL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7de5b80e-8a28-4c02-a9ce-48fa16613220	33b5fc4a-499c-4d82-b829-f2fc99680209	Alytus District Municipality	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f879f58c-e645-487f-866e-3751d28025dc	33b5fc4a-499c-4d82-b829-f2fc99680209	Birštonas Municipality	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c7f2806c-231c-426e-99c7-17c12b27cd76	33b5fc4a-499c-4d82-b829-f2fc99680209	Biržai District Municipality	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
107c32bd-4815-433b-bbc6-1f095e3dd982	33b5fc4a-499c-4d82-b829-f2fc99680209	Druskininkai municipality	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d29a6d23-b2b6-4161-9bb7-95d9d73aedb9	33b5fc4a-499c-4d82-b829-f2fc99680209	Elektrėnai municipality	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
226559a9-4a45-452b-9a2e-92f7dd688338	33b5fc4a-499c-4d82-b829-f2fc99680209	Ignalina District Municipality	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
22fefd70-b786-4672-a6e9-e8c31a05f1a7	33b5fc4a-499c-4d82-b829-f2fc99680209	Jonava District Municipality	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
244b75fb-998a-4683-a017-eef13efcaec6	33b5fc4a-499c-4d82-b829-f2fc99680209	Joniškis District Municipality	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ea15e7a1-a6d3-4b81-bae0-8ad7808f9fc4	33b5fc4a-499c-4d82-b829-f2fc99680209	Jurbarkas District Municipality	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ac2f7590-5337-4da9-a2ee-a034d308e632	33b5fc4a-499c-4d82-b829-f2fc99680209	Kaišiadorys District Municipality	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9fb0fdcd-fac0-4fab-8dd9-5530fb0085ee	33b5fc4a-499c-4d82-b829-f2fc99680209	Kalvarija municipality	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
138584c8-06d3-4721-bbad-431e572826d1	33b5fc4a-499c-4d82-b829-f2fc99680209	Kaunas City Municipality	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
673e56c1-2538-421a-9617-d7a5040f7fd6	33b5fc4a-499c-4d82-b829-f2fc99680209	Kaunas County	KU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6f41eae4-adbf-49a3-a344-026f00d1ec17	33b5fc4a-499c-4d82-b829-f2fc99680209	Kaunas District Municipality	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4bf0997e-6e79-419b-bb24-ff1c83236c93	33b5fc4a-499c-4d82-b829-f2fc99680209	Kazlų Rūda municipality	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
82e32305-e333-4b97-b538-5badbdd4fc05	33b5fc4a-499c-4d82-b829-f2fc99680209	Kelmė District Municipality	19	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1e1a4758-3558-4412-ab35-f3c3b78a3541	33b5fc4a-499c-4d82-b829-f2fc99680209	Klaipeda City Municipality	20	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9ada3984-420e-41ce-8254-034a43edb6ea	33b5fc4a-499c-4d82-b829-f2fc99680209	Klaipėda County	KL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
229a7972-ef9a-4e24-8841-83c4827fca95	33b5fc4a-499c-4d82-b829-f2fc99680209	Klaipėda District Municipality	21	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3c0a56fe-dcff-4a68-b256-4b78fa1c2a75	33b5fc4a-499c-4d82-b829-f2fc99680209	Kretinga District Municipality	22	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0e447d3f-71cb-4cf3-a791-5bb95ff619b9	33b5fc4a-499c-4d82-b829-f2fc99680209	Kupiškis District Municipality	23	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
69063011-6ca9-4df5-a88f-814d4b6e3140	33b5fc4a-499c-4d82-b829-f2fc99680209	Kėdainiai District Municipality	18	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
10641e65-4b52-41f7-9504-5f652081faf1	33b5fc4a-499c-4d82-b829-f2fc99680209	Lazdijai District Municipality	24	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fa049d96-e730-4bee-b24f-d3a9258edb4d	33b5fc4a-499c-4d82-b829-f2fc99680209	Marijampolė County	MR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
451c1631-02c4-4079-955a-d50bcb907a9b	33b5fc4a-499c-4d82-b829-f2fc99680209	Marijampolė Municipality	25	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
05fde415-57bc-47d9-ae39-1e01347c969b	33b5fc4a-499c-4d82-b829-f2fc99680209	Mažeikiai District Municipality	26	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ff7037b4-e09f-46f4-8855-2ce6980c19c8	33b5fc4a-499c-4d82-b829-f2fc99680209	Molėtai District Municipality	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
403c2860-c59f-4d9f-a6fa-db78957899f8	33b5fc4a-499c-4d82-b829-f2fc99680209	Neringa Municipality	28	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d661ead6-6d97-4f82-a420-27d097019b7a	33b5fc4a-499c-4d82-b829-f2fc99680209	Pagėgiai municipality	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
504094e0-6c2a-47ba-87bb-ea9a1d5eb588	33b5fc4a-499c-4d82-b829-f2fc99680209	Pakruojis District Municipality	30	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7df55694-10f3-4d87-85f1-1f7888f19d5c	33b5fc4a-499c-4d82-b829-f2fc99680209	Palanga City Municipality	31	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e9999286-3ba7-48c8-9327-4590fbec92e9	33b5fc4a-499c-4d82-b829-f2fc99680209	Panevėžys City Municipality	32	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
761d575f-a7c4-423a-9607-048439a1ba8a	33b5fc4a-499c-4d82-b829-f2fc99680209	Panevėžys County	PN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f0f54de8-bc30-4d24-a2e9-c90b1b53faf0	33b5fc4a-499c-4d82-b829-f2fc99680209	Panevėžys District Municipality	33	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a434bce3-f3eb-4ca4-b607-7aaf67738e5b	33b5fc4a-499c-4d82-b829-f2fc99680209	Pasvalys District Municipality	34	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
61f9a6c1-2fa5-45ba-abf6-d64206b91cc6	33b5fc4a-499c-4d82-b829-f2fc99680209	Plungė District Municipality	35	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3291d819-972c-403c-8852-54b661ea677f	33b5fc4a-499c-4d82-b829-f2fc99680209	Prienai District Municipality	36	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e8988669-9cbc-448d-8eb1-ada92e1b0746	33b5fc4a-499c-4d82-b829-f2fc99680209	Radviliškis District Municipality	37	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c93341bd-2463-45b6-bd32-0f445ceb26f0	33b5fc4a-499c-4d82-b829-f2fc99680209	Raseiniai District Municipality	38	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
753e81b6-937c-4267-8551-db863ff2d4f1	33b5fc4a-499c-4d82-b829-f2fc99680209	Rietavas municipality	39	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
275e97ef-8e6b-40e8-b4c5-cb8dd8ebf105	33b5fc4a-499c-4d82-b829-f2fc99680209	Rokiškis District Municipality	40	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e14aacab-af14-4e7a-a8d9-ae617cde27d9	33b5fc4a-499c-4d82-b829-f2fc99680209	Skuodas District Municipality	48	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
508e8433-788f-40ce-9981-9824be3b931a	33b5fc4a-499c-4d82-b829-f2fc99680209	Tauragė County	TA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8d44d0b3-a9df-4c51-b376-1241e3c12457	33b5fc4a-499c-4d82-b829-f2fc99680209	Tauragė District Municipality	50	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c8213f08-7ea6-4913-afcf-1e1364ac71b2	33b5fc4a-499c-4d82-b829-f2fc99680209	Telšiai County	TE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fa86d1b7-8782-4609-9fd0-67f6d6fc1c39	33b5fc4a-499c-4d82-b829-f2fc99680209	Telšiai District Municipality	51	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c64c79c6-cd31-4123-b8fb-9378ce754df7	33b5fc4a-499c-4d82-b829-f2fc99680209	Trakai District Municipality	52	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cba69b66-776e-4777-97ff-5712e5c26109	33b5fc4a-499c-4d82-b829-f2fc99680209	Ukmergė District Municipality	53	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
39a077d3-d9b1-4509-a213-5440e88eb83e	33b5fc4a-499c-4d82-b829-f2fc99680209	Utena County	UT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fbe49fb8-5a2f-40a1-b1ba-cc5f708cda81	33b5fc4a-499c-4d82-b829-f2fc99680209	Utena District Municipality	54	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
98b7a616-6192-45ff-8e3b-6d62e03f3e00	33b5fc4a-499c-4d82-b829-f2fc99680209	Varėna District Municipality	55	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d9e0a9f9-e5a9-41ff-81ce-e13cbf76ec99	33b5fc4a-499c-4d82-b829-f2fc99680209	Vilkaviškis District Municipality	56	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ef8710da-4dc4-426a-99ec-c7f11ad2c30c	33b5fc4a-499c-4d82-b829-f2fc99680209	Vilnius City Municipality	57	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2c7c606f-af5b-4347-aa61-2fa7a99d96cc	33b5fc4a-499c-4d82-b829-f2fc99680209	Vilnius County	VL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dddc5c79-a667-436b-bbf6-be0d1419ede0	33b5fc4a-499c-4d82-b829-f2fc99680209	Vilnius District Municipality	58	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de2d0fea-d2d7-4027-85f4-951fd0598e65	33b5fc4a-499c-4d82-b829-f2fc99680209	Visaginas Municipality	59	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
44fbf96c-8b43-40fe-b668-04c26d7f805c	33b5fc4a-499c-4d82-b829-f2fc99680209	Zarasai District Municipality	60	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1bb9df50-b13f-4ee3-b57f-ed859095c8e0	33b5fc4a-499c-4d82-b829-f2fc99680209	Šakiai District Municipality	41	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
42bd2a13-35e2-4dac-b06f-4c3ce84bb0bc	33b5fc4a-499c-4d82-b829-f2fc99680209	Šalčininkai District Municipality	42	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6a52c8ba-a7f7-4cff-ace7-d1b82a3dce56	33b5fc4a-499c-4d82-b829-f2fc99680209	Šiauliai City Municipality	43	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
48bd718b-f733-49fc-ae5b-4a7ad29dfa71	33b5fc4a-499c-4d82-b829-f2fc99680209	Šiauliai County	SA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
23836bec-eb05-4769-90a3-24a4fb9badd5	33b5fc4a-499c-4d82-b829-f2fc99680209	Šiauliai District Municipality	44	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f7481339-1cac-4984-9e9b-38cbbad73fae	33b5fc4a-499c-4d82-b829-f2fc99680209	Šilalė District Municipality	45	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
57283c54-7f69-4b39-8369-f7b556dd9637	33b5fc4a-499c-4d82-b829-f2fc99680209	Šilutė District Municipality	46	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
57a6363c-597f-4b5d-8a54-a56849ec58dd	33b5fc4a-499c-4d82-b829-f2fc99680209	Širvintos District Municipality	47	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d69b1a2f-5792-4cff-aae1-abc1d1ee48df	33b5fc4a-499c-4d82-b829-f2fc99680209	Švenčionys District Municipality	49	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cace6bb9-151b-4b57-a890-f563cee0ea20	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Capellen	CA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
774b44cf-3371-41f0-a741-8cb726362b05	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Clervaux	CL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e3608fa2-d14a-4430-ad12-eb1fb991aa6b	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Diekirch	DI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
483fa0be-2c68-4387-80fe-441c722cbc10	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Echternach	EC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1d1aa45c-3a8b-4c89-a47e-a0eeb63676f6	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Esch-sur-Alzette	ES	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cec32492-6e2d-45cf-84ed-4020869227c9	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Grevenmacher	GR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c7fc1b42-711d-4bb0-8fe6-d25e38750706	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Luxembourg	LU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
81bff1c9-7120-4393-b76d-04e1967e8da8	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Mersch	ME	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d4dd7708-1dbf-4768-bbe7-d8af4795603f	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Redange	RD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
540294d8-fb07-46bb-b5c2-a1b8b0cbf609	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Remich	RM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fd243089-7e30-44c1-919e-30bb5af67568	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Vianden	VD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
177b4cc7-240b-46c7-83ab-06786086ad3c	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Canton of Wiltz	WI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7123cb52-e2f6-492e-82c4-d7f378325c19	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Diekirch District	D	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1ef6aa7c-e2d9-4590-8833-80ffec5cae81	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Grevenmacher District	G	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
17a31059-b766-4c58-8927-5efd0ceffcdd	76b977a7-8c94-4b9e-a6e9-825b2135a1f2	Luxembourg District	L	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9215c765-253c-4c24-b7cd-2dea073e78b7	c8d9969e-493b-48b4-93a0-e928498d86f9	Aerodrom Municipality	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
608dd6ef-9a0a-44a8-acfe-2fb99ad6643c	c8d9969e-493b-48b4-93a0-e928498d86f9	Aračinovo Municipality	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
82ebd5af-3473-456e-a466-d8d752de3fb6	c8d9969e-493b-48b4-93a0-e928498d86f9	Berovo Municipality	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0c5598e3-861b-4f42-bca4-068f7ea6fb16	c8d9969e-493b-48b4-93a0-e928498d86f9	Bitola Municipality	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b4258347-ec08-45d1-9fc7-6af3cf7e62bd	c8d9969e-493b-48b4-93a0-e928498d86f9	Bogdanci Municipality	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
aba0436a-d08a-4313-b0e6-725e83797c0c	c8d9969e-493b-48b4-93a0-e928498d86f9	Bogovinje Municipality	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ab122715-6bde-4aae-8638-91c514d71d7e	c8d9969e-493b-48b4-93a0-e928498d86f9	Bosilovo Municipality	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
27e35644-d920-499b-ba88-951a47c3c9ab	c8d9969e-493b-48b4-93a0-e928498d86f9	Brvenica Municipality	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d9fec7ab-9366-46dd-91bc-9513af77f820	c8d9969e-493b-48b4-93a0-e928498d86f9	Butel Municipality	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b36b37d5-6eeb-4af9-9426-7c14a8fd3c7f	c8d9969e-493b-48b4-93a0-e928498d86f9	Centar Municipality	77	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e1065c03-247c-4e2e-9aae-e54704758c4e	c8d9969e-493b-48b4-93a0-e928498d86f9	Centar Župa Municipality	78	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6f826502-8df1-4bcc-bd25-44c40fd5f06b	c8d9969e-493b-48b4-93a0-e928498d86f9	Debarca Municipality	22	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
49c373ed-6710-48e4-998e-c1cb53beb104	c8d9969e-493b-48b4-93a0-e928498d86f9	Delčevo Municipality	23	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3a3aa420-00bf-462d-822f-fc3342d42180	c8d9969e-493b-48b4-93a0-e928498d86f9	Demir Hisar Municipality	25	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7927b090-7655-416c-a9e5-b8963ef3b52c	c8d9969e-493b-48b4-93a0-e928498d86f9	Demir Kapija Municipality	24	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
50dcd403-97da-4c95-9c2e-3d112f9d2e82	c8d9969e-493b-48b4-93a0-e928498d86f9	Dojran Municipality	26	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
88961374-c5a7-4061-95b6-3dfe2c701b65	c8d9969e-493b-48b4-93a0-e928498d86f9	Dolneni Municipality	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4bd98f12-0c09-4b80-84c7-6d3ea9aa7d92	c8d9969e-493b-48b4-93a0-e928498d86f9	Drugovo Municipality	28	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a3668599-d77f-4660-b70d-8de2c3045579	c8d9969e-493b-48b4-93a0-e928498d86f9	Gazi Baba Municipality	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
487ca4f8-e2ec-41aa-a464-f7653e0758df	c8d9969e-493b-48b4-93a0-e928498d86f9	Gevgelija Municipality	18	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
64a01498-3465-4cb7-8a4d-f633511d0db5	c8d9969e-493b-48b4-93a0-e928498d86f9	Gjorče Petrov Municipality	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2c78e291-d829-4e2f-8a34-4822509810ba	c8d9969e-493b-48b4-93a0-e928498d86f9	Gostivar Municipality	19	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5ab6ef08-cb21-482a-802f-a2c394e927d6	c8d9969e-493b-48b4-93a0-e928498d86f9	Gradsko Municipality	20	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
21fc5054-3dd7-4c08-bf18-bdaf27c065cd	c8d9969e-493b-48b4-93a0-e928498d86f9	Greater Skopje	85	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
92c6396d-0186-4751-9c12-5eb8b7469877	c8d9969e-493b-48b4-93a0-e928498d86f9	Ilinden Municipality	34	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7f534800-893e-42bb-b4c2-2574b06030f3	c8d9969e-493b-48b4-93a0-e928498d86f9	Jegunovce Municipality	35	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
711b596a-87b3-4a29-9441-f03563cc937d	c8d9969e-493b-48b4-93a0-e928498d86f9	Karbinci	37	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de0f6d52-27b2-4a1f-9e75-1f19d99e9df5	c8d9969e-493b-48b4-93a0-e928498d86f9	Karpoš Municipality	38	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
02a8c90f-b2ee-468b-a496-3ffb142218e5	c8d9969e-493b-48b4-93a0-e928498d86f9	Kavadarci Municipality	36	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1fa63680-f50a-4655-b34b-ba4350ac61ee	c8d9969e-493b-48b4-93a0-e928498d86f9	Kisela Voda Municipality	39	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
86ad8c30-1a88-44bb-8958-af32049ce198	c8d9969e-493b-48b4-93a0-e928498d86f9	Kičevo Municipality	40	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
870c33dd-968d-4676-a266-42bbe5713469	c8d9969e-493b-48b4-93a0-e928498d86f9	Konče Municipality	41	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e7a3a482-1324-4d45-a48f-dcf3c96ef635	c8d9969e-493b-48b4-93a0-e928498d86f9	Kočani Municipality	42	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e3277595-0b1f-4631-b6b1-3ea7625d685d	c8d9969e-493b-48b4-93a0-e928498d86f9	Kratovo Municipality	43	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
795aacb4-b255-43a6-8ad2-bf689c505515	c8d9969e-493b-48b4-93a0-e928498d86f9	Kriva Palanka Municipality	44	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b9ca1c7e-c306-421f-82bb-7ee65c0fc932	c8d9969e-493b-48b4-93a0-e928498d86f9	Krivogaštani Municipality	45	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e8249f31-411e-4c62-b6f7-7ea3ebbf3adc	c8d9969e-493b-48b4-93a0-e928498d86f9	Kruševo Municipality	46	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8bf39f81-52aa-4ccf-a4a8-7d5c9709375f	c8d9969e-493b-48b4-93a0-e928498d86f9	Kumanovo Municipality	47	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2d7b1e98-9dd8-444f-9338-25039206ec02	c8d9969e-493b-48b4-93a0-e928498d86f9	Lipkovo Municipality	48	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
699cce4e-a410-49de-a688-1e09b858790b	c8d9969e-493b-48b4-93a0-e928498d86f9	Lozovo Municipality	49	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3a6a6e29-f710-4689-a977-66e550700025	c8d9969e-493b-48b4-93a0-e928498d86f9	Makedonska Kamenica Municipality	51	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b8ffc5ca-7969-485d-94ef-1f6ae3afb779	c8d9969e-493b-48b4-93a0-e928498d86f9	Makedonski Brod Municipality	52	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0ca405ed-e221-49fb-b93a-d253e51e2806	c8d9969e-493b-48b4-93a0-e928498d86f9	Mavrovo and Rostuša Municipality	50	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
aeb2a473-de76-4009-b71e-a776b2b82f7e	c8d9969e-493b-48b4-93a0-e928498d86f9	Mogila Municipality	53	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e9f873c8-6636-478d-9a52-6984bcc452a1	c8d9969e-493b-48b4-93a0-e928498d86f9	Negotino Municipality	54	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de449d38-3093-4a67-897f-5a4ae173fa3c	c8d9969e-493b-48b4-93a0-e928498d86f9	Novaci Municipality	55	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9003b71b-2355-459a-a3aa-853d6a0c4867	c8d9969e-493b-48b4-93a0-e928498d86f9	Novo Selo Municipality	56	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bc2c12f2-1bba-4ea5-bcf8-56e8e178c160	c8d9969e-493b-48b4-93a0-e928498d86f9	Ohrid Municipality	58	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c0cf6178-0d28-456d-a0c3-c493e21f10d3	c8d9969e-493b-48b4-93a0-e928498d86f9	Oslomej Municipality	57	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e0a4be23-3ea7-467f-b2b4-97ad2cad43bd	c8d9969e-493b-48b4-93a0-e928498d86f9	Pehčevo Municipality	60	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
18c3eb85-c60e-4afa-a8ee-a363b0903f00	c8d9969e-493b-48b4-93a0-e928498d86f9	Petrovec Municipality	59	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c07285ba-6cd0-4e89-90cf-20799ba090bd	c8d9969e-493b-48b4-93a0-e928498d86f9	Plasnica Municipality	61	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
971a8fd2-7024-4450-bde7-3a65e21a9e42	c8d9969e-493b-48b4-93a0-e928498d86f9	Prilep Municipality	62	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6f9500ee-b1cb-4b1c-b0e5-5f3db2700e56	c8d9969e-493b-48b4-93a0-e928498d86f9	Probištip Municipality	63	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
37d9fa63-e381-4611-a43a-1d1557cb22eb	c8d9969e-493b-48b4-93a0-e928498d86f9	Radoviš Municipality	64	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
49b67445-dfe2-47ef-ae41-c61604d01fef	c8d9969e-493b-48b4-93a0-e928498d86f9	Rankovce Municipality	65	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f33cb739-04e3-45d8-8ad6-90fe64c2f51a	c8d9969e-493b-48b4-93a0-e928498d86f9	Resen Municipality	66	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0606f843-420d-4a43-bd20-d43f1dc85a73	c8d9969e-493b-48b4-93a0-e928498d86f9	Rosoman Municipality	67	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
760ce9e8-fec9-4dfa-b29e-6921779b145e	c8d9969e-493b-48b4-93a0-e928498d86f9	Saraj Municipality	68	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1bbcafa2-4dff-4a32-a280-2ddbf1ae8bb3	c8d9969e-493b-48b4-93a0-e928498d86f9	Sopište Municipality	70	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1b86bac6-5cfb-4193-8092-b3336ee8debe	c8d9969e-493b-48b4-93a0-e928498d86f9	Staro Nagoričane Municipality	71	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f81fdbf1-9e84-4467-9bed-cae38556c361	c8d9969e-493b-48b4-93a0-e928498d86f9	Struga Municipality	72	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8a199788-af70-47e7-a7bb-64cc5c7cb48c	c8d9969e-493b-48b4-93a0-e928498d86f9	Strumica Municipality	73	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
25d40258-edfe-4ff3-b6c1-ca1e95480ba2	c8d9969e-493b-48b4-93a0-e928498d86f9	Studeničani Municipality	74	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
70718b76-4239-4b6f-9883-af786483615d	c8d9969e-493b-48b4-93a0-e928498d86f9	Sveti Nikole Municipality	69	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0dfee77a-b54c-49ec-9df4-56fc63db6df2	c8d9969e-493b-48b4-93a0-e928498d86f9	Tearce Municipality	75	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a8304858-c3a5-4b1a-b573-c1e94231a635	c8d9969e-493b-48b4-93a0-e928498d86f9	Tetovo Municipality	76	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
44a9ef51-f3bb-4177-84c2-451d4e8d54a5	c8d9969e-493b-48b4-93a0-e928498d86f9	Valandovo Municipality	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b3adcfb7-ae40-4d53-be0f-57f8d08ab1ec	c8d9969e-493b-48b4-93a0-e928498d86f9	Vasilevo Municipality	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2c992814-ea5e-4b2a-b460-146c0bb39c74	c8d9969e-493b-48b4-93a0-e928498d86f9	Veles Municipality	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1417db8e-8a0b-4d6b-9850-981ed3f28b36	c8d9969e-493b-48b4-93a0-e928498d86f9	Vevčani Municipality	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
240319f6-aa7e-4558-950b-8cb8161388c9	c8d9969e-493b-48b4-93a0-e928498d86f9	Vinica Municipality	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b191a3c8-df9d-443c-8530-48a6f103f0e5	c8d9969e-493b-48b4-93a0-e928498d86f9	Vraneštica Municipality	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
199f4d2f-c081-43d2-a401-1848cd3169e7	c8d9969e-493b-48b4-93a0-e928498d86f9	Vrapčište Municipality	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6cad2bca-151e-4105-ab05-927d00acc7bd	c8d9969e-493b-48b4-93a0-e928498d86f9	Zajas Municipality	31	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7a5740da-f577-412b-af01-0c3db2518274	c8d9969e-493b-48b4-93a0-e928498d86f9	Zelenikovo Municipality	32	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a08310b2-747d-4597-8133-17e7bdf89c3c	c8d9969e-493b-48b4-93a0-e928498d86f9	Zrnovci Municipality	33	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
95eae4db-b72a-463b-8ee8-c22ac637bcb7	c8d9969e-493b-48b4-93a0-e928498d86f9	Čair Municipality	79	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bbcc67e9-63f6-43f3-95ca-dc5bafd58c9d	c8d9969e-493b-48b4-93a0-e928498d86f9	Čaška Municipality	80	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cb9b8d2e-6ce7-4e87-b3fc-12925d5e57de	c8d9969e-493b-48b4-93a0-e928498d86f9	Češinovo-Obleševo Municipality	81	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fe17feb5-b13f-4b8e-b7e7-3eeca38bc350	c8d9969e-493b-48b4-93a0-e928498d86f9	Čučer-Sandevo Municipality	82	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ab4540cf-c9a2-4b81-80df-93dfbff079f1	c8d9969e-493b-48b4-93a0-e928498d86f9	Štip Municipality	83	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
01f247ce-8cd8-4a0c-9a22-d4f043649bde	c8d9969e-493b-48b4-93a0-e928498d86f9	Šuto Orizari Municipality	84	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
205fd488-d37e-470f-aa46-c3711b483e12	c8d9969e-493b-48b4-93a0-e928498d86f9	Želino Municipality	30	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2acb26d9-bf16-4eb8-8cb2-c93560c14290	5cac5c76-8379-4fae-a6dc-c29978a7cd34	Antananarivo Province	T	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
47f0dc8c-5ecc-42d2-b4c7-9d655e0e95f8	5cac5c76-8379-4fae-a6dc-c29978a7cd34	Antsiranana Province	D	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
256e3817-37bb-4698-9d26-8c3e3a74f07f	5cac5c76-8379-4fae-a6dc-c29978a7cd34	Fianarantsoa Province	F	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f779c1a3-a326-4637-bb5e-65f39e976dd1	5cac5c76-8379-4fae-a6dc-c29978a7cd34	Mahajanga Province	M	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5a17f4c3-3e85-4206-af4d-332346e0230c	5cac5c76-8379-4fae-a6dc-c29978a7cd34	Toamasina Province	A	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dcf6feba-02d0-4dd8-be6c-a25486653831	5cac5c76-8379-4fae-a6dc-c29978a7cd34	Toliara Province	U	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
40121bcc-e260-484b-9865-794a5068a2c3	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Balaka District	BA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7351ab68-4e6e-47d9-86fa-16732ebea039	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Blantyre District	BL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a479eb65-7032-4b48-bb84-0cfe5c6e1ab8	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Central Region	C	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f0671797-16f6-4f52-8940-abd0d6d1bff9	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Chikwawa District	CK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
72fbf328-0d38-4637-937f-140c40fc29fc	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Chiradzulu District	CR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
372baba7-8f1a-483f-85fe-b3742468e1ef	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Chitipa district	CT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1a30c4e4-9f67-4bf3-b8cf-d57c62aff565	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Dedza District	DE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1b875983-c86d-4ea4-8930-40dab750f084	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Dowa District	DO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c8c13d66-79b5-4b0f-91b6-73e07f0c7d39	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Karonga District	KR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e9fc7bcc-cc6d-41ff-8217-27450a0a7f82	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Kasungu District	KS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9804e1f6-15d5-4149-a880-514d42f0a293	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Likoma District	LK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
924d166e-b472-4e9c-a457-77ade28d0e46	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Lilongwe District	LI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6b632cda-50fc-40ad-9b87-71e55663e8e4	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Machinga District	MH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b376ce05-f49c-4577-8e77-738edb3d30a1	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Mangochi District	MG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
19d6a391-c704-4d52-b52a-adc47ee52e4e	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Mchinji District	MC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ed943bd8-7ef3-4828-b272-10cda72f8f54	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Mulanje District	MU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
75cab30f-91a2-42e7-8158-bbee0cb8a163	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Mwanza District	MW	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
371cc67f-f403-4ee5-8292-04973ea26d4f	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Mzimba District	MZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7ed0d226-fb06-46cb-8ab5-42b0d853c3ee	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Nkhata Bay District	NB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
58c3c33a-ed2b-4bbc-a005-828c478142e9	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Nkhotakota District	NK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d820b5dc-8715-43b1-8ec7-36534668af92	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Northern Region	N	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ea26340d-030a-4e33-a275-6f5891b6496f	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Nsanje District	NS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b82e1442-a3ec-46b6-b98b-909440d556f3	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Ntcheu District	NU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
977412b0-ce87-4c25-b6ed-d69a33c2365a	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Ntchisi District	NI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a60499da-6613-416c-9fce-c01bc4161f7c	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Phalombe District	PH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c62d870c-4f36-49d2-b136-04ae984fc964	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Rumphi District	RU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
556635d1-f1ac-4a31-8b1d-e00b0881df9d	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Salima District	SA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7ccc9ebe-20ce-4cbe-875d-9c0fe727949c	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Southern Region	S	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2ce7bd86-9d16-469a-9c90-134718d7d288	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Thyolo District	TH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a1a292a9-1afe-418b-9a9c-66a23248d356	a9120fe8-9c20-4da9-8b31-33cb6a43481d	Zomba District	ZO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
29e5dabd-a066-430e-9442-bd7fc716594a	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Johor	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9b080cb0-ee66-4419-8528-945e164a5eb6	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Kedah	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
47cdc953-7250-45fd-b872-30dade0a4a43	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Kelantan	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
141af043-5655-4f7e-8514-ae9891a566a3	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Kuala Lumpur	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
843a7122-2f5e-4f33-9ca0-5e56b0d62ed2	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Labuan	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9fb6a3df-95b2-461e-a95c-b346f179b777	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Malacca	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5c6c2d66-a6a0-472c-a83d-cc985864c2bf	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Negeri Sembilan	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9a7dcd1f-ca4b-4ad7-a129-4e15314b77c0	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Pahang	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
91011881-d416-4dfc-ae18-e0c07c9f8d44	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Penang	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6b45acc9-1d57-44c4-8f9a-e37be3e7e643	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Perak	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d9c0c6bb-b0fb-467d-a503-d65999cecc92	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Perlis	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bd8a8ce0-a33b-44be-a0b4-eb2759cd6153	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Putrajaya	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b35bb3ea-fe37-4b41-8f1f-9b0681d42402	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Sabah	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
da830387-00e1-4971-92b4-c3110d606328	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Sarawak	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0b786459-0c50-4c8c-b3ef-6ed30e12f69c	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Selangor	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cb9166b5-99b2-4b9c-ba16-28a3d9bdb1bb	2096bf49-10bd-45d7-9c24-9ba0a17ccba9	Terengganu	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b0723fd4-04cc-4a3e-a642-287adafa7721	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Addu Atoll	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c0c4dd63-dc69-4029-8856-dae788146264	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Alif Alif Atoll	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0a374efa-7b57-4ca1-8987-e0473226caf9	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Alif Dhaal Atoll	00	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1b5f74fc-c7f2-460f-a4da-8683d496f817	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Central Province	CE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b5d761b5-381f-4b32-aee6-f392ad4f3d4f	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Dhaalu Atoll	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c2f26823-60ff-4739-8a58-fd043250c73e	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Faafu Atoll	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5e7df0e3-1c36-44f0-9477-ef4838c634e8	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Gaafu Alif Atoll	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c437c60d-40c4-481d-91d8-e8d2f7bab9dd	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Gaafu Dhaalu Atoll	28	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f6ea2e89-1dab-4e0a-9eed-ba72a6375d07	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Gnaviyani Atoll	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
093908b6-1fab-4b4d-83c8-5a8602b84fd2	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Haa Alif Atoll	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8dc62bd6-5697-4605-a17f-5a3b1c6851df	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Haa Dhaalu Atoll	23	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
398f7352-9467-4cf9-a27c-dc3cc0961104	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Kaafu Atoll	26	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
69ff3c95-8819-4d0b-ab4f-f415dd7cde49	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Laamu Atoll	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c4b7d89e-44c2-46d4-8482-75ad3b9c7df9	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Lhaviyani Atoll	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1071a2b6-8b22-451f-86e6-aab48d40a87c	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Malé	MLE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f518e66d-08e6-4d27-8514-97d9ce53384a	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Meemu Atoll	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
504ab439-0a6b-45a9-98c6-713a4b2d2f1c	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Noonu Atoll	25	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
027efb61-478d-45f5-bc4a-daf49cf1804b	7d510705-5c1e-4fed-8010-9f9cc8a384aa	North Central Province	NC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
07a6375f-8a9d-4ab0-85e0-1355f1bfb327	7d510705-5c1e-4fed-8010-9f9cc8a384aa	North Province	NO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dc4fb094-dfb8-4e94-a08a-cb27cc8e40a5	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Raa Atoll	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
05e71fe0-8dd2-4387-8e17-8f13bc4a876a	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Shaviyani Atoll	24	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4094a114-4c8b-45ef-97ab-18d1f400eba6	7d510705-5c1e-4fed-8010-9f9cc8a384aa	South Central Province	SC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ec9e41e0-8ae3-4e0e-be5f-bbad6d91bbbc	7d510705-5c1e-4fed-8010-9f9cc8a384aa	South Province	SU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
49864f72-6b8a-4dd7-8504-4bf838d66f1e	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Thaa Atoll	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1ca6ab42-b0fa-4f25-97b9-fa5c23aa575f	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Upper South Province	US	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f79c242d-c88e-4e78-b479-e71801d549c4	7d510705-5c1e-4fed-8010-9f9cc8a384aa	Vaavu Atoll	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f6f72d56-81ba-4c66-928a-7f6582f87236	73015c4b-11cf-4112-b270-70bd3212dd9b	Bamako	BKO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f4e20b04-b3b6-4d40-9589-a865dc4ff72a	73015c4b-11cf-4112-b270-70bd3212dd9b	Gao Region	7	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
948842bc-d788-47f6-848b-4fbce2d1ae33	73015c4b-11cf-4112-b270-70bd3212dd9b	Kayes Region	1	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
df995ac2-78d2-4001-a479-adcf14ce7eb2	73015c4b-11cf-4112-b270-70bd3212dd9b	Kidal Region	8	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
924991f6-9969-4f04-a660-7618b85d75df	73015c4b-11cf-4112-b270-70bd3212dd9b	Koulikoro Region	2	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fe2f30aa-a50c-4c9d-bc46-e3306545a67e	73015c4b-11cf-4112-b270-70bd3212dd9b	Mopti Region	5	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c880ef0c-9656-4d77-8799-d1c8c02df5ec	73015c4b-11cf-4112-b270-70bd3212dd9b	Ménaka Region	9	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1e1dfdaf-c1cd-45ab-89f8-f93fbc93a5d6	73015c4b-11cf-4112-b270-70bd3212dd9b	Sikasso Region	3	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
61963220-1531-4f05-ab56-0b8866e6d425	73015c4b-11cf-4112-b270-70bd3212dd9b	Ségou Region	4	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a9e37fbb-c2ab-4324-925a-1f3092bca7f8	73015c4b-11cf-4112-b270-70bd3212dd9b	Taoudénit Region	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9f2325fc-488c-42d2-b605-5a0ddedf3fac	73015c4b-11cf-4112-b270-70bd3212dd9b	Tombouctou Region	6	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9d0eed23-deef-4e94-bef9-bbead144932d	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Attard	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a4549907-2e7d-4a34-a7f4-138f9dee3e80	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Balzan	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8695d19f-1bd7-4903-b632-b62233be2749	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Birgu	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
31003cf9-0743-48f4-96f7-92968887abd8	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Birkirkara	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
696dc548-2d2c-4703-ab17-6b001dd69091	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Birżebbuġa	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4f289c83-c3f4-499a-8288-e74a1a9a6a8d	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Cospicua	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2cc39ac7-04ad-4153-9411-bb08bf76921b	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Dingli	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8afe93b0-27b0-4d56-98ca-643dc8158665	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Fgura	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
912de5a1-e06b-425a-b8f7-f23122eca269	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Floriana	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c6015e29-50b8-4cea-a8ac-38b3456a54f2	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Fontana	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5277caaf-3ded-416a-a2ef-3ce9bd1a3303	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Gudja	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
35b8c85f-b214-4be7-8614-5b863e3f29ea	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Għajnsielem	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a2bb623e-88f2-450e-9905-5251d218c2e3	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Għarb	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
185d9c34-21fa-43bf-af90-849fbdb93d19	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Għargħur	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c760fe99-f26c-4ad2-bdba-a31012c937b7	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Għasri	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
25575207-c8de-445b-bae1-b4df52e93c99	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Għaxaq	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a95462ef-302d-4e03-8bd6-1a15de1382de	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Gżira	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cd64af24-8549-49b8-9188-4570f5a3dae2	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Iklin	19	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6e2e1ac1-a1f8-4bbf-97e4-603b8756ce27	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Kalkara	21	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
37ac8f2d-62ff-4cf9-93a0-1b29a48de44f	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Kerċem	22	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5f2d0218-5f29-4903-b61c-053b61ad5668	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Kirkop	23	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ea0f1396-7481-49a9-b3f0-ee45b520c76c	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Lija	24	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
11f8ccb3-def0-41dd-8e3e-c2ac35dd50ae	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Luqa	25	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6e8cbedd-5f3f-47e5-a7de-31187f977135	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Marsa	26	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b87698d5-195b-4b96-bb3a-e7f9b1df1740	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Marsaskala	27	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
70c32928-227a-4983-b9de-11225a667084	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Marsaxlokk	28	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
17961000-a760-4149-9b5a-05a9b0418185	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Mdina	29	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b3413693-e39a-4be9-8248-cf825d3373c3	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Mellieħa	30	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
82e6db09-a4ce-4e83-a9a5-e5d5503161da	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Mosta	32	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
710ea517-91a1-441d-be0f-1cc20116a892	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Mqabba	33	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8e87e8c9-a1a4-4faf-8e58-3125d2007e06	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Msida	34	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d282a28d-1369-47f5-a147-027287c8f799	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Mtarfa	35	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
37c80594-6fcb-4e41-856e-e5f6917a1667	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Munxar	36	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5cb4dd77-11b8-4538-ac08-fa5aa9730b0d	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Mġarr	31	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
276cb665-eb1f-4167-b03e-55e170f7e190	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Nadur	37	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ad0b88bf-375e-46bb-8662-eca265751dab	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Naxxar	38	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
65ea7501-a303-41f2-8a84-0fd9b3b2419d	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Paola	39	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bb73fd12-00a4-4bf5-935b-5024f03dbef9	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Pembroke	40	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5dd8a7f2-26a7-49b9-954d-03fefb1e4855	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Pietà	41	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3c4b1825-a833-429b-9b57-5931652e7a03	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Qala	42	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
92fcda90-7058-4092-b2ff-1511ce0150b0	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Qormi	43	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
50f75267-0671-47b9-94cb-7b8dd473b42a	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Qrendi	44	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ef40499e-a0ac-461d-b72e-d9fac8de09e8	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Rabat	46	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
eba0096e-b863-4eb7-87ce-ddd75c2474d6	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Saint Lawrence	50	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e6f19760-4697-4e21-b108-b7949136c784	e047b247-c0d4-4fd5-a49b-fab9670aaaba	San Ġwann	49	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2b4b5cfd-34ec-4af9-b131-39c82475c4a7	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Sannat	52	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
adf32945-ebab-4092-8bbe-998335e6830b	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Santa Luċija	53	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
24e9e044-1f31-433e-8a18-5372c4f8fbfa	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Santa Venera	54	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6825cc43-2907-4166-b242-87da5a580125	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Senglea	20	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7db07a83-33ee-43d7-b425-2a312c6bbb41	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Siġġiewi	55	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
38c181c9-6d8d-4822-aec3-3fc5edf40cbb	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Sliema	56	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9fbdcc35-30db-4ac1-b284-f44366fed5ee	e047b247-c0d4-4fd5-a49b-fab9670aaaba	St. Julian's	48	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d2b30fa3-d864-4386-9704-fea8762df063	e047b247-c0d4-4fd5-a49b-fab9670aaaba	St. Paul's Bay	51	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8a19a888-98a3-47a5-8469-0242f022c327	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Swieqi	57	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
594a5d31-b583-4907-9e86-2fbf596cd715	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Ta' Xbiex	58	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fff5a03e-fa31-45a7-8d80-22dcfc693d1e	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Tarxien	59	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3c05a935-b3fb-4f02-8fbc-299bced7721f	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Valletta	60	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d826cd5a-9359-47d0-99b0-a822c8fe7ba9	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Victoria	45	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
037667ba-5239-45ad-9fcb-71756dc16b3f	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Xagħra	61	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
52654ac7-6d65-48c5-bc44-7b5fea105c7c	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Xewkija	62	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c72f2885-ac5b-45e2-bfad-835a5e52ba5d	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Xgħajra	63	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
926c379a-c27b-4a54-9d89-73ecd8586be2	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Ħamrun	18	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
734ad649-ff2f-4587-aafa-4535966fc163	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Żabbar	64	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d89e9fd1-b92e-4260-a140-0720eaeec9fc	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Żebbuġ Gozo	65	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
88b5bb34-8b17-43b3-b8b2-3e65e5b5dd58	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Żebbuġ Malta	66	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
eab4e685-3f39-4729-85c3-4a6342fc9aa5	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Żejtun	67	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
787cdbeb-2b35-4402-9e75-3a1d536b32ee	e047b247-c0d4-4fd5-a49b-fab9670aaaba	Żurrieq	68	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
98eb6a03-8a3e-46db-ad00-0f09447a39f7	368a92ff-ac7a-440f-8b5a-a4d6d893dfd1	Ralik Chain	L	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9b884fac-a71f-4625-ab9c-25e848fa35e6	368a92ff-ac7a-440f-8b5a-a4d6d893dfd1	Ratak Chain	T	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ad247e2e-6701-4fc5-ab84-3c1aa7380a1f	708e8990-5f8f-4193-a4fc-708f4c2654f0	Adrar Region	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
23c9269c-619f-4250-a0ca-ab7ea64954ed	708e8990-5f8f-4193-a4fc-708f4c2654f0	Assaba Region	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
975023ee-5db6-4d71-8bab-dfb9077aa19f	708e8990-5f8f-4193-a4fc-708f4c2654f0	Brakna Region	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9c8fbdda-a620-427d-8658-73bf10e024bc	708e8990-5f8f-4193-a4fc-708f4c2654f0	Dakhlet Nouadhibou	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9e235054-9537-4c63-b16c-b324592a67b1	708e8990-5f8f-4193-a4fc-708f4c2654f0	Gorgol Region	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
77581dda-7a24-422c-81dc-cb041689d2e6	708e8990-5f8f-4193-a4fc-708f4c2654f0	Guidimaka Region	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3d09a070-25fd-4ac1-ac87-7456f3e48625	708e8990-5f8f-4193-a4fc-708f4c2654f0	Hodh Ech Chargui Region	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
589ef234-2f14-4b9c-a90a-768095d63c16	708e8990-5f8f-4193-a4fc-708f4c2654f0	Hodh El Gharbi Region	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
27f84987-885c-4553-8bfc-4e1a13a83e15	708e8990-5f8f-4193-a4fc-708f4c2654f0	Inchiri Region	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c8c8c104-6668-4c91-b714-3e78075a5633	708e8990-5f8f-4193-a4fc-708f4c2654f0	Nouakchott-Nord Region	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c6ee32de-7d84-48a2-b653-891b09d35b3d	708e8990-5f8f-4193-a4fc-708f4c2654f0	Nouakchott-Ouest Region	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
983c6fb4-d40a-4cdd-98b2-fd11bd9a8dfc	708e8990-5f8f-4193-a4fc-708f4c2654f0	Nouakchott-Sud Region	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8d718f0c-dde5-4d63-a956-741c5e14b458	708e8990-5f8f-4193-a4fc-708f4c2654f0	Tagant Region	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
70fea149-959f-4b70-9f2b-6364a51b0d23	708e8990-5f8f-4193-a4fc-708f4c2654f0	Tiris Zemmour Region	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
197840d4-b52f-4798-b977-bb9d101bb2ac	708e8990-5f8f-4193-a4fc-708f4c2654f0	Trarza Region	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ab73e6a4-be2b-4d43-81b8-236a73972733	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Agaléga	AG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
73130b40-9d01-4683-89ed-8c93a419d67e	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Beau Bassin-Rose Hill	BR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6a80497a-2254-49e9-8319-5588e98d7a4f	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Cargados Carajos	CC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
40db553a-0754-4bb6-8d92-c028c48f455a	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Curepipe	CU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2e2ac558-0b5e-43ee-a1a2-96a3b69b2abc	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Flacq District	FL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5d57f534-e8bb-4436-9afd-c812266ac75a	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Grand Port District	GP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5d0d110f-f788-4724-ba59-dac888e3eb01	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Moka District	MO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f0d27e07-7079-422e-8cf3-f3cf7fec8cd8	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Pamplemousses District	PA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
433280aa-f3cb-497c-9ec0-c46921824cb9	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Plaines Wilhems District	PW	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2caded6f-fbc6-4fa2-8556-f4fbad2726bd	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Port Louis	PU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9b954aa6-ca24-4a3a-8290-75773f61dc26	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Port Louis District	PL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a3a808b9-815a-45a8-9c86-92a60d7fa155	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Quatre Bornes	QB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5a52b7e2-5b04-4284-9e2d-db684d9f4e66	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Rivière Noire District	BL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ee6b0a1e-25c4-4cc3-ada0-f7b816121541	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Rivière du Rempart District	RR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
472715a5-d729-4af9-b5c0-2f29809dc981	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Rodrigues	RO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8c071a3d-29a0-4ec9-8e8a-594ce7c10e35	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Savanne District	SA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8b95aa4c-1d89-4cfc-b22d-beafd19c9482	5884ecd6-926a-431a-a34a-ea9cbe29b7a5	Vacoas-Phoenix	VP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3f8cfa24-287c-4db7-b374-d561e4b01bc2	e624460a-91fd-4186-9245-1365b47bbcb6	Aguascalientes	AGU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c7faf160-f3ce-43dc-a089-edb4462414ea	e624460a-91fd-4186-9245-1365b47bbcb6	Baja California	BCN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5759e3bc-1b26-464a-8c4e-ca92399ed33c	e624460a-91fd-4186-9245-1365b47bbcb6	Baja California Sur	BCS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
694bd84c-9a67-4fe2-9701-2d0c0f44b834	e624460a-91fd-4186-9245-1365b47bbcb6	Campeche	CAM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d9873726-cf04-42a6-a809-9e80c2b4829d	e624460a-91fd-4186-9245-1365b47bbcb6	Chiapas	CHP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
761d79d7-60c8-40da-9f8d-e227b11dba68	e624460a-91fd-4186-9245-1365b47bbcb6	Chihuahua	CHH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
77dfcf33-9dc2-425f-973a-eb3121dd3f62	e624460a-91fd-4186-9245-1365b47bbcb6	Ciudad de México	CDMX	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4c0f3e57-fb63-4eba-9b8b-20e6bcbb905f	e624460a-91fd-4186-9245-1365b47bbcb6	Coahuila de Zaragoza	COA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6f13cef4-498a-4bb6-bb60-b25832db8898	e624460a-91fd-4186-9245-1365b47bbcb6	Colima	COL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dacee0fd-8177-4862-8009-71fdcbe295c0	e624460a-91fd-4186-9245-1365b47bbcb6	Durango	DUR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9d2a90f8-d5ce-4d59-a9ce-dfa32679792b	e624460a-91fd-4186-9245-1365b47bbcb6	Estado de México	MEX	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d54cb61c-d749-4169-9c84-03604c2eb709	e624460a-91fd-4186-9245-1365b47bbcb6	Guanajuato	GUA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
011f47f7-b6cd-41f2-ae8b-e9937805979e	e624460a-91fd-4186-9245-1365b47bbcb6	Guerrero	GRO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d6194986-041c-446c-9810-3749edaf7330	e624460a-91fd-4186-9245-1365b47bbcb6	Hidalgo	HID	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fc0d6156-b2d2-40f5-969a-cd06c63170a9	e624460a-91fd-4186-9245-1365b47bbcb6	Jalisco	JAL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
19ed7cfb-caf4-4ae4-a8ea-345aa30e9cab	e624460a-91fd-4186-9245-1365b47bbcb6	Michoacán de Ocampo	MIC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1ed5c24a-29da-4b4c-9f37-ec16a3bbd7f7	e624460a-91fd-4186-9245-1365b47bbcb6	Morelos	MOR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8f6200a6-35ce-4723-9cba-fce8bd1baa89	e624460a-91fd-4186-9245-1365b47bbcb6	Nayarit	NAY	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
05c754c6-25eb-475a-abb3-3d67541da218	e624460a-91fd-4186-9245-1365b47bbcb6	Nuevo León	NLE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
249654b4-e974-4987-82fc-5760bef3f4ce	e624460a-91fd-4186-9245-1365b47bbcb6	Oaxaca	OAX	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a0f29d6f-7063-48f1-bd67-00c05ab513c9	e624460a-91fd-4186-9245-1365b47bbcb6	Puebla	PUE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6213fdd7-2241-406d-98af-cfd7c0c6aefa	e624460a-91fd-4186-9245-1365b47bbcb6	Querétaro	QUE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fec14ace-072f-4166-9407-9232e3378290	e624460a-91fd-4186-9245-1365b47bbcb6	Quintana Roo	ROO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de1e333f-db86-437c-a99b-14077299dd3c	e624460a-91fd-4186-9245-1365b47bbcb6	San Luis Potosí	SLP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
54612939-5b88-4070-b2b0-93f6ebe5267c	e624460a-91fd-4186-9245-1365b47bbcb6	Sinaloa	SIN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8fe61da0-5472-4940-b0ca-0b5f6db6c9f6	e624460a-91fd-4186-9245-1365b47bbcb6	Sonora	SON	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
34b02398-15e9-479e-8e30-5282c6943ae9	e624460a-91fd-4186-9245-1365b47bbcb6	Tabasco	TAB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
573dff37-9f35-48a7-8f16-6481339531d4	e624460a-91fd-4186-9245-1365b47bbcb6	Tamaulipas	TAM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c5b9410d-a78c-445f-ba6f-e964fa1de79b	e624460a-91fd-4186-9245-1365b47bbcb6	Tlaxcala	TLA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
79f4deaa-f396-4ed4-bbf1-49088baa2e76	e624460a-91fd-4186-9245-1365b47bbcb6	Veracruz de Ignacio de la Llave	VER	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
da3f23df-7f3f-442c-892a-618183eba81a	e624460a-91fd-4186-9245-1365b47bbcb6	Yucatán	YUC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1ea309e3-cc12-4505-bf22-63370321460c	e624460a-91fd-4186-9245-1365b47bbcb6	Zacatecas	ZAC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
835d8544-c6bb-464b-90c4-0748c03301f3	471c12a7-00a5-4cad-aa14-bacb1984bd17	Chuuk State	TRK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7d419594-c109-4999-b6d8-4d2edba23452	471c12a7-00a5-4cad-aa14-bacb1984bd17	Kosrae State	KSA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
13b36a18-017c-40fd-8c0f-cf6a47f2bc15	471c12a7-00a5-4cad-aa14-bacb1984bd17	Pohnpei State	PNI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c7877f27-0734-4828-ab34-b98d8e781938	471c12a7-00a5-4cad-aa14-bacb1984bd17	Yap State	YAP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
572249a6-4a50-4b94-9f70-a56b6fb55d15	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Anenii Noi District	AN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dcdb995f-dc6c-474d-ad23-d5012016daae	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Basarabeasca District	BS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cc0e84dc-95c6-4273-9592-a6f4301a3964	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Bender Municipality	BD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3d055b30-6430-4b3d-b9e0-a26e1bd0627d	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Briceni District	BR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e4124284-8121-40ed-8b9c-28046ec5ddc3	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Bălți Municipality	BA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
25a40a3f-0240-44d7-998b-0ac8cad0ee2b	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Cahul District	CA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
72ea88b1-f1be-4240-8802-ef0ad683dee6	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Cantemir District	CT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
81d13292-d6ed-4f2f-a9bf-60c9cfbbd034	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Chișinău Municipality	CU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9da9a8e4-4a24-4036-9b47-a867adba7e28	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Cimișlia District	CM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8c1f849e-a4a1-4d70-a5f0-58deb6910994	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Criuleni District	CR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8e014243-7d61-44ab-b869-f1d8154bac92	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Călărași District	CL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fc79b50a-fb91-4e2c-b122-154ca4fe41fd	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Căușeni District	CS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
307c5e1f-8532-46cd-8845-ef16f9d56bbf	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Dondușeni District	DO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e05f3ccf-18e8-45d9-9fa0-54dd66dd7858	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Drochia District	DR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8c025b1a-0fc4-4400-a4a8-5b6e2f746d3e	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Dubăsari District	DU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1261f7d9-f82c-4049-a58d-185b383083ab	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Edineț District	ED	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f2ef1e9a-7b55-4042-9cc3-5ee2483e5a4c	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Florești District	FL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8d375066-b197-4b94-b1cf-11266d3d215e	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Fălești District	FA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5649fb5e-cf35-4b6c-aabf-b809f6cbb237	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Gagauzia	GA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fc5f057c-2898-4210-acff-4dd7c346509b	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Glodeni District	GL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
45bbea04-abd6-419f-8794-0af345e903ea	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Hîncești District	HI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d07066a9-0560-46b8-8b42-32e8a1eb6eba	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Ialoveni District	IA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f19b9443-d9b2-4306-952b-dd5cc896e75a	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Nisporeni District	NI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9bb3d673-03e4-420c-8724-2371ae96ea45	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Ocnița District	OC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
16cc077e-0cc4-42e2-8095-34c069cb92dc	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Orhei District	OR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
77721d9a-b237-49e9-abe8-1bd616fff4b8	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Rezina District	RE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9a0141a1-0f63-48f5-b5c7-5b72cc78fb83	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Rîșcani District	RI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
79b75fbb-7938-4a53-8a1c-2d43f5c83b3e	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Soroca District	SO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f8827029-9c3a-4df3-ac04-974dbd68ec8c	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Strășeni District	ST	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
774720da-2e70-49d4-a486-4e8141249435	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Sîngerei District	SI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
340632a1-bbef-4bc4-ae9c-b3bc45a28bef	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Taraclia District	TA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
10e485a0-81a5-43fe-ae21-35b569d73076	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Telenești District	TE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
abd69d44-cf2e-4404-91a8-18a9b0344d75	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Transnistria autonomous territorial unit	SN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f545e0f8-086d-4a82-b2fc-7beecc26cb03	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Ungheni District	UN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
db288e65-5c6d-4898-847b-93a5a6233ce3	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Șoldănești District	SD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d04056ca-fb79-4320-9faf-203fee9edf29	cdb82a7b-b3dc-45a3-ae11-440c212ef84b	Ștefan Vodă District	SV	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d1bfba0e-8798-4f8b-9cd2-803ab526a826	40e76cb5-73a2-48ce-9be6-ab2a6851f300	La Colle	CL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
28f9fd1a-8514-4ba6-9f81-cf3c50f7641b	40e76cb5-73a2-48ce-9be6-ab2a6851f300	La Condamine	CO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de1837dd-f3ef-42e5-8359-109ac7433ca9	40e76cb5-73a2-48ce-9be6-ab2a6851f300	Moneghetti	MG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3ab6ea04-4de8-4c4b-ac32-6d3d1d6bcc12	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Arkhangai Province	073	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fecc209e-68f5-4580-a5e3-90d43c036466	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Bayan-Ölgii Province	071	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
022ea870-c9ed-4ccb-8bfe-43f0e23fc6ed	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Bayankhongor Province	069	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1c9dac49-f9e9-4111-9452-ea426c533383	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Bulgan Province	067	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1723a75a-632d-4d15-8d4c-ad0e3ed9dac6	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Darkhan-Uul Province	037	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b041a59f-66c3-49aa-b456-a0c34e7c489f	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Dornod Province	061	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3e65c092-97e8-4fb9-bd93-9223088a9f98	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Dornogovi Province	063	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ad4b840a-4323-43aa-b0df-a72f8724797a	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Dundgovi Province	059	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8ea1d4ae-dbb6-4518-8d6e-8ec1d496a507	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Govi-Altai Province	065	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
79a195dc-2b93-40e9-8c0d-ee0519ab8004	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Govisümber Province	064	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
602a0714-ce6e-493b-bd75-6e2b584d0c8b	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Khentii Province	039	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
34786c4d-4371-4d23-a935-bc47235b99c9	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Khovd Province	043	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
45ce2136-ff3f-4a28-9291-36db1b354127	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Khövsgöl Province	041	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0c3c43e8-5a5f-4c49-b74e-4b5462a8bf82	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Orkhon Province	035	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
58ba2eab-43ec-425d-bd0c-4c5cb4333be2	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Selenge Province	049	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8b9d35e4-e28d-49d1-829d-e85c1099f3cc	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Sükhbaatar Province	051	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
87f9db49-d63b-46fd-8af2-615b35dd44df	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Töv Province	047	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8aa4b936-5871-4f59-bc3f-9918338b712b	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Uvs Province	046	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
84919249-75ca-452f-a29f-c3a38a6cdfac	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Zavkhan Province	057	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a89cf34a-fd5f-4597-8355-e06282348e1e	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Ömnögovi Province	053	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cdfd65c8-5041-4d39-ad72-d15b7db8263d	b13c9d9a-6eb7-4abf-91cc-2d50eb747fa8	Övörkhangai Province	055	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a2ac8096-f0a9-4477-bb0d-69370882a67a	ef321955-54d1-4083-ae80-af2b5c09b6de	Andrijevica Municipality	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ff363ba8-334d-4468-abd3-20a611586f8d	ef321955-54d1-4083-ae80-af2b5c09b6de	Bar Municipality	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cddad2dc-c48f-4746-9c5e-bfb7d985d171	ef321955-54d1-4083-ae80-af2b5c09b6de	Berane Municipality	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6a2ef26d-cf54-421d-a9d3-4a5c8aebf802	ef321955-54d1-4083-ae80-af2b5c09b6de	Bijelo Polje Municipality	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8232b619-1fcb-42e9-ba6c-24ca55459679	ef321955-54d1-4083-ae80-af2b5c09b6de	Budva Municipality	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
17aa5582-7e39-4d8a-b46a-d45f37cf400f	ef321955-54d1-4083-ae80-af2b5c09b6de	Danilovgrad Municipality	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5d291ee2-acb5-4c1e-96c8-533ef191f412	ef321955-54d1-4083-ae80-af2b5c09b6de	Gusinje Municipality	22	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a576186e-47da-4505-a975-e37090bec458	ef321955-54d1-4083-ae80-af2b5c09b6de	Kolašin Municipality	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
664cfa2e-b365-4408-b29b-16140e4fa6ce	ef321955-54d1-4083-ae80-af2b5c09b6de	Kotor Municipality	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
86223ae3-b6b6-4f9a-9f83-758bc266c4d2	ef321955-54d1-4083-ae80-af2b5c09b6de	Mojkovac Municipality	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c94f7267-914e-49ce-8e7f-bf577bb4fd5b	ef321955-54d1-4083-ae80-af2b5c09b6de	Nikšić Municipality	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f15e4655-0413-47e6-863d-c7f8f9e785f5	ef321955-54d1-4083-ae80-af2b5c09b6de	Old Royal Capital Cetinje	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cf86e4d2-ac0f-4133-bda0-edce48ab56df	ef321955-54d1-4083-ae80-af2b5c09b6de	Petnjica Municipality	23	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fe52f34a-c987-4db2-a180-6508bdb2a609	ef321955-54d1-4083-ae80-af2b5c09b6de	Plav Municipality	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
71446940-e60b-43d8-8a82-2e8db215a9ab	ef321955-54d1-4083-ae80-af2b5c09b6de	Pljevlja Municipality	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
add95cf4-118b-498c-bdf6-c139ea3cd609	ef321955-54d1-4083-ae80-af2b5c09b6de	Plužine Municipality	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9f8f34fa-100e-4e9d-b61b-fd3b9dc248d1	ef321955-54d1-4083-ae80-af2b5c09b6de	Podgorica Municipality	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
25b03fc2-7819-45df-a7db-f80057802ea5	ef321955-54d1-4083-ae80-af2b5c09b6de	Rožaje Municipality	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8d97c6ea-1546-4043-acd3-7602967ee019	ef321955-54d1-4083-ae80-af2b5c09b6de	Tivat Municipality	19	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
682db00c-31c4-42ed-a7b4-54c9d2f40d2e	ef321955-54d1-4083-ae80-af2b5c09b6de	Ulcinj Municipality	20	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
582d8196-5612-4dd1-a286-aaa2a34da086	ef321955-54d1-4083-ae80-af2b5c09b6de	Šavnik Municipality	18	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c08ff7ac-0986-4324-aeb3-d04e9c6dee18	ef321955-54d1-4083-ae80-af2b5c09b6de	Žabljak Municipality	21	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f0bc69fa-1053-4c8a-9bf2-5ab580708289	822e04c1-3671-4692-83a8-55ddba26c7a7	Agadir-Ida-Ou-Tanane	AGD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9b3dd135-c8ca-4425-9592-80fe87664f2f	822e04c1-3671-4692-83a8-55ddba26c7a7	Al Haouz	HAO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1107bb6d-6e33-4c83-be24-7b353ee586c3	822e04c1-3671-4692-83a8-55ddba26c7a7	Al Hoceïma	HOC	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d783bbf2-2bc2-4c5d-952b-bafb265cf3a5	822e04c1-3671-4692-83a8-55ddba26c7a7	Aousserd (EH)	AOU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
61ea1623-2092-4893-8008-f769ea3639fe	822e04c1-3671-4692-83a8-55ddba26c7a7	Assa-Zag (EH-partial)	ASZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
af45f893-aa9f-477e-9752-544a2bdb4048	822e04c1-3671-4692-83a8-55ddba26c7a7	Azilal	AZI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4401879a-c47a-4edd-9dca-dae22358a7fa	822e04c1-3671-4692-83a8-55ddba26c7a7	Benslimane	BES	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
58df8d82-db97-4e2a-9c7c-dd543d9b9e0e	822e04c1-3671-4692-83a8-55ddba26c7a7	Berkane	BER	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fe1db71d-aa37-4c1c-bbe2-52568ec5aece	822e04c1-3671-4692-83a8-55ddba26c7a7	Berrechid	BRR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
cd691c7f-69c4-4dc8-9f13-772594e1faa8	822e04c1-3671-4692-83a8-55ddba26c7a7	Boujdour (EH)	BOD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fee59a1e-09b3-42fc-9a25-a41061bd6a49	822e04c1-3671-4692-83a8-55ddba26c7a7	Boulemane	BOM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
738a7998-c4d8-48f7-b92e-e1f8ee24fb2d	822e04c1-3671-4692-83a8-55ddba26c7a7	Béni Mellal	BEM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a3278515-d71e-42fd-b905-4d7b3bfa2af4	822e04c1-3671-4692-83a8-55ddba26c7a7	Béni Mellal-Khénifra	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4ff78ef9-1666-4f2a-8074-e695e7fcbbe1	822e04c1-3671-4692-83a8-55ddba26c7a7	Casablanca	CAS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f07353db-e7f5-45a4-993e-9c60bb11a652	822e04c1-3671-4692-83a8-55ddba26c7a7	Casablanca-Settat	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8177a3e4-bf9f-4ee3-9461-b3eb8d12945d	822e04c1-3671-4692-83a8-55ddba26c7a7	Chefchaouen	CHE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
db2ceaf9-5b7e-468b-a3fe-6ea3484fb924	822e04c1-3671-4692-83a8-55ddba26c7a7	Chichaoua	CHI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8db4f486-c751-4c2f-b5ae-6c581ee00808	822e04c1-3671-4692-83a8-55ddba26c7a7	Chtouka-Ait Baha	CHT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1fa095d1-b261-48ad-aa01-3819f68e2ea3	822e04c1-3671-4692-83a8-55ddba26c7a7	Dakhla-Oued Ed-Dahab (EH)	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6be685d3-8221-4ffb-b3d3-0a7a08dd0554	822e04c1-3671-4692-83a8-55ddba26c7a7	Driouch	DRI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
80f05233-ee0b-40aa-aa22-e8074f3685ea	822e04c1-3671-4692-83a8-55ddba26c7a7	Drâa-Tafilalet	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bca25ed5-f489-48b7-a089-279aebc1bc85	822e04c1-3671-4692-83a8-55ddba26c7a7	El Hajeb	HAJ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
91218485-700f-42a3-a678-e8237a90f128	822e04c1-3671-4692-83a8-55ddba26c7a7	El Jadida	JDI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2890ee3f-1e06-427a-9c6c-ec06fb44ea12	822e04c1-3671-4692-83a8-55ddba26c7a7	El Kelâa des Sraghna	KES	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b67fa3f7-0499-4511-832e-429742cd28c8	822e04c1-3671-4692-83a8-55ddba26c7a7	Errachidia	ERR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
754e57ca-f148-4e54-b9ea-56a59fe63515	822e04c1-3671-4692-83a8-55ddba26c7a7	Es-Semara (EH-partial)	ESM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bf1af5a6-6a0c-49a0-8ccf-389d3e48c59a	822e04c1-3671-4692-83a8-55ddba26c7a7	Essaouira	ESI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c6b4ace3-9643-44a9-b4a4-e5d93029a768	822e04c1-3671-4692-83a8-55ddba26c7a7	Fahs-Anjra	FAH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
995da873-2a36-4da6-8b66-4828af83f1b1	822e04c1-3671-4692-83a8-55ddba26c7a7	Figuig	FIG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ee26aa30-46eb-4d6b-9392-a52fce802fcf	822e04c1-3671-4692-83a8-55ddba26c7a7	Fquih Ben Salah	FQH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c4e9d871-2d6e-49b0-b43d-11c96cc74703	822e04c1-3671-4692-83a8-55ddba26c7a7	Fès	FES	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e80df32e-dc1a-4753-9114-ce43d0637f3f	822e04c1-3671-4692-83a8-55ddba26c7a7	Fès-Meknès	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7e9b513d-348b-4852-b976-81bac6ebcf4e	822e04c1-3671-4692-83a8-55ddba26c7a7	Guelmim	GUE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f6d18ff5-8d0f-49b0-806b-974ff5a2f088	822e04c1-3671-4692-83a8-55ddba26c7a7	Guelmim-Oued Noun (EH-partial)	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0add0d6f-5c1b-4c8d-b5ec-eb8ab78fabc4	822e04c1-3671-4692-83a8-55ddba26c7a7	Guercif	GUF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d6018e8b-2562-4989-b6a8-f58c46b72d18	822e04c1-3671-4692-83a8-55ddba26c7a7	Ifrane	IFR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
53fbdac2-18af-4c72-8f7f-5b2452fbb706	822e04c1-3671-4692-83a8-55ddba26c7a7	Inezgane-Ait Melloul	INE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1ce92060-a30d-4e4a-a850-aea59e153b08	822e04c1-3671-4692-83a8-55ddba26c7a7	Jerada	JRA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b489ad14-2a87-40b6-9d41-7c1523076309	822e04c1-3671-4692-83a8-55ddba26c7a7	Khouribga	KHO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dd8234c5-f433-4088-867c-d502d14b660e	822e04c1-3671-4692-83a8-55ddba26c7a7	Khémisset	KHE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f754e96e-fa10-4f61-8f40-49785a33787e	822e04c1-3671-4692-83a8-55ddba26c7a7	Khénifra	KHN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d3545ab4-2cfd-4ed9-b19c-c905ca7a9e5c	822e04c1-3671-4692-83a8-55ddba26c7a7	Kénitra	KEN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0e000101-669a-44e1-97b5-27f87e30e9e4	822e04c1-3671-4692-83a8-55ddba26c7a7	L'Oriental	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
74b14a02-a8f1-4823-af65-bafb99ca78f6	822e04c1-3671-4692-83a8-55ddba26c7a7	Larache	LAR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de3bc638-0618-4bc2-84e0-f816dbd1d526	822e04c1-3671-4692-83a8-55ddba26c7a7	Laâyoune (EH)	LAA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
44dbfa8e-b317-4a5a-8f35-b9fd29c3bbea	822e04c1-3671-4692-83a8-55ddba26c7a7	Laâyoune-Sakia El Hamra (EH-partial)	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
82277d4b-c786-45a9-980c-084b2d515e6f	822e04c1-3671-4692-83a8-55ddba26c7a7	Marrakech	MAR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1a0d7da0-e027-4dc8-bc1d-8fadb775eb12	822e04c1-3671-4692-83a8-55ddba26c7a7	Marrakesh-Safi	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9bae9d57-22eb-4a34-aed9-b01394cd93b7	822e04c1-3671-4692-83a8-55ddba26c7a7	Meknès	MEK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f836dd88-2531-4dfc-9168-972f11bfd004	822e04c1-3671-4692-83a8-55ddba26c7a7	Midelt	MID	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
897858c0-bd23-485d-ba24-79c2c2bc80e4	822e04c1-3671-4692-83a8-55ddba26c7a7	Mohammadia	MOH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bfc80ce2-e984-4527-a39d-516e4956023c	822e04c1-3671-4692-83a8-55ddba26c7a7	Moulay Yacoub	MOU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
96406ac7-0827-465a-8f88-004850b9d3ef	822e04c1-3671-4692-83a8-55ddba26c7a7	Médiouna	MED	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7ac851a4-2513-41a9-958a-d13361b807b0	822e04c1-3671-4692-83a8-55ddba26c7a7	M’diq-Fnideq	MDF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ac499a8e-9a17-4f95-8d4d-94e094cf01e4	822e04c1-3671-4692-83a8-55ddba26c7a7	Nador	NAD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ce76f167-f968-4c84-896e-37ccc995ffdf	822e04c1-3671-4692-83a8-55ddba26c7a7	Nouaceur	NOU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ec8b17d6-58a5-4474-83e5-1f49b2643996	822e04c1-3671-4692-83a8-55ddba26c7a7	Ouarzazate	OUA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d03fe4b4-74ac-4897-8663-c7e234c5ece7	822e04c1-3671-4692-83a8-55ddba26c7a7	Oued Ed-Dahab (EH)	OUD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
23ded5c1-57f2-417b-83bc-9740aa11997c	822e04c1-3671-4692-83a8-55ddba26c7a7	Ouezzane	OUZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d47863aa-27be-4f26-b7cc-6a66b394b82f	822e04c1-3671-4692-83a8-55ddba26c7a7	Oujda-Angad	OUJ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6148158c-de88-4b1d-b9ed-239fe64ddfb0	822e04c1-3671-4692-83a8-55ddba26c7a7	Rabat	RAB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e686d37d-b00c-4ea7-b3f6-f7f3b9266d8c	822e04c1-3671-4692-83a8-55ddba26c7a7	Rabat-Salé-Kénitra	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c1e9547e-99bc-4d71-bc65-144843a9467a	822e04c1-3671-4692-83a8-55ddba26c7a7	Rehamna	REH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
71d26c26-77a3-4b89-92d8-1b94e4213364	822e04c1-3671-4692-83a8-55ddba26c7a7	Safi	SAF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
da78917c-ba19-40f1-8394-40d7afa5d1a4	822e04c1-3671-4692-83a8-55ddba26c7a7	Salé	SAL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
585c11fd-28f3-427e-bb10-f6b28d644e13	822e04c1-3671-4692-83a8-55ddba26c7a7	Sefrou	SEF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6e53f93e-7561-4421-ba8d-048f64d65126	822e04c1-3671-4692-83a8-55ddba26c7a7	Settat	SET	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4ca0a140-5853-484b-bcea-e5a4ec6ad4ac	822e04c1-3671-4692-83a8-55ddba26c7a7	Sidi Bennour	SIB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0ad2abb2-144a-4439-a8f9-59a428fe419d	822e04c1-3671-4692-83a8-55ddba26c7a7	Sidi Ifni	SIF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
16fe3927-b348-497e-afac-a2ccde0595bf	822e04c1-3671-4692-83a8-55ddba26c7a7	Sidi Kacem	SIK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9580c717-f4b1-438f-a190-6911ab85a820	822e04c1-3671-4692-83a8-55ddba26c7a7	Sidi Slimane	SIL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ce327443-422c-4825-93d0-6246b6ed2d73	822e04c1-3671-4692-83a8-55ddba26c7a7	Skhirate-Témara	SKH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f7eba844-8314-479d-8ea3-d179316583df	822e04c1-3671-4692-83a8-55ddba26c7a7	Souss-Massa	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2ed21f3d-44f9-4032-9e71-327e27c27411	822e04c1-3671-4692-83a8-55ddba26c7a7	Tan-Tan (EH-partial)	TNT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3d350acb-1a20-40fc-af44-944128b384cf	822e04c1-3671-4692-83a8-55ddba26c7a7	Tanger-Assilah	TNG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0d71b580-7643-4787-88e7-e1bde706acde	822e04c1-3671-4692-83a8-55ddba26c7a7	Tanger-Tétouan-Al Hoceïma	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
318bf8f1-3f7c-4b3a-ae86-8620e3fc18c1	822e04c1-3671-4692-83a8-55ddba26c7a7	Taounate	TAO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
64d45188-364d-4a09-8319-a28089c17478	822e04c1-3671-4692-83a8-55ddba26c7a7	Taourirt	TAI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3edfa3f2-fe6f-4f35-a09a-6d31c99fe54c	822e04c1-3671-4692-83a8-55ddba26c7a7	Tarfaya (EH-partial)	TAF	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bf327e1b-b196-4e86-8ca8-9c01d769d321	822e04c1-3671-4692-83a8-55ddba26c7a7	Taroudannt	TAR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ccbe324d-d42d-44c6-b40e-99ef4c6539a9	822e04c1-3671-4692-83a8-55ddba26c7a7	Tata	TAT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0397cb30-c874-4380-899e-581768d2d104	822e04c1-3671-4692-83a8-55ddba26c7a7	Taza	TAZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f1b6ce08-c7f1-4544-9997-a7d73b5a2454	822e04c1-3671-4692-83a8-55ddba26c7a7	Tinghir	TIN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6e0ea191-517f-4ea5-9a2b-0982e11922f6	822e04c1-3671-4692-83a8-55ddba26c7a7	Tiznit	TIZ	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e5828772-8ffc-4e23-be9d-01e2701b14a7	822e04c1-3671-4692-83a8-55ddba26c7a7	Tétouan	TET	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1e44bf9a-f56f-41c6-bb91-a871c703d592	822e04c1-3671-4692-83a8-55ddba26c7a7	Youssoufia	YUS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5bbbaca6-6624-49c7-9f8b-1a6a92870942	822e04c1-3671-4692-83a8-55ddba26c7a7	Zagora	ZAG	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4cbfc50b-b2ec-47e6-905d-a7b0c51c609a	37ae1896-a105-41a1-b3ec-d6af7741975e	Cabo Delgado Province	P	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e18ffd4e-c594-47b2-b7d6-ac803864b315	37ae1896-a105-41a1-b3ec-d6af7741975e	Gaza Province	G	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a0d74f07-2b26-4984-b176-9f79e921ce79	37ae1896-a105-41a1-b3ec-d6af7741975e	Inhambane Province	I	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
206a1216-fe3f-4ab8-9d94-0f56f3756442	37ae1896-a105-41a1-b3ec-d6af7741975e	Manica Province	B	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6eeb6ca8-153c-4f1a-a99b-37d4b9581734	37ae1896-a105-41a1-b3ec-d6af7741975e	Maputo	MPM	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b06da9a8-3324-4db6-a801-4ab478bf379e	37ae1896-a105-41a1-b3ec-d6af7741975e	Maputo Province	L	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
59fbe3bc-e8fe-481b-a650-3c2ba5f636f8	37ae1896-a105-41a1-b3ec-d6af7741975e	Nampula Province	N	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
936b9960-1a0a-45dc-9aa8-3ca9dc448c6e	37ae1896-a105-41a1-b3ec-d6af7741975e	Niassa Province	A	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c24edaf7-cda5-4eec-b06d-5ef2b73634bc	37ae1896-a105-41a1-b3ec-d6af7741975e	Sofala Province	S	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
46b4b25d-87a0-4742-aecc-f988415b9086	37ae1896-a105-41a1-b3ec-d6af7741975e	Tete Province	T	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d0a60342-b193-4d1e-a1b1-de029a6707dd	37ae1896-a105-41a1-b3ec-d6af7741975e	Zambezia Province	Q	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fcc3582b-afcb-486c-8a1c-18b992ebeb3c	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Ayeyarwady Region	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fa3d0120-23c8-4c29-8e2d-5ca58686e1ef	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Bago	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
daab89a3-e74b-4fd1-844f-eb2338725508	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Chin State	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d3b88391-6530-4496-ba55-1e3bc7f0a28e	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Kachin State	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b8138a22-f522-4779-b849-aee44b7b6a1a	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Kayah State	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
55e28ce0-f6d9-46f4-a480-5a009498d11e	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Kayin State	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
98c8b709-ecef-49fa-bec8-5c4dce7582b0	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Magway Region	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d853a698-28a0-4f4f-8731-f74fe94a2428	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Mandalay Region	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dd0ff5dc-cc8e-4a53-991d-28cc03104737	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Mon State	15	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7e1b0716-da53-4bbd-b1bc-f91405b5a2e5	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Naypyidaw Union Territory	18	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a897e972-501d-422f-a856-f77f999a543d	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Rakhine State	16	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
29fdc60f-012e-4df8-a81f-5310c5f9a14c	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Sagaing Region	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
59eda524-6d95-4139-b66e-a36280b2821a	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Shan State	17	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
7399c99d-e5a8-4a16-a6b0-7eda3e53611e	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Tanintharyi Region	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
973796a5-4e19-474d-875d-3777d883a997	a505ab33-a2df-4bfb-bcc4-1755e93d4bb1	Yangon Region	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ae8324a0-7eee-4d81-b5be-09911be5a318	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Erongo Region	ER	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
fc7919fb-f44c-44f9-a526-fb7e9aff6236	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Hardap Region	HA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c06678b8-0c3b-40a1-8845-7f721e366ae5	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Karas Region	KA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6e972139-fda2-4d25-b093-2097fddddc28	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Kavango East Region	KE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
abd8d1a4-3150-45b7-a340-f174fcbed582	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Kavango West Region	KW	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2282eb1e-9e49-4a4e-98cc-ae84606e4165	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Khomas Region	KH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
74dfc080-e2e3-468d-b8d7-28abbbe87685	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Kunene Region	KU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
691d19de-45d8-4b68-8113-d9f1d8b9b3bb	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Ohangwena Region	OW	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
845efb5e-5a3f-4504-b219-c7adb6fa8611	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Omaheke Region	OH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5aa7dd1e-73f9-442f-a961-71d98bf5e2d3	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Omusati Region	OS	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8059c4c4-8303-491f-8a59-9f8e61beb3c5	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Oshana Region	ON	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
34221858-9cdc-46dc-b038-5a0a1ba98ea7	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Oshikoto Region	OT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f3a54075-17d8-4c64-9acb-4234aac017f2	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Otjozondjupa Region	OD	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
13f3f8bf-bbf4-42ad-b105-996c1a65e9ef	ae1562ec-c62a-4318-bcbf-53d6778e75ea	Zambezi Region	CA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
15554de4-e0e7-4802-8b03-af39650a67de	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Aiwo District	01	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b9d89d92-9b83-4718-b4a6-cd0a6ace0852	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Anabar District	02	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1a805794-efab-49b1-9314-19bed24ef7fe	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Anetan District	03	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
91893f3f-3380-4e8c-ac2d-21120efca9dd	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Anibare District	04	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d5c99737-17e5-4543-8166-c7e7a79b7a4f	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Baiti District	05	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
466f8ebe-d5e0-4383-96af-3e958c2566b9	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Boe District	06	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c90a5fe7-0fc6-42a7-ba1a-493885519bb0	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Buada District	07	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
5d9afd2c-a6ed-47b9-9288-0af6703fd643	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Denigomodu District	08	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c32de66f-31de-4a8a-9b50-bfe5aa5fc8ca	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Ewa District	09	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
11662ca5-a874-41b8-80a9-bb537204a09b	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Ijuw District	10	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4e6a1d82-d188-43b6-9223-b0e455cc04a4	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Meneng District	11	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e8d84371-6d52-4fc4-9296-5d82793bbecf	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Nibok District	12	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
34815115-62bd-4262-9ff1-3692ffb22acf	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Uaboe District	13	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c6df4035-4311-4802-b789-c4c4ee1bb62c	0ae9ea2c-d0d2-45fb-bf99-b06ca636838c	Yaren District	14	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
a9b7c281-2cc0-4420-a8e5-5bf2ca5f71d0	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Bagmati Zone	BA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
85c7cffe-2e13-4adb-958f-d9577862df83	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Bheri Zone	BH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
de0f3424-3f3c-4452-a5b8-831133f67dcb	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Central Region	1	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
324675c7-a23e-4ad1-aded-526136ed6434	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Dhaulagiri Zone	DH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
2c20f9fc-670d-4770-b4d2-3d3cd93b6201	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Eastern Development Region	4	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ea811b36-4116-42c5-aeae-9fdd73a51331	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Far-Western Development Region	5	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
3634e21a-6cc2-44e2-aaf1-4fc73052a875	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Gandaki Zone	GA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1d42bae6-e258-4de4-9f34-3cc7b52140ef	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Janakpur Zone	JA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
eac2692e-62cd-4097-8d8d-1cad9fbe0bc3	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Karnali Zone	KA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
e138f5a1-3fe1-4a92-b2c3-c2b05eb99ed8	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Kosi Zone	KO	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ad651f4f-bb5d-4a93-9733-7edc69f65136	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Lumbini Zone	LU	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
33e6aa79-4918-450b-863a-286f458897ef	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Mahakali Zone	MA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ff4f93ab-8b61-48a2-a45b-f2e12293677a	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Mechi Zone	ME	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
895690d0-81f0-498e-b7ea-735187c350db	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Mid-Western Region	2	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
28bb41c0-e1dd-4f23-b9a4-2140347b65d0	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Narayani Zone	NA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
1acf2707-304d-40ea-b82c-3d3366485ffa	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Rapti Zone	RA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
daeeb1e9-9784-41fd-b157-fec1cc2f9b34	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Sagarmatha Zone	SA	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d8bf99ff-ea14-4a2b-95e1-91f8345f012c	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Seti Zone	SE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f1e30021-b151-45a5-abb5-b5b217e89a51	16e5a813-7493-4b4b-b4ff-b6b0061a1d1f	Western Region	3	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9149e0df-d119-4f0e-8b72-1d5055dcdce8	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Bonaire	BQ1	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
b6df6475-8556-4847-a6fb-992ded533719	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Drenthe	DR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ab07061a-e2e6-4586-9085-2cbd6982605b	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Flevoland	FL	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
02493913-f051-49c1-8b08-499b1debca38	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Friesland	FR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f09e6489-ee9b-44fb-b27a-a32766881deb	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Gelderland	GE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
ff1c13b9-1bb7-4425-a458-6caec53485a3	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Groningen	GR	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
bb1b1ac6-1f09-4e37-a61c-c6f2ed29345e	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Limburg	LI	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
593afc35-197d-4c92-921d-732a3bf44c75	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	North Brabant	NB	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6b83dddd-6500-4392-a1c1-da2b0c17d288	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	North Holland	NH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
6f5ef3bb-280d-42bd-956a-c0696b1ce162	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Overijssel	OV	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
f1e3b5af-7fa3-41f5-af1f-2195beeedfbb	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Saba	BQ2	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
0b00192b-c11e-4936-8b36-2ed02dcf12e1	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Sint Eustatius	BQ3	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
c95dc0f0-33e7-41c3-bc3e-8aa1bd88aa0a	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	South Holland	ZH	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
d479bd80-2f5a-4761-9668-265a9a0efd99	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Utrecht	UT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
8b810031-7f08-4886-a3dc-4be3c9c22026	eb489514-ddeb-4ec0-a2c7-e1c4c30d7ba9	Zeeland	ZE	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
4355fe1a-605b-4b75-99fe-5bfa40151bed	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Auckland Region	AUK	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
79aa89d7-e53e-474d-b5bd-b33302bf7951	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Bay of Plenty Region	BOP	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
dfe9b53a-bcdf-431a-9e21-4b649f27b27f	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Canterbury Region	CAN	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
9bb9cfae-f5d5-483c-ae2b-49c78ae0bf27	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Chatham Islands	CIT	t	2026-02-25 08:11:36.588	2026-02-25 08:11:36.588	\N	\N	\N	\N
62a9a984-bbd5-40bf-9a08-6a32e5d5ce76	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Gisborne District	GIS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4637f1b4-0243-4e7c-97a8-4691f5962a96	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Hawke's Bay Region	HKB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bf62d50d-85a8-436a-8421-88b29b8aa337	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Manawatu-Wanganui Region	MWT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2b9e81cc-d27a-437b-92b8-d795321793b2	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Marlborough Region	MBH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f9390533-bfc6-443c-b137-1f7d3ee82380	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Nelson Region	NSN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1719e01e-0c26-4879-a127-fbe9f8b33752	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Northland Region	NTL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9ee28047-f4ed-40e2-9721-f2a3be6b4999	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Otago Region	OTA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a6ddf995-7b36-48db-bc3b-66436341ecff	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Southland Region	STL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
02be691f-cbe1-469c-aa38-c14f5ad7be9b	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Taranaki Region	TKI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
30f246bb-ac04-412c-8827-efaaa121e80b	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Tasman District	TAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
73a337ac-30d0-4e58-9e43-d14fc031243a	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Waikato Region	WKO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7ada26a6-3246-4752-bd36-8cf2459aa49f	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	Wellington Region	WGN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a7a6a08d-d54a-410c-95fa-9a46ab45fbaa	bf9e18a9-d6bd-4dd4-990a-6ae2ed6f008b	West Coast Region	WTC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bebcdd2b-07a5-4cc5-a7d3-7a871f2ad8b0	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Boaco	BO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4c2e03ff-4703-4d14-8b58-13260ded6bb5	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Carazo	CA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1bb41324-b468-4d50-95a7-14654f2b32cd	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Chinandega	CI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cc31b4d2-6db6-4bcf-96f1-d265243b9a09	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Chontales	CO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
60c1b261-e1b8-4667-9a94-1de8b3ab47d8	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Estelí	ES	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
82fa0e22-c7fa-4925-806a-2b6913dfc7cb	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Granada	GR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
73b9dd6f-041d-4a41-9edf-1426ebf5ebee	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Jinotega	JI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
afa80ab6-6058-4bef-aa09-af7ab8d968a0	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	León	LE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c489f324-8d7d-4774-8b94-d234aa7b5e29	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Madriz	MD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
43e1703d-eded-4128-9e1e-ee6bfec94c6d	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Managua	MN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
22b9d2dc-bb4b-468c-a87e-aacf47bbb7d5	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Masaya	MS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1bf97201-3f79-4e23-8a50-0ab6c76f9833	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Matagalpa	MT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ff933a81-389a-474c-902b-bf9eff66169b	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	North Caribbean Coast	AN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b06e1499-5688-427a-9996-7bcf2e71ec63	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Nueva Segovia	NS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1f0708ff-0a3c-4cfe-8b8f-9611b6af4584	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Rivas	RI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
690bdcaa-0e53-49fe-8325-4902b2cdb97f	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	Río San Juan	SJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
827a9f50-fd8c-4fb5-87ec-279bd9d23427	fdbc1719-c5c1-4d83-867c-0bf7ee9f0cc6	South Caribbean Coast	AS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d4f382f2-a4a2-4ca3-bb66-2dbbfd112c87	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Agadez Region	1	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2cda7de3-71bf-4a5a-a472-a4df09d50933	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Diffa Region	2	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
78f0a9aa-7b42-4b34-9c42-792cb4fca157	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Dosso Region	3	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
679719f8-154b-4377-b91c-a2aedf2a372e	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Maradi Region	4	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
eb3ed89f-3981-48e6-810e-cbe12d4f8292	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Tahoua Region	5	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9cf83583-4243-4f46-97e9-068ef3fcc114	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Tillabéri Region	6	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4989ade2-a01f-473d-9385-e1723e7e7f6f	866d8f70-b2e3-4281-bb41-0f76ff2f9315	Zinder Region	7	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f49ee7b7-7eb0-4209-9a2e-e72b4653bde6	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Abia	AB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
74bd6c70-b731-4d33-993f-7603898a3afa	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Abuja Federal Capital Territory	FC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6bc3dcc1-414e-453f-ac7d-1d0ae88339f2	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Adamawa	AD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d72a155c-7fed-4c9e-8171-8921ae43aa82	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Akwa Ibom	AK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1144b646-3473-4c75-befa-a286eed0945e	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Anambra	AN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
42364588-6ca5-4609-bfa0-4a118455c2d9	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Bauchi	BA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
30b591ad-0052-421a-aa28-afbc8761e5f0	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Bayelsa	BY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
feeffa7e-41d7-46f9-8ba1-72da058ddeb9	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Benue	BE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
22569b94-934b-4397-821c-71b7953ee3cd	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Borno	BO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b9eeb432-52d6-4deb-9f79-c6f9492edb63	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Cross River	CR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e62c3fd6-0991-42c3-9574-1f5301c53d59	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Delta	DE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a29172bb-ef35-480d-806a-935fa81423dd	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Ebonyi	EB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d4730f22-366d-432a-b440-3045ffa83df8	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Edo	ED	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e00682c9-191e-4b93-a347-6dee9acca7d0	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Ekiti	EK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
755a6ab4-b91c-4769-af94-f2b0766ae4ed	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Enugu	EN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2d79e3cb-6d0c-46d1-8bce-0c4b35b1803f	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Gombe	GO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6b37a102-c7d5-444d-97da-29fd7f53bbc8	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Imo	IM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2dcbe0a4-1e6b-420f-aa2d-1df8c7482e3a	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Jigawa	JI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
abfddc1d-927d-462e-b210-e992d89d0b65	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Kaduna	KD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
34ca674b-90f3-4de0-9b52-5ac3bfbe74b0	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Kano	KN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e3a30e1f-6ee2-410b-a62a-c3a5aa7ac8f3	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Katsina	KT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
adb50c56-e24e-444c-a81f-e27f70858cb7	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Kebbi	KE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c7fffec3-472f-4a38-8300-89198b9246be	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Kogi	KO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b55a1ad4-94ae-4172-8eb1-7a23264688ba	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Kwara	KW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
63f2fa70-539d-4201-a8eb-46cc3eb893e1	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Lagos	LA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dc69ecf2-d02d-4315-abe3-f2e31e748dca	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Nasarawa	NA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
880fc9a2-89b3-4612-8cf3-45800dbadbbe	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Niger	NI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
591d8235-d9ba-4e4f-8d85-6d6dc76c15fa	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Ogun	OG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b4dd537d-52f2-44cd-91ff-f2da4180add4	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Ondo	ON	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a7d3b96b-e1f9-4f09-92f6-6f14a89ae105	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Osun	OS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b4347c81-5607-442b-8085-2f3f02a40936	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Oyo	OY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
48a96dd1-288c-476f-aef2-b82dff0072c4	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Plateau	PL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c75c80fa-1a08-4319-848c-64824fb95b08	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Rivers	RI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
81654032-e10e-426f-ae51-a8c0459499b8	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Sokoto	SO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f619f387-7cdf-4673-88ca-c622017bbc6e	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Taraba	TA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
89fba1f9-74ff-45a0-b2b1-e107b915395c	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Yobe	YO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4bb9f178-2592-4a13-9fde-df650a7beadf	21a1ff5d-ba41-4f85-a278-680e2b2eacdd	Zamfara	ZA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
40b6e165-d5ed-40c2-9805-c3e2492217da	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Akershus	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
effbd80a-3a4a-4916-882e-56add77e5c3b	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Buskerud	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dd5fc931-a169-4220-8307-be259f6fd682	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Finnmark	20	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
abbcddc4-d322-4357-a795-f234c48a24e7	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Hedmark	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4fe7f176-f5ad-4f03-8d63-4296b327362b	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Hordaland	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e1fa7950-38a0-4d44-a6a1-8a7568644c57	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Jan Mayen	22	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
48c2d149-da79-4166-aa7d-9285f91eda3b	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Møre og Romsdal	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3fd88c80-93d7-4073-b7bb-b2799c43ae07	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Nord-Trøndelag	17	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8b481837-d85f-416e-99e8-e7563c9b47d5	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Nordland	18	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b5f7612c-9f1a-4b6d-877b-7c09131925eb	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Oppland	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a87d5334-af99-4f31-bc00-a312cd2bd857	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Oslo	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e02a1693-892b-422d-be69-12c1ae6dfb10	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Rogaland	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fdd2c400-9bc9-436a-bdea-b211db0d23f5	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Sogn og Fjordane	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
28c3aaa3-e714-4774-ae68-f05d79104152	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Svalbard	21	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bce125b9-06d5-44f2-ba6b-b59e405f8767	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Sør-Trøndelag	16	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2813bbee-9011-47c5-9c16-8bc5f2bcc1b7	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Telemark	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2a904f09-ed64-4333-873a-3c95cfa357e4	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Troms	19	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0f98aca2-1b38-4ae8-b165-4bc059507bd9	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Trøndelag	50	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4df51f9e-0035-45b2-8e27-da5d969ab0e9	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Vest-Agder	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
33d6ab18-4d9d-4dc5-8c56-d3b19c1f6bb4	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Vestfold	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
90bc4525-ff40-466c-8f94-d7e4184ad53f	ab79045f-569c-4be3-a39e-3f73fadfb6b7	Østfold	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a89ba304-7675-4bdd-8b0e-745d637c362e	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Ad Dakhiliyah Governorate	DA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
aecba848-ae40-498e-bc02-7e81992626e2	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Ad Dhahirah Governorate	ZA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0a188c13-ef7d-436c-8541-5202cca859db	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Al Batinah North Governorate	BS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e0bc38c7-bae5-4928-82d1-9093e0a4cbaa	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Al Batinah Region	BA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
185886da-f5fb-4a4d-a8c7-e731c7a2c606	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Al Batinah South Governorate	BJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b02f1065-f4c4-447d-91c2-8a8a95f76ed9	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Al Buraimi Governorate	BU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
64168f71-8242-4436-a62d-daece3c861c3	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Al Wusta Governorate	WU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5e2ba0a3-14a0-4355-9b32-7171c55c44f3	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Ash Sharqiyah North Governorate	SS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a6dfe206-6b3b-47a1-9fe6-9e892cc8ac2e	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Ash Sharqiyah Region	SH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f0e6ee03-d9c7-4752-85a6-4b570ad12e96	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Ash Sharqiyah South Governorate	SJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e0c2d6ef-2560-45df-be2c-0c64cb5ea3e5	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Dhofar Governorate	ZU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4d09675f-d260-4fb4-b76f-06e31d9869b1	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Musandam Governorate	MU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
50f1aae7-a984-4762-bb9b-51c93653c45f	9a11b0ba-e4ee-4826-bc9e-34964cc7bbff	Muscat Governorate	MA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fce96353-a217-407b-af28-164ab141a41f	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Azad Kashmir	JK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
16d861c0-c069-44ed-acfc-4d5fb81a16b6	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Balochistan	BA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
794d5267-d894-4090-a31f-2e1fe105df6f	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Federally Administered Tribal Areas	TA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ae44ebba-1389-4440-8482-ccf16cab9533	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Gilgit-Baltistan	GB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3bf0f24c-0775-4a50-a7c9-64bb9611a8b7	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Islamabad Capital Territory	IS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c799eb1c-f3b3-4206-a8a3-591da85cb7a6	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Khyber Pakhtunkhwa	KP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
17335ec8-c18e-4e5f-858d-86b85eb9e462	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Punjab	PB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ba280975-f638-4564-b62b-6ee2717e877b	f5b058d9-ea3c-4da4-8291-80df8d59f0bd	Sindh	SD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ca0cc2f7-13bc-417f-b8ff-060fba5b4557	432c1cfa-b97b-4a97-8254-0840e6577980	Aimeliik	002	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
26bd3e91-9840-43af-a711-a8fc01fbf385	432c1cfa-b97b-4a97-8254-0840e6577980	Airai	004	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5102a086-d78d-40ef-a914-50dc26beec0d	432c1cfa-b97b-4a97-8254-0840e6577980	Angaur	010	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0f396d1a-cd18-48de-b4e9-4f8959bfd909	432c1cfa-b97b-4a97-8254-0840e6577980	Hatohobei	050	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a5540835-a185-4072-bb8e-de357f9f3f7f	432c1cfa-b97b-4a97-8254-0840e6577980	Kayangel	100	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c1e9bd80-20c0-4c39-932b-92742e0e4c09	432c1cfa-b97b-4a97-8254-0840e6577980	Koror	150	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7378eaf6-d935-4f61-9e59-ac8d823bc1b0	432c1cfa-b97b-4a97-8254-0840e6577980	Melekeok	212	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b1da1dfc-c751-4a18-9bbd-6ea8d940f09f	432c1cfa-b97b-4a97-8254-0840e6577980	Ngaraard	214	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1a15bf6d-5d32-4942-a968-ccc296cb8f20	432c1cfa-b97b-4a97-8254-0840e6577980	Ngarchelong	218	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
aa29d42a-c49b-447a-9dda-a54ed67350a1	432c1cfa-b97b-4a97-8254-0840e6577980	Ngardmau	222	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2993f9fd-8161-43ed-b409-a07df64e9b12	432c1cfa-b97b-4a97-8254-0840e6577980	Ngatpang	224	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
47dc2e1d-1d7a-4a9d-a8a9-8abe19f603ba	432c1cfa-b97b-4a97-8254-0840e6577980	Ngchesar	226	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5bd1b8b5-3bfc-432c-86a5-bfe8f588ef13	432c1cfa-b97b-4a97-8254-0840e6577980	Ngeremlengui	227	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
03f5d4de-b9b1-40a4-9e3d-96112342b512	432c1cfa-b97b-4a97-8254-0840e6577980	Ngiwal	228	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5bae0f70-6ea2-479f-ab44-c4edec895644	432c1cfa-b97b-4a97-8254-0840e6577980	Peleliu	350	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
41e9488b-9889-4a06-bc9c-a5834cdfe4d9	432c1cfa-b97b-4a97-8254-0840e6577980	Sonsorol	370	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d1f32f88-a06a-4cd4-b19a-b919b4ada33a	f528827c-9963-4bc2-a892-98713bff3e09	Bocas del Toro Province	1	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8279644e-ec4b-4065-904f-d442f346ccd6	f528827c-9963-4bc2-a892-98713bff3e09	Chiriquí Province	4	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
665925ee-c644-4502-b153-deac02c0f031	f528827c-9963-4bc2-a892-98713bff3e09	Coclé Province	2	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6884ad6a-adbe-4e0c-afd7-db91970135b4	f528827c-9963-4bc2-a892-98713bff3e09	Colón Province	3	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3934956c-a363-4065-ac58-8ede87cdbeba	f528827c-9963-4bc2-a892-98713bff3e09	Darién Province	5	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f2ecfcab-1259-447a-9c32-161eddba1412	f528827c-9963-4bc2-a892-98713bff3e09	Emberá-Wounaan Comarca	EM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1befea18-8fba-4a7a-b00e-c71dc1e42b79	f528827c-9963-4bc2-a892-98713bff3e09	Guna Yala	KY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9b092da5-f994-4a06-b5f2-2e3663bab68b	f528827c-9963-4bc2-a892-98713bff3e09	Herrera Province	6	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6b7a2914-e3e7-411b-8f98-9e88fc01d22f	f528827c-9963-4bc2-a892-98713bff3e09	Los Santos Province	7	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
74712018-8255-4ba1-bca3-3517ccd01118	f528827c-9963-4bc2-a892-98713bff3e09	Ngöbe-Buglé Comarca	NB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cc237d9e-613c-43c5-8f94-5e9ea29c1a1b	f528827c-9963-4bc2-a892-98713bff3e09	Panamá Oeste Province	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f1acd007-4726-4c8a-ab91-0f5bb94ace1d	f528827c-9963-4bc2-a892-98713bff3e09	Panamá Province	8	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5a8bcf83-196c-4e08-975f-00fe6a0c7604	f528827c-9963-4bc2-a892-98713bff3e09	Veraguas Province	9	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
92020ec6-d63f-4e92-bf3f-ac8680ce482f	582364f4-772c-4db1-9ee9-a0905831fd73	Bougainville	NSB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ac7657d2-cf75-4bc8-b5da-c96741c006c0	582364f4-772c-4db1-9ee9-a0905831fd73	Central Province	CPM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f52df0c0-d712-407b-8888-3ac19e0b8e58	582364f4-772c-4db1-9ee9-a0905831fd73	Chimbu Province	CPK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3f688832-f19a-4bad-8fa4-60d1590190f3	582364f4-772c-4db1-9ee9-a0905831fd73	East New Britain	EBR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f8680189-fa14-4a8d-902a-95d9b1be6498	582364f4-772c-4db1-9ee9-a0905831fd73	Eastern Highlands Province	EHG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d0b2ec6c-fde6-4514-9443-2d885adf57d3	582364f4-772c-4db1-9ee9-a0905831fd73	Enga Province	EPW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ff977da3-a2e4-43e4-b5dd-15c17e257d7e	582364f4-772c-4db1-9ee9-a0905831fd73	Gulf	GPK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e5268c67-a78f-40ef-963b-0c04bf0559ab	582364f4-772c-4db1-9ee9-a0905831fd73	Hela	HLA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b5148d30-efbc-4f2f-b7ac-cc7795aa66bf	582364f4-772c-4db1-9ee9-a0905831fd73	Jiwaka Province	JWK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f5f62553-3ebc-406e-a9ef-56d7a128aaf0	582364f4-772c-4db1-9ee9-a0905831fd73	Madang Province	MPM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bddf4ce2-b35f-44dc-8460-f5487988d0ba	582364f4-772c-4db1-9ee9-a0905831fd73	Manus Province	MRL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4880ddb2-3208-4b24-aeec-e763702e357d	582364f4-772c-4db1-9ee9-a0905831fd73	Milne Bay Province	MBA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ff96e648-2726-4784-98d8-bbd5fb50efdd	582364f4-772c-4db1-9ee9-a0905831fd73	Morobe Province	MPL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
777d63c4-172b-41d8-8fd2-da66d6c0071f	582364f4-772c-4db1-9ee9-a0905831fd73	New Ireland Province	NIK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ded7bb62-b7b8-492f-bb67-6e36a37d6f08	582364f4-772c-4db1-9ee9-a0905831fd73	Oro Province	NPP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d392376b-f685-4421-9475-1e45a6d750e9	582364f4-772c-4db1-9ee9-a0905831fd73	Port Moresby	NCD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5eb78d06-4460-4c37-85e2-2de9a623d010	582364f4-772c-4db1-9ee9-a0905831fd73	Sandaun Province	SAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c7c08a8e-b6bb-45eb-90dc-6f5173b89577	582364f4-772c-4db1-9ee9-a0905831fd73	Southern Highlands Province	SHM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
89a3f0fd-785b-440d-86e1-6833788258ff	582364f4-772c-4db1-9ee9-a0905831fd73	West New Britain Province	WBK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
373a87f9-26ec-4970-aa20-02bcab0bc3f5	582364f4-772c-4db1-9ee9-a0905831fd73	Western Highlands Province	WHM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a00ad1c1-37f6-4c79-97a0-fe0e15221270	582364f4-772c-4db1-9ee9-a0905831fd73	Western Province	WPD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9228ebb7-3d60-4802-a43c-111b6d962a07	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Alto Paraguay Department	16	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d7c3e134-30b2-4b78-abd0-4fddb7247a75	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Alto Paraná Department	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5ff2e465-cc61-40e1-927a-63a923ad9afd	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Amambay Department	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c4d82a11-1ec0-4624-83ea-83ad282a1a56	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Boquerón Department	19	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
18f29575-2c91-4817-8860-2eaa935fa88e	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Caaguazú	5	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dbfd3ba1-0cf4-4e34-91bc-d1e61314fde6	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Caazapá	6	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9794e97f-689b-4295-8f08-b395d4cc27aa	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Canindeyú	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
59700766-0e01-4639-b3a9-dacc59f8e71f	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Central Department	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
abfba44e-db79-4a77-9f1b-448a8ddad86a	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Concepción Department	1	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
81ccf499-fee0-428c-9c29-e415c1261f81	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Cordillera Department	3	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
58b045a3-9f43-4112-b228-ab805acda46c	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Guairá Department	4	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
582dcb50-01a1-46ef-b6da-dcdc04c6a63e	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Itapúa	7	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2966cbdb-b659-4e60-ba7a-4be87c54b824	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Misiones Department	8	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5308fce5-d7c6-4324-a459-9f2ac40b7113	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Paraguarí Department	9	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
eab42987-8373-43af-b507-54d77e177329	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Presidente Hayes Department	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a8480b35-9f9c-4697-8935-398f9ba78aad	110cc0d3-6f7c-4760-b50a-684acd34f7e3	San Pedro Department	2	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1bd5259a-4a2a-4a7d-bbe6-6d3cef202274	110cc0d3-6f7c-4760-b50a-684acd34f7e3	Ñeembucú Department	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1076fbe9-29be-4a9e-aaf0-57a9beb5aa41	5cf8ee0c-7848-4d9f-806d-8150632c0572	Amazonas	AMA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e0b7ebd1-0a86-4221-b079-d616129afb6c	5cf8ee0c-7848-4d9f-806d-8150632c0572	Apurímac	APU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8e048ca2-4de7-45fe-b109-a132c913e181	5cf8ee0c-7848-4d9f-806d-8150632c0572	Arequipa	ARE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
62b05bf4-2e5c-4916-b30a-1af91c5a4f4a	5cf8ee0c-7848-4d9f-806d-8150632c0572	Ayacucho	AYA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
024fa05a-ee42-4d5e-a84e-860505858fc8	5cf8ee0c-7848-4d9f-806d-8150632c0572	Cajamarca	CAJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
52e48665-296c-4819-87fd-44c176d2ea32	5cf8ee0c-7848-4d9f-806d-8150632c0572	Callao	CAL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2edb636f-147a-4626-a97e-fd0f86a07f56	5cf8ee0c-7848-4d9f-806d-8150632c0572	Cusco	CUS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
65d722ff-cc44-4d8d-8cbd-cd94dace38d0	5cf8ee0c-7848-4d9f-806d-8150632c0572	Huancavelica	HUV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b83298e1-a05e-46ae-8a59-5879ae7b8dd2	5cf8ee0c-7848-4d9f-806d-8150632c0572	Huanuco	HUC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8d6c5cbe-a08b-44f0-aaa9-164772735313	5cf8ee0c-7848-4d9f-806d-8150632c0572	Ica	ICA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a0500703-58bc-4101-897f-5591b626506f	5cf8ee0c-7848-4d9f-806d-8150632c0572	Junín	JUN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9bdc9a8b-7d40-43df-9b4b-ea72dfdb24ee	5cf8ee0c-7848-4d9f-806d-8150632c0572	La Libertad	LAL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
79c5c014-57a5-4c20-98be-1922f90a9ab4	5cf8ee0c-7848-4d9f-806d-8150632c0572	Lambayeque	LAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
02c30637-9e6f-4e96-963a-733b554c67af	5cf8ee0c-7848-4d9f-806d-8150632c0572	Lima	LIM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6e330a6c-1b27-4864-ae5a-bfecab366903	5cf8ee0c-7848-4d9f-806d-8150632c0572	Loreto	LOR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cb07c5e3-5eeb-438f-af16-584c1236fad4	5cf8ee0c-7848-4d9f-806d-8150632c0572	Madre de Dios	MDD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fb958645-5b4b-46a2-978c-efa5103a23c5	5cf8ee0c-7848-4d9f-806d-8150632c0572	Moquegua	MOQ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c3edd263-7efa-47e5-83d6-bbc186282630	5cf8ee0c-7848-4d9f-806d-8150632c0572	Pasco	PAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
df09867d-d512-4c72-80ce-d9a40d54519c	5cf8ee0c-7848-4d9f-806d-8150632c0572	Piura	PIU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a3086f77-d13d-44b9-8809-f75dd0f532ba	5cf8ee0c-7848-4d9f-806d-8150632c0572	Puno	PUN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b1ea7a43-0fd0-4aee-ad8e-f5396a3f544d	5cf8ee0c-7848-4d9f-806d-8150632c0572	San Martín	SAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
47e8a0cd-17c3-416c-a901-ac74171f53df	5cf8ee0c-7848-4d9f-806d-8150632c0572	Tacna	TAC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b7d1f389-3d64-4c9d-abca-876a9b446080	5cf8ee0c-7848-4d9f-806d-8150632c0572	Tumbes	TUM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c1f273de-a3ce-4cc2-a209-021593d05e53	5cf8ee0c-7848-4d9f-806d-8150632c0572	Ucayali	UCA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ede53209-895f-41d4-b1ad-e8cf7106f00e	5cf8ee0c-7848-4d9f-806d-8150632c0572	Áncash	ANC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0274d917-531a-480e-9390-48d758daf7d2	654b8e64-161b-402b-82ba-2ff13d04371c	Abra	ABR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
15de5c63-cd59-4595-a341-fef0bfa4750c	654b8e64-161b-402b-82ba-2ff13d04371c	Agusan del Norte	AGN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d00c1cbc-cfc8-4b54-a1b8-8a1b8d6891e2	654b8e64-161b-402b-82ba-2ff13d04371c	Agusan del Sur	AGS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ab8979b9-be81-4098-a36e-f05a02f8f806	654b8e64-161b-402b-82ba-2ff13d04371c	Aklan	AKL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c29a0fd3-ea33-4e5b-904c-ef4155c15b6c	654b8e64-161b-402b-82ba-2ff13d04371c	Albay	ALB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f31d33e8-88fb-48fc-8955-7f0db2a2b6b4	654b8e64-161b-402b-82ba-2ff13d04371c	Antique	ANT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
66000a72-be31-43b1-a69e-7eb47ff10314	654b8e64-161b-402b-82ba-2ff13d04371c	Apayao	APA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
74161779-bb0a-4600-90c7-92017ba8dd9a	654b8e64-161b-402b-82ba-2ff13d04371c	Aurora	AUR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6f41a9f6-e0c8-4eef-bb88-69809bb0ed23	654b8e64-161b-402b-82ba-2ff13d04371c	Autonomous Region in Muslim Mindanao	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9197358a-1c71-4574-a74b-597c37a087ed	654b8e64-161b-402b-82ba-2ff13d04371c	Basilan	BAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
847fd2ca-f496-4f30-b219-e2e50c1fe6ba	654b8e64-161b-402b-82ba-2ff13d04371c	Bataan	BAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1980496b-f569-460c-b9b5-579564ca5f90	654b8e64-161b-402b-82ba-2ff13d04371c	Batanes	BTN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ab20a2a5-a860-40ee-842e-868c96995286	654b8e64-161b-402b-82ba-2ff13d04371c	Batangas	BTG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a1e16b48-5729-4be7-890e-239dc5cef894	654b8e64-161b-402b-82ba-2ff13d04371c	Benguet	BEN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0e8e3138-79e7-4139-9013-90b587372e0e	654b8e64-161b-402b-82ba-2ff13d04371c	Bicol Region	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f92c6266-df5a-41fa-b3a3-90946aa19b8c	654b8e64-161b-402b-82ba-2ff13d04371c	Biliran	BIL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
689936b8-2c4a-4a75-9775-e27491a4002e	654b8e64-161b-402b-82ba-2ff13d04371c	Bohol	BOH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7b5f214d-a95d-41c6-b5ea-b41c1480879b	654b8e64-161b-402b-82ba-2ff13d04371c	Bukidnon	BUK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0d3a58a0-79f7-4354-b58d-36c855099f4d	654b8e64-161b-402b-82ba-2ff13d04371c	Bulacan	BUL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d8903629-b994-4bac-80c3-258a095d9e94	654b8e64-161b-402b-82ba-2ff13d04371c	Cagayan	CAG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c8efca42-7a85-438c-a344-03aad4b8e542	654b8e64-161b-402b-82ba-2ff13d04371c	Cagayan Valley	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
24f2c3ee-535f-4681-b5b5-3aee62c49e7c	654b8e64-161b-402b-82ba-2ff13d04371c	Calabarzon	40	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
947b1aa2-ad23-4a6a-9f9c-a1a7e6f10845	654b8e64-161b-402b-82ba-2ff13d04371c	Camarines Norte	CAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2a221763-735e-4aaf-9d92-e9db44f16ed3	654b8e64-161b-402b-82ba-2ff13d04371c	Camarines Sur	CAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
023d5237-990b-4adf-8667-e190668c3fa4	654b8e64-161b-402b-82ba-2ff13d04371c	Camiguin	CAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
24ad3838-c077-4437-8d3f-16ee3fdfb02b	654b8e64-161b-402b-82ba-2ff13d04371c	Capiz	CAP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f686520b-4c77-4f21-8dda-6a2e6a6fe66c	654b8e64-161b-402b-82ba-2ff13d04371c	Caraga	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6b61bc18-d166-4fe7-b9b9-9e6c93ff5cf0	654b8e64-161b-402b-82ba-2ff13d04371c	Catanduanes	CAT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
67f8f085-d5f3-4799-9563-0275f3f735ef	654b8e64-161b-402b-82ba-2ff13d04371c	Cavite	CAV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1e0885ca-09b2-4e23-b80d-233667d28f46	654b8e64-161b-402b-82ba-2ff13d04371c	Cebu	CEB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1a2264f5-ad18-4531-afa5-e3d084a314f3	654b8e64-161b-402b-82ba-2ff13d04371c	Central Luzon	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1792a6a0-b457-40e3-ae61-bb6e3ea1d5bd	654b8e64-161b-402b-82ba-2ff13d04371c	Central Visayas	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
79a81ab0-a4bf-4baa-bc36-e302e8c8c0df	654b8e64-161b-402b-82ba-2ff13d04371c	Compostela Valley	COM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
24de4765-642a-4ea2-864a-dd16897a2667	654b8e64-161b-402b-82ba-2ff13d04371c	Cordillera Administrative Region	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a1a6795-7bc8-45ce-a639-b07407037dc9	654b8e64-161b-402b-82ba-2ff13d04371c	Cotabato	NCO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
effaf846-b18b-4c08-b9af-7bbf57b07272	654b8e64-161b-402b-82ba-2ff13d04371c	Davao Occidental	DVO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f38b6e93-cd88-44fc-b2b3-6b270859ed5b	654b8e64-161b-402b-82ba-2ff13d04371c	Davao Oriental	DAO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ea1cb953-e5e5-4c8c-9c0c-4646f08edd56	654b8e64-161b-402b-82ba-2ff13d04371c	Davao Region	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
692f0ed4-0803-475e-91dd-34e0ea0107a4	654b8e64-161b-402b-82ba-2ff13d04371c	Davao del Norte	DAV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a362a483-a029-49a9-8b64-3b08048e0799	654b8e64-161b-402b-82ba-2ff13d04371c	Davao del Sur	DAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a6f3428-0200-4989-97ef-df13052e88e8	654b8e64-161b-402b-82ba-2ff13d04371c	Dinagat Islands	DIN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4cbb9a71-a145-4864-b63f-de1181c05215	654b8e64-161b-402b-82ba-2ff13d04371c	Eastern Samar	EAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2db4fced-72b7-486e-9f8c-47c29257e093	654b8e64-161b-402b-82ba-2ff13d04371c	Eastern Visayas	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dec24597-6758-43ca-b4e1-97076a8bcc21	654b8e64-161b-402b-82ba-2ff13d04371c	Guimaras	GUI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
117aa7f2-124c-4b5b-8716-9e6144eca431	654b8e64-161b-402b-82ba-2ff13d04371c	Ifugao	IFU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ad34def9-9530-4034-bd28-306d23eae4e6	654b8e64-161b-402b-82ba-2ff13d04371c	Ilocos Norte	ILN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
40288d18-fc8c-4492-b7aa-3a67870c224a	654b8e64-161b-402b-82ba-2ff13d04371c	Ilocos Region	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a91f461-6632-490c-a3fb-4e0f18591b51	654b8e64-161b-402b-82ba-2ff13d04371c	Ilocos Sur	ILS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
62cc71d3-f87c-451c-b306-28b15dbfeb65	654b8e64-161b-402b-82ba-2ff13d04371c	Iloilo	ILI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a9572d0-d79b-49a7-93ac-116485ddb19d	654b8e64-161b-402b-82ba-2ff13d04371c	Isabela	ISA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
66d7fe9c-2c75-41f0-b95d-d83cc872c7ec	654b8e64-161b-402b-82ba-2ff13d04371c	Kalinga	KAL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
381f61ab-63c2-4cb5-91e6-182c4213059c	654b8e64-161b-402b-82ba-2ff13d04371c	La Union	LUN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
46c089c6-e9b9-44ac-8579-cb8d4da4cf12	654b8e64-161b-402b-82ba-2ff13d04371c	Laguna	LAG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dd4e2d9a-b21d-4011-adb9-423cc896ca11	654b8e64-161b-402b-82ba-2ff13d04371c	Lanao del Norte	LAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6f1db9d8-cd21-46f3-88a4-4d5c74712221	654b8e64-161b-402b-82ba-2ff13d04371c	Lanao del Sur	LAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
66385af6-1d93-454d-9399-59712defe5e9	654b8e64-161b-402b-82ba-2ff13d04371c	Leyte	LEY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b6920214-46cb-4fb8-8aa8-1e2a178cd800	654b8e64-161b-402b-82ba-2ff13d04371c	Maguindanao	MAG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
85218c6c-74f8-4bb5-813e-0ffdb56b6acf	654b8e64-161b-402b-82ba-2ff13d04371c	Marinduque	MAD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d789800d-1b77-4bd5-8891-1ed21b5c1979	654b8e64-161b-402b-82ba-2ff13d04371c	Masbate	MAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f58b5c3b-b5d9-4cba-82c6-a175a8c04033	654b8e64-161b-402b-82ba-2ff13d04371c	Metro Manila	NCR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
64ca3b8e-84c4-4a35-9029-4ae62e7937cf	654b8e64-161b-402b-82ba-2ff13d04371c	Mimaropa	41	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b350b78f-2eb7-464e-8656-c83e5679fdc8	654b8e64-161b-402b-82ba-2ff13d04371c	Misamis Occidental	MSC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a9949afd-f5b6-4d89-905b-59ef5d355b74	654b8e64-161b-402b-82ba-2ff13d04371c	Misamis Oriental	MSR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a187fe02-461a-46ab-85d4-50ec880158f2	654b8e64-161b-402b-82ba-2ff13d04371c	Mountain Province	MOU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
112642f9-221e-4680-a049-b09066b7e99d	654b8e64-161b-402b-82ba-2ff13d04371c	Negros Occidental	NEC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5bab66f1-1a0c-40b1-ba71-3de5ac962579	654b8e64-161b-402b-82ba-2ff13d04371c	Negros Oriental	NER	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7dd6f4ce-5f85-4996-a152-dd5c130a285f	654b8e64-161b-402b-82ba-2ff13d04371c	Northern Mindanao	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
093ee1ab-8bf5-4f6b-9d6e-b5ac324a2cb6	654b8e64-161b-402b-82ba-2ff13d04371c	Northern Samar	NSA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b7f4533b-402e-494b-ba56-c04cffc1463a	654b8e64-161b-402b-82ba-2ff13d04371c	Nueva Ecija	NUE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a08a0dc4-f4b2-422e-ad34-6cb76e00e6d6	654b8e64-161b-402b-82ba-2ff13d04371c	Nueva Vizcaya	NUV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
05724b30-f591-45ae-816b-bec0d78e5abf	654b8e64-161b-402b-82ba-2ff13d04371c	Occidental Mindoro	MDC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1f936c98-7ee4-4ce4-a36a-2445c0a2ccf5	654b8e64-161b-402b-82ba-2ff13d04371c	Oriental Mindoro	MDR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
999ba39d-f389-42c7-a81c-fadc48fc654f	654b8e64-161b-402b-82ba-2ff13d04371c	Palawan	PLW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5d907a82-f1cd-46c3-b66b-efb101da1312	654b8e64-161b-402b-82ba-2ff13d04371c	Pampanga	PAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ba342c81-4ab9-4d82-9313-d1265583c2af	654b8e64-161b-402b-82ba-2ff13d04371c	Pangasinan	PAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
576c2e7e-7f4a-4b21-af6c-aa6d377b85ec	654b8e64-161b-402b-82ba-2ff13d04371c	Quezon	QUE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6d8cb4c1-e881-4758-9ae8-b511ab86debf	654b8e64-161b-402b-82ba-2ff13d04371c	Quirino	QUI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
723a3277-4868-437e-9b88-97f8b03d31ab	654b8e64-161b-402b-82ba-2ff13d04371c	Rizal	RIZ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4129af32-b5a3-433d-b3c5-39d64dc3a1bf	654b8e64-161b-402b-82ba-2ff13d04371c	Romblon	ROM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
19b46d04-42ab-45ca-b92e-dc3f886da5eb	654b8e64-161b-402b-82ba-2ff13d04371c	Sarangani	SAR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
03e3fc82-f9cb-4e5f-921f-abc947eccabe	654b8e64-161b-402b-82ba-2ff13d04371c	Siquijor	SIG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d58e2e56-14d4-4c93-854b-4faf2cb95fe1	654b8e64-161b-402b-82ba-2ff13d04371c	Soccsksargen	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f7e89b1b-333c-4352-8941-ebec0925e725	654b8e64-161b-402b-82ba-2ff13d04371c	Sorsogon	SOR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ea53a9e4-dc63-4bf3-9400-61de84895429	654b8e64-161b-402b-82ba-2ff13d04371c	South Cotabato	SCO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ba4dc3b6-780a-473e-8f6b-12ed7114ea25	654b8e64-161b-402b-82ba-2ff13d04371c	Southern Leyte	SLE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4bcc6f81-256f-4c0d-942a-4b97152ad469	654b8e64-161b-402b-82ba-2ff13d04371c	Sultan Kudarat	SUK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7f7f87a0-3396-4791-a1c2-f273f9315fc9	654b8e64-161b-402b-82ba-2ff13d04371c	Sulu	SLU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
15c5fc3a-530d-4e97-9c0e-59a652387e03	654b8e64-161b-402b-82ba-2ff13d04371c	Surigao del Norte	SUN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
955bcc26-d8d2-4a43-a8d0-1f3012d3f123	654b8e64-161b-402b-82ba-2ff13d04371c	Surigao del Sur	SUR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5630e736-af03-46b7-91a7-d5b216edcb43	654b8e64-161b-402b-82ba-2ff13d04371c	Tarlac	TAR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
43ccb403-05af-4d5d-a8fe-871470ced3d0	654b8e64-161b-402b-82ba-2ff13d04371c	Tawi-Tawi	TAW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8076f9d8-d21e-4fdb-826b-7033f8776641	654b8e64-161b-402b-82ba-2ff13d04371c	Western Visayas	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a1289cd0-3854-4186-a308-aeb921a3a3e1	654b8e64-161b-402b-82ba-2ff13d04371c	Zambales	ZMB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
063a2448-7fa8-4758-9219-95035bf87d06	654b8e64-161b-402b-82ba-2ff13d04371c	Zamboanga Peninsula	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3cc25d00-2430-485c-9580-24c79287861d	654b8e64-161b-402b-82ba-2ff13d04371c	Zamboanga Sibugay	ZSI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
261d0e02-aae7-4ea2-bb95-297031b6bda4	654b8e64-161b-402b-82ba-2ff13d04371c	Zamboanga del Norte	ZAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6075d905-4570-4044-b686-0a1740867b42	654b8e64-161b-402b-82ba-2ff13d04371c	Zamboanga del Sur	ZAS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d2875876-7e56-4637-b8d3-a034eb0f8c45	c2a87456-a3df-407a-afbe-800e99717517	Greater Poland Voivodeship	WP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a022195e-751d-4816-a9aa-841f038c5b69	c2a87456-a3df-407a-afbe-800e99717517	Kuyavian-Pomeranian Voivodeship	KP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c525135c-1fcb-4890-9bf4-fac96bae039e	c2a87456-a3df-407a-afbe-800e99717517	Lesser Poland Voivodeship	MA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2741c9f5-7c8a-4c17-bdf4-f1c99aede01b	c2a87456-a3df-407a-afbe-800e99717517	Lower Silesian Voivodeship	DS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5ffe6b80-17a0-43ce-be47-2f5e72d9f510	c2a87456-a3df-407a-afbe-800e99717517	Lublin Voivodeship	LU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3dbed828-86b7-4a7b-9593-dd5b41ebbc3e	c2a87456-a3df-407a-afbe-800e99717517	Lubusz Voivodeship	LB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b619dbe6-d13d-48a6-82a5-59091a4d780f	c2a87456-a3df-407a-afbe-800e99717517	Masovian Voivodeship	MZ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fedaf11f-3f17-4537-9630-74ada6e1b43f	c2a87456-a3df-407a-afbe-800e99717517	Opole Voivodeship	OP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
20084629-d220-494c-b3cf-fb0714244e3f	c2a87456-a3df-407a-afbe-800e99717517	Podkarpackie Voivodeship	PK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ee0f62c4-2780-4d04-9458-d46b19c72e7b	c2a87456-a3df-407a-afbe-800e99717517	Podlaskie Voivodeship	PD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8cd94f88-1235-40d9-8d3f-8f096f158a9d	c2a87456-a3df-407a-afbe-800e99717517	Pomeranian Voivodeship	PM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
db3c62d1-c2fa-473f-af49-86170610a18f	c2a87456-a3df-407a-afbe-800e99717517	Silesian Voivodeship	SL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2c509996-7729-4028-ac3b-f477c6bd5f30	c2a87456-a3df-407a-afbe-800e99717517	Warmian-Masurian Voivodeship	WN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ac2c68aa-ad9d-45bb-9917-9bb8733080fb	c2a87456-a3df-407a-afbe-800e99717517	West Pomeranian Voivodeship	ZP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fbec9383-8049-4e79-9e0c-d5e4c6cc7dd7	c2a87456-a3df-407a-afbe-800e99717517	Łódź Voivodeship	LD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a26ce72c-aac6-492e-ac77-059b0363f8d0	c2a87456-a3df-407a-afbe-800e99717517	Świętokrzyskie Voivodeship	SK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
243a5d48-db1f-4ce7-a8f2-5765f9fd5096	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Aveiro	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0bf50f0f-02fb-423d-977e-0b2dd46b6389	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Açores	20	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a7d509c0-5158-424f-840b-1b25a9213733	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Beja	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
aaf90237-32b9-4a13-89e8-875fe9aae429	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Braga	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1d921bf3-7ba1-42e5-bbbe-179028b6ecdd	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Bragança	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3de04267-93ac-4647-b14c-08f3808ab35e	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Castelo Branco	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9fbbd340-7853-4232-a899-222abee1a99a	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Coimbra	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a6cb10fc-5b6d-41da-b11e-f29518a050ca	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Faro	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fcadfe39-efcd-48ee-977b-7cc57169b131	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Guarda	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
af10e59a-a736-448d-b400-2b1c97847485	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Leiria	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f73231f1-6455-4365-a73f-33cf930b73c7	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Lisbon	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
680fafcf-7c83-43f9-bc2b-b44e78746d3f	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Madeira	30	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
914a9bc3-b746-43ce-b9d2-05c24acb0571	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Portalegre	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
449a3f8b-676b-415f-8737-5fbaa155ce8d	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Porto	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
42dfe7b5-5bfc-4f92-82b0-b3d9b4508e84	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Santarém	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
37e4fefe-e2fa-4190-93f8-2e2d9b348d53	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Setúbal	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a40b493c-db00-4801-9864-d42b88b56d66	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Viana do Castelo	16	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7af1f12a-051c-4326-bce7-517cc859d861	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Vila Real	17	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
493a4168-4610-4ff9-a2a0-5a9e06bf324d	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Viseu	18	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
32826ede-2a33-4344-8ce6-174e35e140cc	0ae0e1df-6e54-42d8-aaff-d9ad00246913	Évora	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7de6fba0-8248-4fdb-9fe8-38ce731c4f9d	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Al Daayen	ZA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7389a176-ab52-4313-836e-59fc11d9b1c4	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Al Khor	KH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8d99b25e-6c14-4a1f-a0ff-45392961da5a	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Al Rayyan Municipality	RA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
14ba485a-c197-4786-8606-65f2b2c4d3e8	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Al Wakrah	WA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7abf1790-98ee-48b4-8927-80f3b6408744	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Al-Shahaniya	SH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ca29e21a-387c-487b-ae88-fca32cf9569d	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Doha	DA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
990818cf-46aa-4fe6-8860-deee01e23043	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Madinat ash Shamal	MS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
60b4095f-4848-44ef-b90c-dd14e8cb8f3f	3b3f3f2b-62e1-4126-8a6a-94708113a30d	Umm Salal Municipality	US	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0ddfdb48-09df-417e-982c-5c14ef2a9886	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Alba	AB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
795b206a-4eff-4a08-827e-40ffd85f29b6	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Arad County	AR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
82930729-b4b9-43ee-8ce0-a116d93b88b0	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Arges	AG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c87b2c2d-5648-4383-b9f9-0a1ee0ef6d8b	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Bacău County	BC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7ed69af3-db5d-4b73-920c-7880a185a734	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Bihor County	BH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e88930db-56b9-4b91-ab67-d5a028994fcf	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Bistrița-Năsăud County	BN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fee23dd7-5ec0-42b7-8ab8-ca95562c6677	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Botoșani County	BT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
53bb4d71-f8ac-42ea-9582-cee371d4f927	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Braila	BR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9c703d08-48b5-4e8a-8ca7-c0b273eccaf3	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Brașov County	BV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fe6bc429-cfac-4a1f-9eba-3b50e66791ba	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Bucharest	B	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
477adc52-22d1-4a4f-b4db-ac5754185027	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Buzău County	BZ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f41a18fe-f366-42f7-bfa9-61034c8fd667	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Caraș-Severin County	CS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9746eb7e-0dff-4f37-8be3-b059a0f41a93	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Cluj County	CJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
21c52b33-d873-4707-a55b-d138e797b424	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Constanța County	CT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ffd0265d-7d28-4a97-af51-9a5e9becc673	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Covasna County	CV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9a616b1a-5209-472b-ae10-63df33cae650	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Călărași County	CL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
de54a52b-5f89-4983-9777-1c8838626773	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Dolj County	DJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5aac5442-d806-4518-97a8-81647ee31c73	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Dâmbovița County	DB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b07af722-7b56-4d12-92f1-0065284b5f39	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Galați County	GL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ad86ee7c-5297-4c37-aafa-cf0c1edbaff3	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Giurgiu County	GR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3d9aef8d-0f29-40a5-a0c5-cebf94bf01e7	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Gorj County	GJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2ca474ba-bcb0-4784-ac55-4e270873af18	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Harghita County	HR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f11f0042-28c5-4d2f-8b3c-a143b605a534	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Hunedoara County	HD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d9679aef-7f55-439c-8911-04742002e832	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Ialomița County	IL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9be6e22f-3b82-43fb-b8eb-9dd081f8da83	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Iași County	IS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b74c1c0a-4612-41c8-a9e9-8197e6379882	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Ilfov County	IF	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ccd26dda-97f6-41aa-be18-ca6add2d4edb	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Maramureș County	MM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
144c7942-df09-4186-98f1-e333631de134	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Mehedinți County	MH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
915363c6-1721-4f43-954e-d3c40e788755	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Mureș County	MS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9b18c004-95d4-4650-af0c-cdef9dae66f4	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Neamț County	NT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f1c4f97c-19a6-4dec-8742-86f7bf9e6f5f	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Olt County	OT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9ff8607d-cce8-4242-a369-4f77a9faa7d6	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Prahova County	PH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
33a7c2e6-c968-42a5-bac9-d7e60e26cff3	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Satu Mare County	SM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
080f4517-c697-443e-b48f-4a83c83e5e95	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Sibiu County	SB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
37ecd53c-acc5-4d65-848a-719e64c96592	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Suceava County	SV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fdb9087d-dd19-4060-ba09-65cfcf278b55	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Sălaj County	SJ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d3b61633-8ceb-4999-8133-a5a33f3d5e73	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Teleorman County	TR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7684c989-e3bf-42d0-a16a-5a135bb55985	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Timiș County	TM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b4f6d321-02ce-4154-baee-9145a25e05cd	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Tulcea County	TL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b5e6cb5a-a899-4e7d-9cc7-53e0ff73a5d7	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Vaslui County	VS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4c446a81-d874-45c7-8c80-d1d2cc3a5e49	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Vrancea County	VN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7c3beb3e-c54d-449d-bc41-c347cb08b2e6	dc9e14eb-28a0-42fd-9ac7-2b9f43ba1b8d	Vâlcea County	VL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f8a0a946-6857-464d-9bd7-5ebe9b275875	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Altai Krai	ALT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5334d2aa-27aa-4831-9b21-911e9011f555	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Altai Republic	AL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5d1cf498-f81b-4992-a19b-42365a271c7c	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Amur Oblast	AMU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f3249c33-b0a2-47fa-bff1-97110895acc4	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Arkhangelsk	ARK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9fd135e3-d9f5-4375-bb56-4515aff1dae5	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Astrakhan Oblast	AST	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6271850a-e5f0-431b-a389-fb8020d48813	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Belgorod Oblast	BEL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c954b56a-9ef2-48f3-bfa6-ae27f7e8edca	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Bryansk Oblast	BRY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
783d7474-b883-4ea1-8f02-6a627d4167a0	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Chechen Republic	CE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3e74e41b-196b-4add-9152-22576b5e5423	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Chelyabinsk Oblast	CHE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fa772d7f-c2fd-44a7-be72-bc5b9d588586	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Chukotka Autonomous Okrug	CHU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b305cc8c-f335-465c-9660-f5ed3b766ed1	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Chuvash Republic	CU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6857bad0-ca2f-4bb5-98cc-304643b1e3c1	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Irkutsk	IRK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2ef164c3-0238-44fc-8b4e-c55dfcf740f2	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Ivanovo Oblast	IVA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b26c49ff-2016-4ccf-8548-5489ccf79a4a	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Jewish Autonomous Oblast	YEV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
02d28e6c-269b-44a0-bae9-acf2b7c707e0	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kabardino-Balkar Republic	KB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7f4e4e70-5283-4ace-a0b4-80e417d2a0b1	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kaliningrad	KGD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7d25ad82-23cb-4d8f-afd8-a222983af3ee	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kaluga Oblast	KLU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6a6c471b-f5d3-40e3-b711-e4916ddf1072	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kamchatka Krai	KAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a2f2997b-e86e-450a-8b0c-571351e4e7b3	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Karachay-Cherkess Republic	KC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
797cd7f8-115c-41e6-9f94-8e00505626ef	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kemerovo Oblast	KEM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5c5d5e29-7fb1-4643-a082-2cee563c09a8	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Khabarovsk Krai	KHA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f93e66e9-cc92-489e-81c7-b50fb1631d4a	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Khanty-Mansi Autonomous Okrug	KHM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
45287ffd-d344-42fc-81b0-9017684f7cb4	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kirov Oblast	KIR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
01590598-824f-4296-a7a0-1c4d3b2f2d40	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Komi Republic	KO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
65e31491-6fdb-417d-a07f-6d6cd81b31fa	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kostroma Oblast	KOS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
acbdf7b2-a8df-4598-a0c3-de18d295a1fd	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Krasnodar Krai	KDA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4f00a003-8b4d-449a-b806-fd84a0510b68	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Krasnoyarsk Krai	KYA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fd7b8d60-8d2e-4aa7-b77d-d4fb23d5ff3c	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kurgan Oblast	KGN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
faecfcfd-88b2-4449-9d3d-94a8f6540b4f	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Kursk Oblast	KRS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6b782a95-a468-4541-93c2-b65983ecc2e3	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Leningrad Oblast	LEN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
97f91c96-1928-403c-9b7e-45f614a952ef	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Lipetsk Oblast	LIP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
39cd8b57-0908-4efd-b112-116224b62c85	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Magadan Oblast	MAG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d88cc1a6-d830-4536-87d6-6d86c4a3c4b1	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Mari El Republic	ME	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0d01a5bf-26ad-4546-85a6-7c3b7f317085	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Moscow	MOW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f23a7329-3e3e-4f6a-a302-b5f995f9f1b0	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Moscow Oblast	MOS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5bb83154-b947-45ed-b899-feb6380ef1c3	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Murmansk Oblast	MUR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8e9b303a-7e72-416d-9e67-5c07b1e4d14a	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Nenets Autonomous Okrug	NEN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5a3b7717-5369-4d54-86ef-06d51cf6a22d	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Nizhny Novgorod Oblast	NIZ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
22a61541-2d61-4bc1-b2ec-77a85cb63030	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Novgorod Oblast	NGR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c22c94b5-63bd-45c5-9410-7b805d06fc4e	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Novosibirsk	NVS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1d8c07a6-a42a-4af1-837e-383d110b40e4	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Omsk Oblast	OMS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0319ed26-f399-4634-be9a-3dbecc3894ac	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Orenburg Oblast	ORE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
66bab9c1-cc03-45ef-a916-2958a53abaf9	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Oryol Oblast	ORL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
46cb581b-b656-4e30-8e7f-ca397a2e2f60	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Penza Oblast	PNZ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e783d2ea-77e0-4eb9-953c-880d3e432dc3	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Perm Krai	PER	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4098eb3e-eaca-4079-a607-566b564ad7e1	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Primorsky Krai	PRI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
769204e5-50f5-483c-857a-b0c4811a39e3	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Pskov Oblast	PSK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
034575b0-9f48-4636-b0dd-d34628e1e52e	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Adygea	AD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fae0b70e-6321-44ba-9fac-6777c38739dc	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Bashkortostan	BA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a4d246b7-fee0-43cd-b517-f8eba13ad17f	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Buryatia	BU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
377e124f-4450-475d-b340-0b2475afc19a	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Dagestan	DA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0a629b61-856a-470d-b7c1-e1d5120a33d4	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Ingushetia	IN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
521b07d4-2875-4d90-8ed5-9963f577be5a	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Kalmykia	KL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3f50c891-4350-4295-a1c0-e57626ddf24d	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Karelia	KR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c30abff8-efb1-43a1-b6f1-202141a05464	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Khakassia	KK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6a1cdef4-1a1f-419a-8e77-4e9c55bc22e9	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Mordovia	MO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dd6a6f5e-e94b-44e9-80e9-6821b597f0cd	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of North Ossetia-Alania	SE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cf4ee999-ce9e-44f0-9bb2-31f46f91bef4	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Republic of Tatarstan	TA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
178109a5-52b9-40a3-b1d8-804b27f9dae3	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Rostov Oblast	ROS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f753f174-0b24-4697-8f01-1c6ca74221e7	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Ryazan Oblast	RYA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
621db5f2-0e2d-4cf0-869c-41b9fec850cc	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Saint Petersburg	SPE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fe591ea7-5b38-4370-b817-8d2bcdb4a695	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Sakha Republic	SA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5a518f19-cb7a-4714-9f02-d3e3232e0358	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Sakhalin	SAK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
904e68d8-44c7-4e0e-8fe3-50765ef2dabf	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Samara Oblast	SAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
06f53c0d-cf7a-4a3c-97a1-43d7a0d79500	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Saratov Oblast	SAR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
529fbaee-d186-4a92-a8f2-825cfc0fc508	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Sevastopol	UA-40	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bddaf0e1-1fb7-4642-95b7-60e713471e21	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Smolensk Oblast	SMO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0a10420b-6ba7-4e8c-ad5c-1cd43be46e09	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Stavropol Krai	STA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4c80b35e-839c-4b5c-99a7-7c09b2d5b1db	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Sverdlovsk	SVE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ecb86228-e429-4079-b853-6d98ef624dd5	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Tambov Oblast	TAM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e364b313-8358-47d0-97c5-9b8b58452f1a	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Tomsk Oblast	TOM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
63938f3d-278d-4e24-9033-30deee2dd609	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Tula Oblast	TUL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a694612c-bec9-4c18-89c6-d87405b0c264	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Tuva Republic	TY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e81e2faa-02da-4122-bec4-4d49b0ebdd74	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Tver Oblast	TVE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e8e0d237-6b5b-4210-9a39-e6c0011a7d04	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Tyumen Oblast	TYU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6d31ff5f-b218-4866-9b97-c17863405b91	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Udmurt Republic	UD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d1d64315-6b63-42da-b299-0736ac5b4c72	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Ulyanovsk Oblast	ULY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
61b69aa7-60c9-4478-9e0c-83b49421d05f	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Vladimir Oblast	VLA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
931a2fcf-bad0-409b-a468-f5859d700192	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Volgograd Oblast	VGG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0541baec-6cb7-48a6-bd40-c88e81fc68cc	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Vologda Oblast	VLG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f5f8f47d-6534-4bfd-94cb-be294c1c0edf	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Voronezh Oblast	VOR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bb3ebe9a-ddba-4040-819a-8ba56bc959a5	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Yamalo-Nenets Autonomous Okrug	YAN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
65d211be-733c-4a76-b9d2-4c2a95efa9ce	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Yaroslavl Oblast	YAR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
823e80d2-33ac-4bc0-980b-95a8ba1982b6	bd67502e-6ff6-4001-a2d8-fd19a6d0a04b	Zabaykalsky Krai	ZAB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2225dbf7-37d1-4dd7-a5a2-2fbafc6c3b96	c54ecca1-d57a-4586-9184-6bec60c9b9dc	Eastern Province	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f18b177d-785b-447d-912b-4a2a2fbc8500	c54ecca1-d57a-4586-9184-6bec60c9b9dc	Kigali district	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b9fe0ef1-96b0-410a-919a-335b80f09ac6	c54ecca1-d57a-4586-9184-6bec60c9b9dc	Northern Province	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8fe519f9-cf1e-461e-abee-62238409cafe	c54ecca1-d57a-4586-9184-6bec60c9b9dc	Southern Province	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bf0b4ab8-3fbe-4a7f-b3d8-32e8b6cbceb6	c54ecca1-d57a-4586-9184-6bec60c9b9dc	Western Province	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fcd576ab-6bff-45cc-85c0-92c3ecf284b8	450e7d9e-39be-434c-966d-10a07cb75f46	Christ Church Nichola Town Parish	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8ea31a31-400c-4e01-8d1e-971b39974fca	450e7d9e-39be-434c-966d-10a07cb75f46	Nevis	N	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e5978d25-aab7-417f-ae00-fc6046eadfbb	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Anne Sandy Point Parish	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d8829e9e-3af3-4210-beba-01f64e636313	450e7d9e-39be-434c-966d-10a07cb75f46	Saint George Gingerland Parish	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7805a415-050d-4071-b31f-5ed8e026692b	450e7d9e-39be-434c-966d-10a07cb75f46	Saint James Windward Parish	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c152cb47-c022-4769-aab6-b9eec1e85a91	450e7d9e-39be-434c-966d-10a07cb75f46	Saint John Capisterre Parish	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
833a42ac-6dfc-411e-b45e-cc799b1ff1e6	450e7d9e-39be-434c-966d-10a07cb75f46	Saint John Figtree Parish	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ffd9e505-71cf-4b9b-baac-c4f3b7fa5a09	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Kitts	K	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e2c1e8bf-1968-4c1d-9144-e0394ccaa345	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Mary Cayon Parish	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
99bb7c31-7a63-4fb1-aece-4560f97f8b0a	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Paul Capisterre Parish	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d3f72890-ef58-4470-a11c-607e765d4592	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Paul Charlestown Parish	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f82030e2-e7c8-40f4-80f5-79a9b0430399	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Peter Basseterre Parish	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
de837122-5cde-4606-98d9-7df7aa39df1f	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Thomas Lowland Parish	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8f6146a9-16e8-4452-8c1a-8cd4e94e65cd	450e7d9e-39be-434c-966d-10a07cb75f46	Saint Thomas Middle Island Parish	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cd74928d-bc64-4aaf-a53f-a0aceca92cab	450e7d9e-39be-434c-966d-10a07cb75f46	Trinity Palmetto Point Parish	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
12e47b20-6384-41fd-a6b3-d307a6e9d5fe	06f3f1b9-4308-403b-a0b2-866579002721	Anse la Raye Quarter	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6ce9901b-3cb9-4c01-a3d8-5af04c378c9a	06f3f1b9-4308-403b-a0b2-866579002721	Canaries	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
49071b34-e4ef-4c84-8cdf-6f5a34aa8da9	06f3f1b9-4308-403b-a0b2-866579002721	Castries Quarter	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a9e01bc1-e009-4beb-bc99-fb43e10ed967	06f3f1b9-4308-403b-a0b2-866579002721	Choiseul Quarter	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8def124c-5af2-4ca9-9f71-a2d7a8144c42	06f3f1b9-4308-403b-a0b2-866579002721	Dauphin Quarter	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ea60e2dc-0ea7-45ca-9db5-89c54202225e	06f3f1b9-4308-403b-a0b2-866579002721	Dennery Quarter	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a5f8346f-7958-418b-b568-d579fc954646	06f3f1b9-4308-403b-a0b2-866579002721	Gros Islet Quarter	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dd12339b-3a16-4e83-969b-103caea2a865	06f3f1b9-4308-403b-a0b2-866579002721	Laborie Quarter	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1c722015-cb32-426b-b0e4-1ec72be29c53	06f3f1b9-4308-403b-a0b2-866579002721	Micoud Quarter	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6db9a46d-be6b-4a59-8c83-0188c63d292d	06f3f1b9-4308-403b-a0b2-866579002721	Praslin Quarter	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a4d78d6c-5d27-4089-b399-776566642a64	06f3f1b9-4308-403b-a0b2-866579002721	Soufrière Quarter	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ebbc010d-6064-457f-adb2-5a964c36362c	06f3f1b9-4308-403b-a0b2-866579002721	Vieux Fort Quarter	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
07fc3655-ce69-426d-881b-97a28e4b8060	14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Charlotte Parish	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2e215945-00c6-4e05-98fd-9c2c544e3906	14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Grenadines Parish	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f2305d75-bed9-4d42-b449-fafb77e4d856	14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Saint Andrew Parish	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
11de4ad9-501d-4e67-addf-aa3e68f63f7d	14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Saint David Parish	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ff8bd636-d284-44b3-8e57-e5e8d4bea809	14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Saint George Parish	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
04c918c9-fc9f-4d82-8226-4d7de4cd70b8	14d1fe95-2c73-4c22-925e-0a5e589b0d1a	Saint Patrick Parish	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9eaa7dc2-a908-4e41-94b6-f39a22157f53	b180a953-a82f-4138-bbe6-ad46be5c41c8	A'ana	AA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
abc30111-1316-4f61-89d6-b1f38aa0e4d2	b180a953-a82f-4138-bbe6-ad46be5c41c8	Aiga-i-le-Tai	AL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6925b6c8-7183-4004-82da-dd953b2a3da3	b180a953-a82f-4138-bbe6-ad46be5c41c8	Atua	AT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b0623276-87e9-4100-881b-3b1ec80ad94e	b180a953-a82f-4138-bbe6-ad46be5c41c8	Fa'asaleleaga	FA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0e43a770-0f25-49df-a9b2-c561cd2d7c41	b180a953-a82f-4138-bbe6-ad46be5c41c8	Gaga'emauga	GE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e866e775-463c-4e5c-b67c-9bc873818b94	b180a953-a82f-4138-bbe6-ad46be5c41c8	Gaga'ifomauga	GI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9aa4ff20-9ca4-4cb8-b6bc-e0cb2e67c670	b180a953-a82f-4138-bbe6-ad46be5c41c8	Palauli	PA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7f265d75-ef3d-48de-b93d-3f5569a1a460	b180a953-a82f-4138-bbe6-ad46be5c41c8	Satupa'itea	SA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
45395329-4532-4e74-9189-2127f7609685	b180a953-a82f-4138-bbe6-ad46be5c41c8	Tuamasaga	TU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0be36e91-a6bc-48e8-ae56-87c60b16092a	b180a953-a82f-4138-bbe6-ad46be5c41c8	Va'a-o-Fonoti	VF	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e678b598-fecb-486e-8c05-a1d0b4bb12d2	b180a953-a82f-4138-bbe6-ad46be5c41c8	Vaisigano	VS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
74bbfffd-29c3-4dc8-8d8b-75189a073fef	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Acquaviva	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
04d772c3-1ce2-4551-9c3e-df827369e442	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Borgo Maggiore	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a78265e-a952-453b-950d-71e2efd90def	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Chiesanuova	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1d2d0df4-760d-4513-912b-752f4e24e336	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Domagnano	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
92d10162-204f-4572-8f0d-1a907b8a702f	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Faetano	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
93f945b3-947d-402d-ade6-5770c8728867	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Fiorentino	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
eb5631bb-fb24-40d3-b49a-b995392926fa	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Montegiardino	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8d29be3f-d940-48f6-a328-fdef25cd903a	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	San Marino	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
55c89f34-6162-4da8-8417-2c1a042770a7	74c6ae89-a70b-4a8c-bec3-1c10eff3ec16	Serravalle	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ee2f22a7-adb2-4455-8374-ecba9c245c48	cdd4bd2c-bf1e-4e02-a82f-36d481b7a2d0	Príncipe Province	P	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
998d90b0-5d48-4e70-b105-dad6bc8a3ee1	cdd4bd2c-bf1e-4e02-a82f-36d481b7a2d0	São Tomé Province	S	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d7737f4b-7c80-4510-ab4f-035484b9b8bf	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	'Asir	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3e2f18d9-4cdb-44e7-b6ef-6727644cd810	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Al Bahah	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7063cae0-47da-400e-a0f9-3a894c1f5c65	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Al Jawf	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ba9047d5-76fc-41ee-8624-16efbf434fc7	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Al Madinah	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e92fe178-614f-4a90-bc3e-eae1ba3cb840	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Al-Qassim	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e5c00fd4-2fe6-4a3d-a40b-d9b00873dbb1	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Eastern Province	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
77adc85e-0265-4e46-b8b8-4e318c32248d	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Ha'il	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a513446f-1bf4-4476-826d-f6dd2086f7cd	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Jizan	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e52965fb-fb0f-4c1a-a026-e66c01e2028a	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Makkah	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2889759b-dfa8-45ad-8949-d3ec12f0f8d2	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Najran	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5f82a1dd-692b-4e53-a247-2342db109a39	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Northern Borders	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cadfbc40-8e50-4dea-a34f-76b6254cc7a6	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Riyadh	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
becc2a81-a80b-4575-aa20-fb648f12ca52	1f66fa14-872b-4f6c-8c10-b6ae57aed9de	Tabuk	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1be2bf3e-c0a4-48b7-8ccf-814350136a54	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Dakar	DK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fb3e250b-edbe-41ca-8b27-06c860f4f9cc	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Diourbel Region	DB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1401e2e5-04da-4e42-8fdf-256c91e33b99	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Fatick	FK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b3534645-acc6-42da-9e9d-e53f7caaef4a	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Kaffrine	KA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7ff6daa5-97af-4aa3-a776-c593e8b6cae9	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Kaolack	KL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
86432044-ed85-4af0-bda1-fed2dfa7ad6d	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Kolda	KD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b847cf99-5d0f-413c-bf7f-6859e57f493b	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Kédougou	KE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a49d20f7-5939-4b86-8c88-c2ff52ce0bd3	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Louga	LG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
46ce04d3-ac86-406d-9a00-69acb56849c0	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Matam	MT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2285daa9-72c2-4925-8800-94f7b25ac300	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Saint-Louis	SL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7c1bc915-5589-4029-8ba0-24d99c06a451	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Sédhiou	SE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8cc4c095-6dea-4547-95c8-a986023210ae	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Tambacounda Region	TC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3816c82d-cb3b-4e34-83a6-43f3f5e48d31	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Thiès Region	TH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8884c86b-6cc7-4bf9-bfe9-1cd03b8b4e69	11f16bd2-a809-435f-8c00-3d2f84e2dbfe	Ziguinchor	ZG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
92de6ace-e581-4d21-9e2d-5e3ab22d2bac	5b414e04-7456-44ec-993b-bb71184b96eb	Belgrade	00	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b157ea7e-c7b0-4550-81be-2e32cb407c4d	5b414e04-7456-44ec-993b-bb71184b96eb	Bor District	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c1bfdad7-0602-4393-a875-1f8b8e9b6cbf	5b414e04-7456-44ec-993b-bb71184b96eb	Braničevo District	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7e7330b4-526a-44c0-aac8-0a0dcdd5f86a	5b414e04-7456-44ec-993b-bb71184b96eb	Central Banat District	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ea3a2bc3-6b18-4ec8-a33b-9efbf4212c53	5b414e04-7456-44ec-993b-bb71184b96eb	Jablanica District	23	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1964996a-019a-4d80-bf3c-60259fc62232	5b414e04-7456-44ec-993b-bb71184b96eb	Kolubara District	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
999205c9-3087-4572-af97-7aaf83464d39	5b414e04-7456-44ec-993b-bb71184b96eb	Mačva District	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
848a60a9-d111-4a5c-834b-fe4fd4d96cd2	5b414e04-7456-44ec-993b-bb71184b96eb	Moravica District	17	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
84f7361f-fe15-45c7-a5b3-8ff6db233cb8	5b414e04-7456-44ec-993b-bb71184b96eb	Nišava District	20	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
807221ec-eeed-4866-b014-a7b6c9d42226	5b414e04-7456-44ec-993b-bb71184b96eb	North Banat District	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
139c98bc-9620-40d6-8c55-faca43f57563	5b414e04-7456-44ec-993b-bb71184b96eb	North Bačka District	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4012a82d-a989-4d5f-81d7-1b7ee133c6c5	5b414e04-7456-44ec-993b-bb71184b96eb	Pirot District	22	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2798c5be-1cc7-430a-8934-7bc38f1dec0f	5b414e04-7456-44ec-993b-bb71184b96eb	Podunavlje District	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a269b5fd-9995-4827-9a27-0a1d5169b923	5b414e04-7456-44ec-993b-bb71184b96eb	Pomoravlje District	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b7a5afbf-7d63-4747-a71d-3db4e04d780c	5b414e04-7456-44ec-993b-bb71184b96eb	Pčinja District	24	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bbc081cb-f442-4f8e-bec3-0c5bddf511f7	5b414e04-7456-44ec-993b-bb71184b96eb	Rasina District	19	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7465d135-e1f9-43af-868e-ec4d4931820a	5b414e04-7456-44ec-993b-bb71184b96eb	Raška District	18	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f97fa9c3-52b5-4989-8f93-bb01b841aacc	5b414e04-7456-44ec-993b-bb71184b96eb	South Banat District	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0cfbab05-f5ac-45f3-acc8-cf1216e86488	5b414e04-7456-44ec-993b-bb71184b96eb	South Bačka District	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
edb99fe3-a976-45ac-b984-7a207ec00f18	5b414e04-7456-44ec-993b-bb71184b96eb	Srem District	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4490e2c6-9b9e-4e9a-8982-0bbb7fb7e101	5b414e04-7456-44ec-993b-bb71184b96eb	Toplica District	21	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
af949eef-1037-40e2-b4dc-68b5dcdeed84	5b414e04-7456-44ec-993b-bb71184b96eb	Vojvodina	VO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
77bcef5d-a70b-41b5-bead-e3da606f8d37	5b414e04-7456-44ec-993b-bb71184b96eb	West Bačka District	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c382ecdb-bfc7-407b-a960-da9fe84d549f	5b414e04-7456-44ec-993b-bb71184b96eb	Zaječar District	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
44d36733-3e64-4299-bff7-dda71771bd8f	5b414e04-7456-44ec-993b-bb71184b96eb	Zlatibor District	16	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f135e2a0-fcf3-4582-bd9b-069bf981d6d2	5b414e04-7456-44ec-993b-bb71184b96eb	Šumadija District	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d1510db1-b819-45a6-91ae-69a983cafd09	31f4e4af-cf82-46f0-889c-7859ad62be64	Anse Boileau	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c4b68160-4e95-4fe4-8c83-3d1d60dbc24e	31f4e4af-cf82-46f0-889c-7859ad62be64	Anse Royale	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8a891120-eff4-42eb-81ca-369dd94a39d0	31f4e4af-cf82-46f0-889c-7859ad62be64	Anse-aux-Pins	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
77454256-ba28-4994-adfd-c47f496c3086	31f4e4af-cf82-46f0-889c-7859ad62be64	Au Cap	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1358e750-f679-4fd5-976d-8894e617554b	31f4e4af-cf82-46f0-889c-7859ad62be64	Baie Lazare	06	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
30663377-6f8d-42c5-bca2-826613b563c0	31f4e4af-cf82-46f0-889c-7859ad62be64	Baie Sainte Anne	07	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
967ab37d-db33-4b9a-846f-f0c7bdf2f1d8	31f4e4af-cf82-46f0-889c-7859ad62be64	Beau Vallon	08	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2f8776e2-e862-4d34-96ac-5b9f4edf013f	31f4e4af-cf82-46f0-889c-7859ad62be64	Bel Air	09	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
481ca162-3f51-414f-9c90-fd085b6735c0	31f4e4af-cf82-46f0-889c-7859ad62be64	Bel Ombre	10	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e756ad8c-2990-4b5b-b969-1e8ee18b5c00	31f4e4af-cf82-46f0-889c-7859ad62be64	Cascade	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
22d3577d-9e40-4c33-b396-98b8f7b3441a	31f4e4af-cf82-46f0-889c-7859ad62be64	Glacis	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
989d7bb6-f068-4dd0-b5c3-551766484a99	31f4e4af-cf82-46f0-889c-7859ad62be64	Grand'Anse Mahé	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
47288dd9-2a09-4402-ac81-6d4d1de069a9	31f4e4af-cf82-46f0-889c-7859ad62be64	Grand'Anse Praslin	14	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bf3d4f12-4f64-4914-8cdf-aa119cfc5597	31f4e4af-cf82-46f0-889c-7859ad62be64	La Digue	15	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ed214fe0-8bca-482d-aa6d-a58ac0863bdd	31f4e4af-cf82-46f0-889c-7859ad62be64	La Rivière Anglaise	16	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fcaa9e3e-d7cd-4aa3-8721-8201b8842169	31f4e4af-cf82-46f0-889c-7859ad62be64	Les Mamelles	24	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fba9e5d1-f9be-49f0-8cab-967b9c44b991	31f4e4af-cf82-46f0-889c-7859ad62be64	Mont Buxton	17	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
451e9ec8-2a08-47a7-9d8f-c9a90988c0e3	31f4e4af-cf82-46f0-889c-7859ad62be64	Mont Fleuri	18	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
703d9c6d-a75f-4b14-b390-6310d600b83c	31f4e4af-cf82-46f0-889c-7859ad62be64	Plaisance	19	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d7e15952-cb8a-4da0-9ff3-be68fd3b15c9	31f4e4af-cf82-46f0-889c-7859ad62be64	Pointe La Rue	20	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7bde3ae8-105c-434e-80cb-625144cf6563	31f4e4af-cf82-46f0-889c-7859ad62be64	Port Glaud	21	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5a33685c-ef4f-4468-b9ff-6bb210c91ffb	31f4e4af-cf82-46f0-889c-7859ad62be64	Roche Caiman	25	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b5799fbc-ce62-4298-bae7-11815beee078	31f4e4af-cf82-46f0-889c-7859ad62be64	Saint Louis	22	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
97e5b2be-74bc-414e-bb2e-94bda1f32de9	31f4e4af-cf82-46f0-889c-7859ad62be64	Takamaka	23	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bc297493-2e25-4d17-8042-93487bf1426c	d5feb683-812c-4cee-ac4e-83f847c5581a	Eastern Province	E	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9bf0844c-dec0-4dd1-8e77-cf0baa122418	d5feb683-812c-4cee-ac4e-83f847c5581a	Northern Province	N	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
722a459c-80e9-4b9c-aec5-5b53e734bc30	d5feb683-812c-4cee-ac4e-83f847c5581a	Southern Province	S	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
024d7074-7a16-4745-b092-43365c475677	d5feb683-812c-4cee-ac4e-83f847c5581a	Western Area	W	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
adfd7bc6-2672-4f00-9135-2e192e7533db	68dca18a-e1b6-468c-9941-1fd69a022b7d	Central Singapore Community Development Council	01	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2f4ccb6d-4980-46bd-b908-ef5b24edaf11	68dca18a-e1b6-468c-9941-1fd69a022b7d	North East Community Development Council	02	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7997c609-89bd-4b41-be76-3ef18387ff33	68dca18a-e1b6-468c-9941-1fd69a022b7d	North West Community Development Council	03	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
103e6de3-e6d2-4298-ad89-3a796ce0cf70	68dca18a-e1b6-468c-9941-1fd69a022b7d	South East Community Development Council	04	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3734b658-4a81-44ee-a14b-f74e42a271f6	68dca18a-e1b6-468c-9941-1fd69a022b7d	South West Community Development Council	05	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
edc5cdfe-b2d0-477c-af76-f1f68f12aecc	b3895137-436a-4f59-a5ac-241876161598	Banská Bystrica Region	BC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
27175197-b681-42d5-8b8c-d16bd4254c58	b3895137-436a-4f59-a5ac-241876161598	Bratislava Region	BL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2c634ccf-7fa6-4690-9c7c-544bf028c54c	b3895137-436a-4f59-a5ac-241876161598	Košice Region	KI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c92e492f-bbe5-4c40-bdb6-aeb033ff3189	b3895137-436a-4f59-a5ac-241876161598	Nitra Region	NI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1bdea94c-01f7-4cee-8185-f83c98f92c07	b3895137-436a-4f59-a5ac-241876161598	Prešov Region	PV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f56577f2-8ae0-4d40-b30a-81b73f8d6241	b3895137-436a-4f59-a5ac-241876161598	Trenčín Region	TC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d98535e3-c91a-454c-b653-3955dd5f4d35	b3895137-436a-4f59-a5ac-241876161598	Trnava Region	TA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c4b8a193-f107-4e27-adb5-c4b3b921c38e	b3895137-436a-4f59-a5ac-241876161598	Žilina Region	ZI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
34fa14ca-37ec-4d7a-b356-0e1ac1b9b8cf	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ajdovščina Municipality	001	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e303a850-e351-4d3c-9659-51ba997c50d8	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ankaran Municipality	213	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9fb06d46-bcb0-4e2b-884d-c406e4bdf542	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Beltinci Municipality	002	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
41743be7-197f-4905-b467-6cf9eefd483d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Benedikt Municipality	148	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cef0a53e-c357-4c9e-9cd0-ae86d6808cf6	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Bistrica ob Sotli Municipality	149	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0b8c5a48-db7b-4334-93a1-a978208199ad	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Bled Municipality	003	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3a2d6f6a-ec71-4d2d-9ab1-084600acfdc9	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Bloke Municipality	150	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e130172d-dc49-4799-85a2-2210da7e6507	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Bohinj Municipality	004	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d46ded29-a718-4388-9be7-c4e97d450bdb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Borovnica Municipality	005	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8def66f6-4dd6-42d3-b175-b51d4507ddd1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Bovec Municipality	006	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a387ac93-a152-443e-9b0c-2b66d0ba5a30	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Braslovče Municipality	151	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5c3424df-bfba-4355-b106-dd2dc17f0093	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Brda Municipality	007	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9c07c2da-a704-4fb0-ab2a-51f20d1ec68a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Brezovica Municipality	008	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
abfec574-ae04-4e8f-96c8-57cbd15404d7	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Brežice Municipality	009	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
47319fbf-9b67-4e4f-93d7-b4d67b2303c1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Cankova Municipality	152	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6bc8963e-e227-4558-b907-b3ff70a31042	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Cerklje na Gorenjskem Municipality	012	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8c4bb5dd-deff-42cf-bd82-3ecf2fa9f9ec	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Cerknica Municipality	013	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5ccc1160-8d70-4732-aad4-ceb1b9e8d437	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Cerkno Municipality	014	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a4ef8d65-35f9-4af2-9088-bc2390bad88c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Cerkvenjak Municipality	153	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b8ac0e93-19e6-432a-b82e-eb4b1c27a471	5f71a9a2-0423-4fb8-b314-c07ecce5b914	City Municipality of Celje	011	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b97fb080-3d98-474c-91e6-e6568d2c5001	5f71a9a2-0423-4fb8-b314-c07ecce5b914	City Municipality of Novo Mesto	085	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
65413731-ba9a-444a-9994-f9235f43caf4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Destrnik Municipality	018	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6f14689a-2fbc-4eab-9bd8-aab78e602570	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Divača Municipality	019	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dc00978c-ef50-4c14-88ac-c72b25d88362	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dobje Municipality	154	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
99f63b9c-0e88-4c6b-8cda-35cd3ca3c31d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dobrepolje Municipality	020	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
80465799-d590-4493-b519-ab61665492f8	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dobrna Municipality	155	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7b539ff5-fd06-4546-a863-a9028979c033	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dobrova–Polhov Gradec Municipality	021	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0a7fd19c-9acb-410d-8e45-0b735e39539e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dobrovnik Municipality	156	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8e233802-188b-4f0a-a912-854359e625ee	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dol pri Ljubljani Municipality	022	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
18f3178e-3921-4a80-bebc-adcc2e77040e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dolenjske Toplice Municipality	157	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
74b402fc-5049-4c70-b35f-af0756ab2b92	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Domžale Municipality	023	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
afe3170a-8aff-4e8c-ae60-b412d1dafb74	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dornava Municipality	024	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ab2ef949-fbc2-4467-b9a6-d2f2f8c5d387	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Dravograd Municipality	025	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
40f033da-d9c9-417f-b130-ad24b7e6f7db	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Duplek Municipality	026	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a9abc00e-6881-4b94-a0da-5376c5e5053e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Gorenja Vas–Poljane Municipality	027	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d2cf017a-ff83-4fb0-88fb-3461291f5f2a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Gorišnica Municipality	028	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cb607b92-6d58-46a9-8900-b7a499bde493	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Gorje Municipality	207	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
35615d44-318b-48c5-8ef7-20a3b4408508	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Gornja Radgona Municipality	029	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c6cbdba6-fda5-4962-932c-038451439f82	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Gornji Grad Municipality	030	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fda6ba19-71e7-4b39-b05b-8f0f43aa7faf	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Gornji Petrovci Municipality	031	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2161b67a-8ccd-4d39-99f8-04121049360b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Grad Municipality	158	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9a44ce8a-be6a-4c09-b166-64533fbce742	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Grosuplje Municipality	032	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ddaad9a4-bad3-48ea-aecb-b336bd7d43f7	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Hajdina Municipality	159	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1dc6cb85-f0ed-46cd-9f02-bc6fd1515246	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Hodoš Municipality	161	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e9ca3b27-6d96-4e3f-98b1-4747ac7c2888	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Horjul Municipality	162	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
47625fec-1538-42eb-8358-674ad0a7377d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Hoče–Slivnica Municipality	160	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
39095d2d-0975-4e51-b170-5e2c04bd8267	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Hrastnik Municipality	034	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
804c1e6b-fb0c-473a-99eb-936769d07e2e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Hrpelje–Kozina Municipality	035	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1ede9d5d-2dd9-4dd7-bb55-fc2cd2fddc25	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Idrija Municipality	036	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8b42a798-85b6-422f-a04d-155e1d1143ac	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ig Municipality	037	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e8321b1c-68ac-408a-b72a-45b9913c85c7	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ivančna Gorica Municipality	039	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
92051829-9b78-47f3-a451-9930cd94a69f	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Izola Municipality	040	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8ee8ad01-01d3-448c-954e-88118716ad95	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Jesenice Municipality	041	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cb10d953-c99b-4fbb-baea-1be55b40d9ee	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Jezersko Municipality	163	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f6a74720-7ea2-4ed5-88a3-baa058ffe23b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Juršinci Municipality	042	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
06105134-c15e-4b60-a45c-14fb35a84af3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kamnik Municipality	043	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
36f9256d-f40d-4a35-a701-3a02a56202c4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kanal ob Soči Municipality	044	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a93998df-fde5-4bad-99f9-99757a4f0777	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kidričevo Municipality	045	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
46dc84d2-f7f0-48d7-ad4a-c1bfd3c2885a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kobarid Municipality	046	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
28a6a2e2-8b70-4162-88b3-00593f55dc0a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kobilje Municipality	047	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cd0af8e5-9e74-4e80-8e95-96a9ffa717d0	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Komen Municipality	049	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
26523f99-f485-49fb-9178-182ff8cc41d2	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Komenda Municipality	164	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8b365e56-007a-40f6-aada-3d6510827e5d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Koper City Municipality	050	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
027643e6-a449-4bb1-9144-643f6566970e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kostanjevica na Krki Municipality	197	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a18aadaf-8f17-4670-b15c-682f949ba075	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kostel Municipality	165	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cba07b0c-8eac-417d-acc7-5fd39592ac66	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kozje Municipality	051	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
24b36aeb-20d7-4351-8efd-c65dfdca68e1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kočevje Municipality	048	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
101334fc-3c45-4f5e-bfb8-adcddc8bf85d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kranj City Municipality	052	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4bbaffeb-1bc5-49b7-9988-76040eda3532	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kranjska Gora Municipality	053	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0a26cbbc-12a9-4cb9-aba5-28327f1927c7	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Križevci Municipality	166	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2bcd71eb-3453-4468-8d52-1fe805e67940	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kungota	055	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
31504456-7540-4045-9e54-7aa93638f723	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Kuzma Municipality	056	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fe8bb7ab-18cf-4d25-b038-6147821bc745	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Laško Municipality	057	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
eb4272e0-7591-4ad7-9840-91d6a3aec4d8	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Lenart Municipality	058	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0f5177e0-6949-49b1-801a-d6c994ebd582	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Lendava Municipality	059	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
846bfbfd-251e-434b-9763-80fcc060654d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Litija Municipality	060	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3e0eff8d-cb80-4958-b09f-544d108b8054	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ljubljana City Municipality	061	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ec950706-2d4a-4d1a-8025-66de1d0d7bf1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ljubno Municipality	062	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2bc907be-4b44-47fc-b53a-da2b9d11ed2c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ljutomer Municipality	063	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
113fbaf8-d984-4a2d-8dd1-e714d3bad3f0	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Logatec Municipality	064	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8d246ae7-0cf0-4702-a116-537a1ad640c1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Log–Dragomer Municipality	208	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
61d37991-4f75-41b4-989a-24063beddfc1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Lovrenc na Pohorju Municipality	167	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b4f8ff8d-c8d1-4c2c-937a-34d7217e7ee4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Loška Dolina Municipality	065	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
be585b77-c924-441a-a7ce-27e5feb137ff	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Loški Potok Municipality	066	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
83223c61-d650-4e7d-95e7-15458b4cbbbe	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Lukovica Municipality	068	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
82f0a03e-8b11-4ac5-a3ac-9b991b73f1a1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Luče Municipality	067	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f1fe18f4-b55e-48b1-9790-de06407e53ca	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Majšperk Municipality	069	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
907dbc08-0597-45b4-8eef-77be24f1b684	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Makole Municipality	198	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9af61f96-013d-46f6-ab00-c29fd935a890	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Maribor City Municipality	070	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6756e405-193d-4079-b86b-519a381df775	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Markovci Municipality	168	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4c360077-9c23-48c0-8a21-530ffd0ee561	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Medvode Municipality	071	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ded2bca5-2126-4196-a2a7-b481bf9321ae	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mengeš Municipality	072	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6378a158-d9a2-40cd-9c21-475b4f5cc59c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Metlika Municipality	073	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
442dd587-40ae-413f-8d19-ef599aaf141d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mežica Municipality	074	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
23f7f77e-a827-49bf-b7aa-1c98518a94a6	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Miklavž na Dravskem Polju Municipality	169	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cfd3a74b-f964-456b-8dc0-5e06f3dfab73	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Miren–Kostanjevica Municipality	075	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e2b221a8-d8f2-4d93-8199-b7c7dbec0592	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mirna Municipality	212	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
870e1f39-8a0f-4b76-bf12-4513d1921761	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mirna Peč Municipality	170	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bc3e2264-af38-488d-abe2-67bd0523faff	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mislinja Municipality	076	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6d865301-5ef2-4f7c-a8b4-e752c4a0328c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mokronog–Trebelno Municipality	199	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6d903628-7ddf-4814-be83-44a4398b9d90	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Moravske Toplice Municipality	078	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ed1003f8-59ba-4f7f-9bc9-be4a0c3b0e99	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Moravče Municipality	077	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1fbeb0e1-06ea-4da3-9b7c-031677187fbc	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Mozirje Municipality	079	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
22849b70-74f1-4901-bf5c-8626720529e5	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Municipality of Apače	195	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fce5159e-e365-487d-a90f-13f7357bb934	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Municipality of Cirkulane	196	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ffe0bf35-69d7-47c6-884a-a95b36964d73	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Municipality of Ilirska Bistrica	038	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
129a7147-3858-4c28-b6b9-8108ce45b863	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Municipality of Krško	054	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
17c65da8-7c21-4376-a89f-828f5d495b27	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Municipality of Škofljica	123	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
39b1d475-89fe-4fb6-9e71-2518fdde9003	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Murska Sobota City Municipality	080	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a8648e80-ef82-49b5-a838-7012d08c4663	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Muta Municipality	081	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
939732e8-72ee-4acb-becc-8726b7e918ab	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Naklo Municipality	082	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dfb77d5b-8832-4030-be42-95bcfe393861	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Nazarje Municipality	083	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2e00a52b-39f9-4792-be63-fa2b65327726	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Nova Gorica City Municipality	084	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1716c390-9618-44f5-a602-259b8aec54c0	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Odranci Municipality	086	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
db22b0f3-ab43-49af-9e21-9e03e92a231d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Oplotnica	171	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d1d4f8d4-7663-4804-8950-aa0d950f0616	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ormož Municipality	087	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ef0801cb-7502-4317-a5c4-62424eed72fe	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Osilnica Municipality	088	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
edfeb75d-e2d1-4854-8089-ed4b57ec02c3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Pesnica Municipality	089	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
00af74af-2bcd-4b18-aca6-2cc2e512b5b3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Piran Municipality	090	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
39a3e345-a0db-4dd4-b5ac-d142f721407c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Pivka Municipality	091	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4ae809be-bce8-4276-b2a1-a3ce43b0d5cf	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Podlehnik Municipality	172	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0370f894-f30f-4fea-95d1-c6aca0ced0bf	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Podvelka Municipality	093	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5e36c512-19a1-496c-85e6-d7fda72e4e1c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Podčetrtek Municipality	092	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d6024a7b-8dd8-4a82-9cb1-63383b83ebf8	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Poljčane Municipality	200	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2c500c23-ec33-4cbe-bedb-e9bfe533e4c0	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Polzela Municipality	173	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e8a4bb38-58be-45b1-a2ea-3d0e3901572b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Postojna Municipality	094	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f56d5007-a2ef-4238-97f2-450a631eb829	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Prebold Municipality	174	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4f6045fa-c2fa-4171-998c-6565d4e2e317	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Preddvor Municipality	095	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5aef27f2-756a-4f5d-b69f-049fdeecefd4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Prevalje Municipality	175	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3c2f7b4a-9349-4af3-a3b3-14c20cbbd3e1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ptuj City Municipality	096	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2b7b2efc-cbcc-4e92-a711-1e23c800bdf7	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Puconci Municipality	097	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b1b238e4-ecf2-49d4-8ad4-326210c8521b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Radenci Municipality	100	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5b66d7c9-94b0-4fc3-b2ff-423f2395377d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Radeče Municipality	099	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
676927f0-0f7a-48e3-8ab5-051c966ffccb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Radlje ob Dravi Municipality	101	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
42f5043c-e6a2-490b-a90c-0b1f4350fbaf	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Radovljica Municipality	102	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
73c631d8-ab28-4b7a-b4da-ba858e7db2c6	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ravne na Koroškem Municipality	103	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
33fd854d-8dab-4a78-89dc-d5c9b1a7f649	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Razkrižje Municipality	176	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d298db6a-bdaa-44d8-85ee-200d4d1793b9	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Rače–Fram Municipality	098	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1c5d42dd-ec16-4540-991b-7b9088503acb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Renče–Vogrsko Municipality	201	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
72b1803c-f688-47e1-84b3-8ef7288e646b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Rečica ob Savinji Municipality	209	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9754f4e2-67bf-4033-a4c7-91ffbb8ed1c9	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ribnica Municipality	104	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
07d79fb2-24a5-4abf-8a3d-21eca14a66c4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ribnica na Pohorju Municipality	177	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8a98dd68-25a1-4e8a-a0e2-7b5b1b83087f	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Rogatec Municipality	107	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fc1a45cd-0906-448f-a2cb-b4d82c22a82d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Rogaška Slatina Municipality	106	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
57f1741f-fe0c-4b0d-bb06-411ee5907ea9	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Rogašovci Municipality	105	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8556fb01-3916-4f7e-859b-d6d8c0185473	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Ruše Municipality	108	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7681d157-2c79-4d44-a133-734a65da022e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Selnica ob Dravi Municipality	178	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
01e80d07-222d-4354-b4ea-0cf8e412cc07	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Semič Municipality	109	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
39a23116-1fbf-4719-b980-daa820465fe6	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sevnica Municipality	110	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f256d891-a62a-45ad-b03d-c31d960c6093	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sežana Municipality	111	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
42ee14d4-e232-4e1a-9ff7-1cd4d8311425	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Slovenj Gradec City Municipality	112	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6b70d0f3-7093-43c3-8cf1-2d725e11ceb0	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Slovenska Bistrica Municipality	113	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
37305580-3af1-47a6-8b9d-41cbf87fd19a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Slovenske Konjice Municipality	114	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1e995153-ef54-4ef4-8301-e43266e31650	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sodražica Municipality	179	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e286cb20-17cb-48ba-aba7-a9d855c76510	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Solčava Municipality	180	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e8e4ab5e-7724-4b1c-812d-301eb52b27f5	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Središče ob Dravi	202	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2478473e-8dc4-454c-9162-eb4dbe0243a3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Starše Municipality	115	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
eca1858f-0a3f-492b-8ff6-aff3ad45025b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Straža Municipality	203	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8cb45ba3-afbb-45f5-a6f5-b300a510d644	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sveta Ana Municipality	181	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d2830985-eea2-4768-9e12-99145237b491	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sveta Trojica v Slovenskih Goricah Municipality	204	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a5cd8ebe-216f-4a30-85d0-8ececacafa92	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sveti Andraž v Slovenskih Goricah Municipality	182	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
530027fd-3c21-4004-bcf4-87e20458595a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sveti Jurij ob Ščavnici Municipality	116	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
23a3cd63-a4ab-4592-bd06-788ddd38c7fb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sveti Jurij v Slovenskih Goricah Municipality	210	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fac342a0-6a96-437c-a969-e4bf12da3325	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Sveti Tomaž Municipality	205	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
de3faa92-fac4-4239-b12d-3e13e9cd3b67	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Tabor Municipality	184	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6660af41-1308-428e-b80f-aa89ac3490cd	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Tišina Municipality	010	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bd4573af-9698-4d1a-88dc-2cf30a8abd74	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Tolmin Municipality	128	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c38f341a-a24d-4f37-9cef-924bd542e1f4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Trbovlje Municipality	129	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8ed651cf-a5c7-482e-a399-93f3cafe9061	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Trebnje Municipality	130	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
75d94a78-729e-4a97-8b88-8a062bd8c9eb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Trnovska Vas Municipality	185	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9a3f21de-a69f-41ff-b5cb-538f01fc9bc9	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Trzin Municipality	186	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
37618357-0ece-4b2b-8b53-059374f828f3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Tržič Municipality	131	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0c31d077-bf5e-44ac-9a4c-c8710c4468da	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Turnišče Municipality	132	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7b2f958b-061c-418a-bc96-9b8b3986dd9a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Velika Polana Municipality	187	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
84312ea7-8199-4b65-8af0-afd4466c3ea4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Velike Lašče Municipality	134	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b435b11c-d12b-4add-a351-5b1f83d19928	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Veržej Municipality	188	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
051d77f0-6367-40c9-85a0-e63c48bb722a	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Videm Municipality	135	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0cfd5357-17ae-4439-8042-8be0fd7a28c9	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vipava Municipality	136	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a5f133ee-7829-4eec-ac37-1759b931cf86	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vitanje Municipality	137	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
75c83c43-3c1c-44ec-8a0c-d8440566bb81	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vodice Municipality	138	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
97c74c85-7e81-419e-9130-3ac6068a4552	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vojnik Municipality	139	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c4536eca-5462-47ed-839b-2fb2ebcd8aed	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vransko Municipality	189	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9d20efd3-18be-4edb-9895-d5960cfc3d69	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vrhnika Municipality	140	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
922b8792-dd9b-43d4-802d-1fc8be97db20	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Vuzenica Municipality	141	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
998f812c-ab51-4ff7-90f7-a4b5679bcb51	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Zagorje ob Savi Municipality	142	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d7f22701-f373-4359-a5ef-eb8328c8a65f	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Zavrč Municipality	143	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4352b4b8-ac1a-418c-b179-22fa94037f4e	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Zreče Municipality	144	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8104e37b-dba8-4e75-9914-37df7396850c	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Črenšovci Municipality	015	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d0da06ab-f679-480b-a03d-78c5ec6814b1	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Črna na Koroškem Municipality	016	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b3990d02-ae2e-4340-b195-859f412b94f4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Črnomelj Municipality	017	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
34cc7211-fa2b-4841-a616-cdaea934a818	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šalovci Municipality	033	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
212cbfe3-1a7c-4008-a2bb-1bbdafd50ea0	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šempeter–Vrtojba Municipality	183	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
09e35144-e8fd-4da6-9336-fe1ed2fc6659	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šentilj Municipality	118	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
49c86255-44ab-4105-bc38-ae95acfe89ac	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šentjernej Municipality	119	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c104dd0c-e204-4b7c-a95a-f7769e6d6652	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šentjur Municipality	120	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
474c4538-c6d5-49dd-950f-5839d203d8db	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šentrupert Municipality	211	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6847c832-9b96-4a36-a492-a44bf035a0db	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šenčur Municipality	117	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3b1f2218-d1ad-4156-ad79-dc1cc498fde6	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Škocjan Municipality	121	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
89815aac-5d9b-45e2-94da-02b24bfa29b2	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Škofja Loka Municipality	122	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e97f9675-13c4-48bb-a211-47e3abe9c6a7	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šmarje pri Jelšah Municipality	124	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d9de1e3e-5ae9-472e-bba9-f9f84f284bc4	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šmarješke Toplice Municipality	206	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
db972d02-d1f7-41a5-b154-8c130cac3082	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šmartno ob Paki Municipality	125	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
53d525ad-87cd-46dc-8da2-a3d0c2cc7b69	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šmartno pri Litiji Municipality	194	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a9d4a0a3-915e-4be4-9a93-ac540fbd01a3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Šoštanj Municipality	126	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
87baf96a-1ef4-48d7-8292-e81ddbbc5275	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Štore Municipality	127	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
75646352-b723-45f5-bb2c-fe1ff26473a3	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Žalec Municipality	190	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c4359e11-4db0-4ebe-b684-e1293aea04eb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Železniki Municipality	146	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1347c00f-c4ab-4701-aabc-8f2c517bc13d	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Žetale Municipality	191	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cf64faab-33fe-4898-8319-0f88b2545cbb	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Žiri Municipality	147	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3cf3c22d-d0ca-4a77-95f7-f11e5426f79b	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Žirovnica Municipality	192	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d42b70d3-10c8-4228-99e7-7c7c9807a961	5f71a9a2-0423-4fb8-b314-c07ecce5b914	Žužemberk Municipality	193	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
62c28559-b33b-4c74-a0a1-282d55b94a21	5f54b4c1-8b09-4237-8987-b5379227982c	Central Province	CE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b516f1e4-2688-4527-a25c-c657a10cdc96	5f54b4c1-8b09-4237-8987-b5379227982c	Choiseul Province	CH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8cac14ec-5596-4998-8746-fe6f99b32e8e	5f54b4c1-8b09-4237-8987-b5379227982c	Guadalcanal Province	GU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ae86221b-65a4-4094-b5ea-eac2f2bec7bf	5f54b4c1-8b09-4237-8987-b5379227982c	Honiara	CT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f4de363f-05c1-4420-9ca1-b6b0184ac0f1	5f54b4c1-8b09-4237-8987-b5379227982c	Isabel Province	IS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
12aab13c-18af-4427-af53-091b841b20d5	5f54b4c1-8b09-4237-8987-b5379227982c	Makira-Ulawa Province	MK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b8e3bf98-7c25-4bc8-97c3-19cdd1e88970	5f54b4c1-8b09-4237-8987-b5379227982c	Malaita Province	ML	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ca42f5f6-4984-4714-8d88-a596cec262cf	5f54b4c1-8b09-4237-8987-b5379227982c	Rennell and Bellona Province	RB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c272efd4-bc5a-434a-8741-1af443624e7e	5f54b4c1-8b09-4237-8987-b5379227982c	Temotu Province	TE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0add34dc-f8d5-49d5-8e05-4d92168114fa	5f54b4c1-8b09-4237-8987-b5379227982c	Western Province	WE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
30698692-3881-4e7d-a16a-0cdb903e9f1b	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Awdal Region	AW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f6c34972-a203-4702-9dda-cde0aeeeedff	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Bakool	BK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7dca1555-4b5d-43f7-b490-2b3947602645	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Banaadir	BN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2e488bf7-97f7-451e-b54a-d73210e074d4	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Bari	BR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
50cb4ac1-c600-4c36-991e-8a476ba08ef3	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Bay	BY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
970bec23-9970-4eeb-a0e0-53b6bb99c118	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Galguduud	GA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d1470390-a9fd-4076-9975-e5c5157ca0ea	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Gedo	GE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9e6c86ba-d830-4e11-8505-eb8191c0a238	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Hiran	HI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e7b5191a-c8a0-4ccd-9b78-c3ab17dcfb7e	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Lower Juba	JH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
504f319b-ee4d-4c37-a36d-5ec33c09a6ce	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Lower Shebelle	SH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
2aacbdd2-6d4a-4e13-b900-6a6efcc2cb3e	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Middle Juba	JD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1a04ac6f-b01a-4901-b8d8-005842cdadd8	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Middle Shebelle	SD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e20c921d-3be4-41fe-b3ca-d95ace637b4b	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Mudug	MU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9897ef80-3ceb-4fdb-97ba-f10303facef2	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Nugal	NU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
8906fd61-4cad-4666-af59-20671263f059	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Sanaag Region	SA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
63d2a97d-b954-4f38-823d-9dcc9cc6a2b7	5ef44673-badf-4f8f-90a9-c82da38fe2e5	Togdheer Region	TO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
83a5ed2e-42e6-4ace-871e-bce5c0563dd1	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Eastern Cape	EC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
adedbdb5-d318-4ea8-86f3-b9d2ea27f807	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Free State	FS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7439ac06-4fc1-41d1-8d9a-b4aafe20f439	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Gauteng	GP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5581700c-b005-4e68-b97b-9f9270ba62aa	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	KwaZulu-Natal	KZN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4d6c5d1e-3c36-4f90-a3d8-9185faac5342	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Limpopo	LP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fa1dd507-e36c-4451-930a-03692c342000	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Mpumalanga	MP	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0c891488-3709-4dce-b3e6-b05e1022eaa6	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	North West	NW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bd379095-cf31-4f68-9bb5-29e63c8c49d7	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Northern Cape	NC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
134ce5cd-238a-4476-adc1-18cdab137304	a2d2d3e1-bcc2-476b-81d2-e9fbe81e4047	Western Cape	WC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9a12ff48-02c8-4f70-991f-c8c9b0ee0388	2724c68c-0027-4be0-8846-ec381ef4c5bd	Central Equatoria	EC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4ec990ae-21b1-4d47-976d-618154282175	2724c68c-0027-4be0-8846-ec381ef4c5bd	Eastern Equatoria	EE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a27cde59-762a-49ca-a947-20510f274245	2724c68c-0027-4be0-8846-ec381ef4c5bd	Jonglei State	JG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1a0f1ad9-a8da-48b1-be2c-f3001e0020bf	2724c68c-0027-4be0-8846-ec381ef4c5bd	Lakes	LK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d1d06c9e-4714-4959-b308-627b6e672c13	2724c68c-0027-4be0-8846-ec381ef4c5bd	Northern Bahr el Ghazal	BN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
67b2fd94-6469-4d3b-bf07-4902952d4e80	2724c68c-0027-4be0-8846-ec381ef4c5bd	Unity	UY	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
805fa2be-5a6f-4c94-8d29-ef5eaaa68ded	2724c68c-0027-4be0-8846-ec381ef4c5bd	Upper Nile	NU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
93c4ab70-19fc-494e-a5a8-d92925d17724	2724c68c-0027-4be0-8846-ec381ef4c5bd	Warrap	WR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
552e01f1-f55b-40ff-b3a8-c6939832e351	2724c68c-0027-4be0-8846-ec381ef4c5bd	Western Bahr el Ghazal	BW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7d190fc3-a0d5-4096-9e90-417c52005936	2724c68c-0027-4be0-8846-ec381ef4c5bd	Western Equatoria	EW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6c421a3c-f12f-4c0d-96ba-4441da59ebba	42e74f21-ee87-4d06-9313-99945b3311f4	Andalusia	AN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c5262aed-9cb1-4699-b1a7-40645f37c211	42e74f21-ee87-4d06-9313-99945b3311f4	Aragon	AR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
525701e0-6929-4756-ac0c-fa228a319d58	42e74f21-ee87-4d06-9313-99945b3311f4	Asturias	AS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9f2553c9-2502-413f-8317-d72df2442d82	42e74f21-ee87-4d06-9313-99945b3311f4	Balearic Islands	PM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
71b42911-9722-457f-9c8c-2c855748bd5d	42e74f21-ee87-4d06-9313-99945b3311f4	Basque Country	PV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
493e9f8d-323e-48b1-833d-1c6e176e5424	42e74f21-ee87-4d06-9313-99945b3311f4	Burgos Province	BU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3a2e6f13-6660-41e4-8cd1-c0ed76266b01	42e74f21-ee87-4d06-9313-99945b3311f4	Canary Islands	CN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
da949dc9-a2fe-4375-8d8e-6afaaab79c43	42e74f21-ee87-4d06-9313-99945b3311f4	Cantabria	CB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
afa0e752-7b6d-4f2f-8a0e-bed642d361a9	42e74f21-ee87-4d06-9313-99945b3311f4	Castile and León	CL	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b0002ac9-8e06-471c-ad31-f721c64a7abe	42e74f21-ee87-4d06-9313-99945b3311f4	Castilla La Mancha	CM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
086e51e1-7ee5-4dfa-a79b-3817f127b4b3	42e74f21-ee87-4d06-9313-99945b3311f4	Catalonia	CT	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
be57d70f-3e84-463e-9397-b179f99324d2	42e74f21-ee87-4d06-9313-99945b3311f4	Ceuta	CE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0f554e12-a2d0-4c77-bdcd-a9c8b0f7a0d2	42e74f21-ee87-4d06-9313-99945b3311f4	Extremadura	EX	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0b10c940-926e-4d23-aef6-464235601780	42e74f21-ee87-4d06-9313-99945b3311f4	Galicia	GA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bac56cfd-4e17-497f-a355-b372b7a4b4af	42e74f21-ee87-4d06-9313-99945b3311f4	La Rioja	RI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d8b8ef7d-789f-4522-a810-1bf50af8dc2b	42e74f21-ee87-4d06-9313-99945b3311f4	Léon	LE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c49a40f4-d51b-47eb-9027-6ebacb15bf6f	42e74f21-ee87-4d06-9313-99945b3311f4	Madrid	MD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a913dfcd-148d-4142-867b-0b1bb620effc	42e74f21-ee87-4d06-9313-99945b3311f4	Melilla	ML	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f4ea0191-3043-4ef0-a6fc-d4b8845f9717	42e74f21-ee87-4d06-9313-99945b3311f4	Murcia	MC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7eb3c4f1-74ea-4fb2-9166-4abdff0d0e2b	42e74f21-ee87-4d06-9313-99945b3311f4	Navarra	NC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3ffd8777-7def-4204-a640-ba2fd8ea9938	42e74f21-ee87-4d06-9313-99945b3311f4	Palencia Province	P	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
106bccc5-e20a-4dd4-90d1-2a1a238ba285	42e74f21-ee87-4d06-9313-99945b3311f4	Salamanca Province	SA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3cc7110a-fc4f-432c-a309-bbfaec5fb3a8	42e74f21-ee87-4d06-9313-99945b3311f4	Segovia Province	SG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9af53feb-d421-44fb-ad10-286e4325847d	42e74f21-ee87-4d06-9313-99945b3311f4	Soria Province	SO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d42e70d9-6b0d-42a2-9f64-cc07c970f7ec	42e74f21-ee87-4d06-9313-99945b3311f4	Valencia	VC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
eba1bea6-0600-4a7c-aa5f-6c687e1c51fd	42e74f21-ee87-4d06-9313-99945b3311f4	Valladolid Province	VA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d9780a57-1f41-482f-85e8-beada2595787	42e74f21-ee87-4d06-9313-99945b3311f4	Zamora Province	ZA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4afa5cae-6c53-4193-aa36-223904d5cbb1	42e74f21-ee87-4d06-9313-99945b3311f4	Ávila	AV	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
76cd0f62-e358-4216-bfee-3a9d1f6982dd	83183373-a557-4e8e-bfed-85cecdafec99	Ampara District	52	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d3c58304-6208-461b-8420-bce449b0754e	83183373-a557-4e8e-bfed-85cecdafec99	Anuradhapura District	71	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b8c19096-eb47-4ea2-b754-8d81caade618	83183373-a557-4e8e-bfed-85cecdafec99	Badulla District	81	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7564a918-46f3-42f2-b71f-1409a86202e4	83183373-a557-4e8e-bfed-85cecdafec99	Batticaloa District	51	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cccc4dab-3130-413b-b04c-4d7ec161b5b9	83183373-a557-4e8e-bfed-85cecdafec99	Central Province	2	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
58c43ac9-3cbc-4e5e-a9fa-9caacc89d101	83183373-a557-4e8e-bfed-85cecdafec99	Colombo District	11	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
93b12684-8b62-47b7-93e9-a8a8b3056568	83183373-a557-4e8e-bfed-85cecdafec99	Eastern Province	5	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
0d115dc9-9864-4495-ae01-b0310bc6acfd	83183373-a557-4e8e-bfed-85cecdafec99	Galle District	31	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3c740370-6136-4ba6-9c57-2544dd7fecef	83183373-a557-4e8e-bfed-85cecdafec99	Gampaha District	12	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d0b91a90-988e-49d7-8483-95173ec28395	83183373-a557-4e8e-bfed-85cecdafec99	Hambantota District	33	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
440feed6-dd87-43c7-a1be-3ca7144e921a	83183373-a557-4e8e-bfed-85cecdafec99	Jaffna District	41	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7cfc4b23-4b5f-4ae5-b3d8-767e9d956ff0	83183373-a557-4e8e-bfed-85cecdafec99	Kalutara District	13	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1e0800ac-2042-4b8f-abc8-01d4b8c58997	83183373-a557-4e8e-bfed-85cecdafec99	Kandy District	21	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d3cc1986-e85b-4918-84de-6a12ea5e2383	83183373-a557-4e8e-bfed-85cecdafec99	Kegalle District	92	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fcff6562-9b95-4e05-93ef-d04454b0380d	83183373-a557-4e8e-bfed-85cecdafec99	Kilinochchi District	42	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dbeb1f2c-bbaf-4705-ae13-b981ceb98fa1	83183373-a557-4e8e-bfed-85cecdafec99	Mannar District	43	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
693cf29c-6639-4c77-9c04-1753e47caad8	83183373-a557-4e8e-bfed-85cecdafec99	Matale District	22	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
22c84cf2-cf4f-4c60-a408-1208304c663d	83183373-a557-4e8e-bfed-85cecdafec99	Matara District	32	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
514f70a2-cfca-432a-9409-324336f15495	83183373-a557-4e8e-bfed-85cecdafec99	Monaragala District	82	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3574d78e-1e2c-439e-a752-3db0e6f32721	83183373-a557-4e8e-bfed-85cecdafec99	Mullaitivu District	45	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ae48c8e7-2076-4f79-ba1c-e3d0704933d6	83183373-a557-4e8e-bfed-85cecdafec99	North Central Province	7	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5d68e4d6-4f89-4588-96dc-dfee6bec9bb6	83183373-a557-4e8e-bfed-85cecdafec99	North Western Province	6	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
54cdc406-4271-4dfe-a566-7212535d3d60	83183373-a557-4e8e-bfed-85cecdafec99	Northern Province	4	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
af3160e8-cba7-4964-ad1e-a486b56ad580	83183373-a557-4e8e-bfed-85cecdafec99	Nuwara Eliya District	23	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
276a5d63-d367-4c69-a53b-847889a88e27	83183373-a557-4e8e-bfed-85cecdafec99	Polonnaruwa District	72	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
d287c4b5-e2df-4265-a7c4-62386869f864	83183373-a557-4e8e-bfed-85cecdafec99	Puttalam District	62	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
19d099fe-7a6f-4977-9c4d-63dc9f310bb4	83183373-a557-4e8e-bfed-85cecdafec99	Ratnapura district	91	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3f17a428-43c9-4ed5-8695-e914913ccf65	83183373-a557-4e8e-bfed-85cecdafec99	Sabaragamuwa Province	9	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e9cab5e1-9229-47be-8239-4a20aebe75e8	83183373-a557-4e8e-bfed-85cecdafec99	Southern Province	3	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
04aec38a-44d4-4350-b470-136dc68cb810	83183373-a557-4e8e-bfed-85cecdafec99	Trincomalee District	53	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b5c3702f-d423-4671-8c06-84d9e31cd33a	83183373-a557-4e8e-bfed-85cecdafec99	Uva Province	8	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
14778df8-5c95-4217-bce2-f8af0ae223e6	83183373-a557-4e8e-bfed-85cecdafec99	Vavuniya District	44	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
07cba427-4e08-45f9-8e01-3d987ce95d38	83183373-a557-4e8e-bfed-85cecdafec99	Western Province	1	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a8c3f485-9b6f-48ac-a9e8-2a66fb6da7bf	305f9574-0313-406e-a5b9-62a2b3320546	Al Jazirah	GZ	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
afe948b4-0f97-40ee-8ac8-216a364c1de3	305f9574-0313-406e-a5b9-62a2b3320546	Al Qadarif	GD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
72cddf07-bdcc-4f12-90e3-6912835ec819	305f9574-0313-406e-a5b9-62a2b3320546	Blue Nile	NB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bcac1fdf-587e-4d1b-93d9-544dd985536b	305f9574-0313-406e-a5b9-62a2b3320546	Central Darfur	DC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
bae1bbe0-22f6-4578-9601-9e3a6da282c8	305f9574-0313-406e-a5b9-62a2b3320546	East Darfur	DE	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
af077b99-5509-48a0-9e62-a93fddba7235	305f9574-0313-406e-a5b9-62a2b3320546	Kassala	KA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
27aa3a2c-03ca-429b-adc1-4bd96b8d248e	305f9574-0313-406e-a5b9-62a2b3320546	Khartoum	KH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e6b42e08-d3b0-4be4-bc8d-d58581f5668d	305f9574-0313-406e-a5b9-62a2b3320546	North Darfur	DN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
78ed9ba7-5eff-4270-a60c-2100c1dddea7	305f9574-0313-406e-a5b9-62a2b3320546	North Kordofan	KN	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
09b24809-4d5e-4437-b79c-12e4616767dc	305f9574-0313-406e-a5b9-62a2b3320546	Northern	NO	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9230347b-5290-4fe3-b185-22527aa080c7	305f9574-0313-406e-a5b9-62a2b3320546	Red Sea	RS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
9017c8d6-26bf-4ddf-aa33-01cdc0d6185d	305f9574-0313-406e-a5b9-62a2b3320546	River Nile	NR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a3f3b23-fb00-44a6-964e-2777aa0fa19f	305f9574-0313-406e-a5b9-62a2b3320546	Sennar	SI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1eb0e83a-b4aa-4c75-9e1d-41f84d020770	305f9574-0313-406e-a5b9-62a2b3320546	South Darfur	DS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4af16ce2-13dd-4bb1-a65d-911cd71a36dc	305f9574-0313-406e-a5b9-62a2b3320546	South Kordofan	KS	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4a69c275-9800-4240-a3ad-70ba1aef6109	305f9574-0313-406e-a5b9-62a2b3320546	West Darfur	DW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1b627bf9-24d2-4864-b823-32f556952ca9	305f9574-0313-406e-a5b9-62a2b3320546	West Kordofan	GK	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ba87ff88-81d0-40d4-ad0b-7949cf74d7a1	305f9574-0313-406e-a5b9-62a2b3320546	White Nile	NW	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a12c8dc4-d885-40bc-adb3-484e6acd28c6	9365ab24-b5f4-4111-aa84-5bfce45737d7	Brokopondo District	BR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
54c555a7-07b6-4b96-8d3e-2c25dd59af74	9365ab24-b5f4-4111-aa84-5bfce45737d7	Commewijne District	CM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
373ee8db-0ad9-4a77-8898-c1697d66238c	9365ab24-b5f4-4111-aa84-5bfce45737d7	Coronie District	CR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c710bd00-450d-4d5d-9fa1-5a6778e278ef	9365ab24-b5f4-4111-aa84-5bfce45737d7	Marowijne District	MA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fe34601b-7809-4316-8195-444bad617ae3	9365ab24-b5f4-4111-aa84-5bfce45737d7	Nickerie District	NI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3c22c272-d658-4e5b-a5eb-ed9e6a6a7397	9365ab24-b5f4-4111-aa84-5bfce45737d7	Para District	PR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
36e0290a-83ac-49ce-8a71-4c93e059e96e	9365ab24-b5f4-4111-aa84-5bfce45737d7	Paramaribo District	PM	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
04dda4c4-58ff-4c48-8f38-61d0caa68cbd	9365ab24-b5f4-4111-aa84-5bfce45737d7	Saramacca District	SA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
1d18eb78-0e19-477e-bee4-0e54ba9d7ac8	9365ab24-b5f4-4111-aa84-5bfce45737d7	Sipaliwini District	SI	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
f4816e82-9501-4532-94c1-8ca7336fae16	9365ab24-b5f4-4111-aa84-5bfce45737d7	Wanica District	WA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
53c4fc56-889b-4fd2-85d3-3bf547bd75aa	85bea4b5-26fe-4223-99d5-555de66f08c8	Hhohho District	HH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7f4ef50c-61af-416f-be4f-438840dffc32	85bea4b5-26fe-4223-99d5-555de66f08c8	Lubombo District	LU	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
fb758732-59ea-4a48-b8f7-3ccfcb6c849c	85bea4b5-26fe-4223-99d5-555de66f08c8	Manzini District	MA	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
65be4747-bce7-43fb-8b3d-2849f7845d02	85bea4b5-26fe-4223-99d5-555de66f08c8	Shiselweni District	SH	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3b5aa913-ad0a-4725-bb00-98ca473d176d	6359fcc3-572c-4568-8a30-3f12b4ecd682	Blekinge	K	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
7a921ebe-4b0e-43e3-b555-a8332e7992bd	6359fcc3-572c-4568-8a30-3f12b4ecd682	Dalarna County	W	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
ca8b2a3d-8cfb-4ca7-b4cc-e21d01266ab8	6359fcc3-572c-4568-8a30-3f12b4ecd682	Gotland County	I	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
dc841124-ed7b-4384-bd39-b0f1de5de101	6359fcc3-572c-4568-8a30-3f12b4ecd682	Gävleborg County	X	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
676b70a4-f737-4d2d-911c-94e4a27e5bdc	6359fcc3-572c-4568-8a30-3f12b4ecd682	Halland County	N	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
cf47e7b3-7700-4a51-84a3-69959749e70a	6359fcc3-572c-4568-8a30-3f12b4ecd682	Jönköping County	F	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b986fdf0-66a0-42ff-8fc7-26e99c624bfc	6359fcc3-572c-4568-8a30-3f12b4ecd682	Kalmar County	H	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6cd4d023-fea0-48e7-8a07-0253930421e5	6359fcc3-572c-4568-8a30-3f12b4ecd682	Kronoberg County	G	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e2cb00c2-cfe4-44e5-8297-563eddc41608	6359fcc3-572c-4568-8a30-3f12b4ecd682	Norrbotten County	BD	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
44e0819e-9d70-493c-9200-d0b3d11b0cf0	6359fcc3-572c-4568-8a30-3f12b4ecd682	Skåne County	M	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
5a86250b-fe0c-4c63-ac23-09b7ef47d71f	6359fcc3-572c-4568-8a30-3f12b4ecd682	Stockholm County	AB	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
54eaf6ea-5abb-4fbc-9b4f-2f769591409d	6359fcc3-572c-4568-8a30-3f12b4ecd682	Södermanland County	D	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
b91ef173-1ad5-4667-8dd1-52bec16624c0	6359fcc3-572c-4568-8a30-3f12b4ecd682	Uppsala County	C	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
e31116d8-d7e8-4949-97aa-761a3576b6b3	6359fcc3-572c-4568-8a30-3f12b4ecd682	Värmland County	S	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
3a757678-8c2a-4ae4-86bb-55275e9d77cd	6359fcc3-572c-4568-8a30-3f12b4ecd682	Västerbotten County	AC	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
a7101ed5-c05d-4435-bf37-918269934129	6359fcc3-572c-4568-8a30-3f12b4ecd682	Västernorrland County	Y	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
6501a34e-6ff3-45c1-a0be-be09a11a6174	6359fcc3-572c-4568-8a30-3f12b4ecd682	Västmanland County	U	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
126ca7fa-8770-4ab4-96d9-33951747d2e3	6359fcc3-572c-4568-8a30-3f12b4ecd682	Västra Götaland County	O	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
4eee04d3-1d3b-463f-9ba8-383b79a4eb56	6359fcc3-572c-4568-8a30-3f12b4ecd682	Örebro County	T	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
52ea6789-58be-4372-bd4a-fb21adfe7f7a	6359fcc3-572c-4568-8a30-3f12b4ecd682	Östergötland County	E	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
30f8ce09-0d8d-41cf-be82-33c4ad4c050f	d76dda55-9970-4da1-a383-f21ccfb0da4f	Aargau	AG	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
c62973aa-2390-4d24-98bc-bc4434be6817	d76dda55-9970-4da1-a383-f21ccfb0da4f	Appenzell Ausserrhoden	AR	t	2026-02-25 08:11:36.644	2026-02-25 08:11:36.644	\N	\N	\N	\N
56fa65bb-9dca-4722-8f6f-59dd1de69b66	d76dda55-9970-4da1-a383-f21ccfb0da4f	Appenzell Innerrhoden	AI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
efce0dd9-5e81-4108-a5d4-1aecff0808de	d76dda55-9970-4da1-a383-f21ccfb0da4f	Basel-Land	BL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
326ab4b7-1214-420d-8ed7-c6b49f72a526	d76dda55-9970-4da1-a383-f21ccfb0da4f	Basel-Stadt	BS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
791c220f-cbb1-41f8-bc3e-5939a97dfcf2	d76dda55-9970-4da1-a383-f21ccfb0da4f	Bern	BE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
466a5dc7-4f11-4908-a60f-634f82a15457	d76dda55-9970-4da1-a383-f21ccfb0da4f	Fribourg	FR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b4a9cdd3-4710-4587-9796-ebbb3b093f14	d76dda55-9970-4da1-a383-f21ccfb0da4f	Geneva	GE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5fa22c3a-ab37-4487-af9c-476d9968a874	d76dda55-9970-4da1-a383-f21ccfb0da4f	Glarus	GL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4edf3a9c-75c7-4a99-997e-29c4da0db591	d76dda55-9970-4da1-a383-f21ccfb0da4f	Graubünden	GR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
18ef05c8-8a30-4531-ba77-829b79d5f234	d76dda55-9970-4da1-a383-f21ccfb0da4f	Jura	JU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f0f84cf9-4f88-47ba-b818-16c0222bb2ad	d76dda55-9970-4da1-a383-f21ccfb0da4f	Lucerne	LU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1214c0f7-16a1-4310-8b10-3a9bfbde7b5b	d76dda55-9970-4da1-a383-f21ccfb0da4f	Neuchâtel	NE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c450a012-9628-4348-8c1e-8a4a58ba15c0	d76dda55-9970-4da1-a383-f21ccfb0da4f	Nidwalden	NW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3037a1b2-5ecf-439c-b8d3-f8142782fb54	d76dda55-9970-4da1-a383-f21ccfb0da4f	Obwalden	OW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c681a08a-64b7-4088-84be-ec099736bbbb	d76dda55-9970-4da1-a383-f21ccfb0da4f	Schaffhausen	SH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5ac976b8-2508-46ce-b0b9-8afcd9b3e9e5	d76dda55-9970-4da1-a383-f21ccfb0da4f	Schwyz	SZ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0e82b5dd-6d0d-4199-822a-0e98f6df6a42	d76dda55-9970-4da1-a383-f21ccfb0da4f	Solothurn	SO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ca698476-b8e9-4b5d-9568-b9074927d7a6	d76dda55-9970-4da1-a383-f21ccfb0da4f	St. Gallen	SG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3af3372a-121a-4549-b6a7-9e79dff07d1d	d76dda55-9970-4da1-a383-f21ccfb0da4f	Thurgau	TG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8aec65db-f653-40ff-aa26-c1e3d6c6e737	d76dda55-9970-4da1-a383-f21ccfb0da4f	Ticino	TI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
78f1c2aa-0c95-45f4-899f-90d0e79358ae	d76dda55-9970-4da1-a383-f21ccfb0da4f	Uri	UR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
505b5132-4505-410d-a284-7011ee6d4f1e	d76dda55-9970-4da1-a383-f21ccfb0da4f	Valais	VS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6264a449-97fa-4921-bffd-dbbb51156ddc	d76dda55-9970-4da1-a383-f21ccfb0da4f	Vaud	VD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
69a4175c-f23c-40b3-b936-8e959b16194c	d76dda55-9970-4da1-a383-f21ccfb0da4f	Zug	ZG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9ba9b2e7-7e0b-43d9-b523-0f653391e0e7	d76dda55-9970-4da1-a383-f21ccfb0da4f	Zürich	ZH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
53f2a53f-9c78-4aaf-b3bc-60d4aa93cb06	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Al-Hasakah Governorate	HA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3ab741e6-aa08-4079-9d41-e7466a94d781	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Al-Raqqah Governorate	RA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9e397f26-0480-4c48-8c62-e2f9faf12435	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Aleppo Governorate	HL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
83ad13d6-2fb1-4525-85bf-6a6167733249	37c654d2-27bb-4cb9-9e2e-d6295a968edf	As-Suwayda Governorate	SU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a4f03a29-5495-454f-b5fa-bff9817e894f	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Damascus Governorate	DI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a689bb3a-274d-4a0e-885f-290d8811679e	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Daraa Governorate	DR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4a5d35f7-5dc4-4fdd-acbf-9170e10c4f70	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Deir ez-Zor Governorate	DY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
107f5dd1-a9f6-40a2-9261-975c6749bcf6	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Hama Governorate	HM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8b27b24a-cc85-4afb-bace-46fa9d761324	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Homs Governorate	HI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6c7efe13-381f-49a7-9645-340d1c996090	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Idlib Governorate	ID	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5e6fda62-3b95-4c56-a5f7-7717147a5305	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Latakia Governorate	LA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
30ffab4b-d729-4f80-9c59-3374de921afd	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Quneitra Governorate	QU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
31eccdf1-6cc7-4d29-9699-82dd1c0b240c	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Rif Dimashq Governorate	RD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4df4d2a0-f020-4794-ad83-cb54c61b1439	37c654d2-27bb-4cb9-9e2e-d6295a968edf	Tartus Governorate	TA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cff966ba-8f7d-4f99-940f-fa58cba71251	336e6e5e-009b-4d42-a13e-2698075ab2c4	Changhua	CHA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e48961f6-d00b-4213-961e-47c4a93f90bf	336e6e5e-009b-4d42-a13e-2698075ab2c4	Chiayi	CYI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
93800f78-ff39-4b8a-a1b3-11257ede929a	336e6e5e-009b-4d42-a13e-2698075ab2c4	Chiayi	CYQ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6470003a-3dc1-40fa-abc2-c65c6707cf6b	336e6e5e-009b-4d42-a13e-2698075ab2c4	Hsinchu	HSQ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
11697b21-3f34-42db-ae71-521906faa06b	336e6e5e-009b-4d42-a13e-2698075ab2c4	Hsinchu	HSZ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6fc55fea-a2be-465d-adb2-4d298bbb4487	336e6e5e-009b-4d42-a13e-2698075ab2c4	Hualien	HUA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f6558603-7a5c-402d-bded-97308e0ad54f	336e6e5e-009b-4d42-a13e-2698075ab2c4	Kaohsiung	KHH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
005e4348-abfa-4018-965f-c58ca2fc72d7	336e6e5e-009b-4d42-a13e-2698075ab2c4	Keelung	KEE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c74a3b3e-e05f-4894-94f0-455d25ab5644	336e6e5e-009b-4d42-a13e-2698075ab2c4	Kinmen	KIN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5d711c2a-b6ef-4634-b0e9-965d2a631ba3	336e6e5e-009b-4d42-a13e-2698075ab2c4	Lienchiang	LIE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ea4db88b-106c-42fd-bb18-6ee93f38896c	336e6e5e-009b-4d42-a13e-2698075ab2c4	Miaoli	MIA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c1be6e87-8b6c-4a26-8d4e-8707beddbb01	336e6e5e-009b-4d42-a13e-2698075ab2c4	Nantou	NAN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6dbffa6b-6ec3-428d-86c7-120557d08db7	336e6e5e-009b-4d42-a13e-2698075ab2c4	New Taipei	NWT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
360d77e6-305a-44db-862e-d3dd596285f0	336e6e5e-009b-4d42-a13e-2698075ab2c4	Penghu	PEN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5acc05dd-5263-4480-a642-f226c2845e9d	336e6e5e-009b-4d42-a13e-2698075ab2c4	Pingtung	PIF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
22144fb1-510b-4643-b6a1-bf093f4d46bc	336e6e5e-009b-4d42-a13e-2698075ab2c4	Taichung	TXG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
08cce4f4-984c-422b-bfb6-757a13b504be	336e6e5e-009b-4d42-a13e-2698075ab2c4	Tainan	TNN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
61f2a8fd-bee1-4a02-bdec-1d3d31fb5212	336e6e5e-009b-4d42-a13e-2698075ab2c4	Taipei	TPE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8c02ef8f-a4db-4c53-958d-11e3f9b8ddfa	336e6e5e-009b-4d42-a13e-2698075ab2c4	Taitung	TTT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2782410e-10cb-4d1b-92cf-8450b40e5125	336e6e5e-009b-4d42-a13e-2698075ab2c4	Taoyuan	TAO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
418f55a0-d9cd-4637-8d12-6c5b2c2468ed	336e6e5e-009b-4d42-a13e-2698075ab2c4	Yilan	ILA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0dc54972-7b79-4a2a-a4d5-c8736c1002ff	336e6e5e-009b-4d42-a13e-2698075ab2c4	Yunlin	YUN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e99cd86c-de78-48b1-af40-c7698cc966df	85e4e3ae-fb7a-4423-a3b5-40a36117e45b	Gorno-Badakhshan Autonomous Province	GB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4976dfff-821a-4193-b763-cefd227329c4	85e4e3ae-fb7a-4423-a3b5-40a36117e45b	Khatlon Province	KT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
877a859c-5efd-4f00-b1fc-b3b1f282a9ff	85e4e3ae-fb7a-4423-a3b5-40a36117e45b	Sughd Province	SU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4ea072fd-3d2d-4507-82fd-336ab231320e	85e4e3ae-fb7a-4423-a3b5-40a36117e45b	districts of Republican Subordination	RA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5d726845-a154-4256-baf1-99d8c2ce135d	34524f7e-6a51-4b20-8b4c-85e07e096da4	Arusha	01	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
05eb13d7-7bab-4faf-973a-5502cedae7e8	34524f7e-6a51-4b20-8b4c-85e07e096da4	Dar es Salaam	02	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d0ead73b-c638-45e9-95d5-1dbdbcdca359	34524f7e-6a51-4b20-8b4c-85e07e096da4	Dodoma	03	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
76f51d3c-66f9-418f-aa22-1d36e954cfec	34524f7e-6a51-4b20-8b4c-85e07e096da4	Geita	27	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b51d505e-fcbf-489a-94e4-d6fb2e8664dc	34524f7e-6a51-4b20-8b4c-85e07e096da4	Iringa	04	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7876a40e-4b59-47d1-b0bc-3fa0ab88658e	34524f7e-6a51-4b20-8b4c-85e07e096da4	Kagera	05	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dfc80c88-3dff-4a8e-86fc-ef00c0de7af7	34524f7e-6a51-4b20-8b4c-85e07e096da4	Katavi	28	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
343b89e6-356a-4879-ab81-3dcdc3ba07f0	34524f7e-6a51-4b20-8b4c-85e07e096da4	Kigoma	08	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1feefdb4-67c2-4435-a7f8-10506d21add3	34524f7e-6a51-4b20-8b4c-85e07e096da4	Kilimanjaro	09	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
85f7cf13-1867-4058-a9f0-0ec35fd39cb6	34524f7e-6a51-4b20-8b4c-85e07e096da4	Lindi	12	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d85ba1c2-0d86-4bcb-8d4f-fccc24e4d0e4	34524f7e-6a51-4b20-8b4c-85e07e096da4	Manyara	26	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7548e5db-38e2-4085-99d1-d2d7e4a0bd66	34524f7e-6a51-4b20-8b4c-85e07e096da4	Mara	13	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5fc1d3cd-b2fe-4620-80bd-620e1ac90227	34524f7e-6a51-4b20-8b4c-85e07e096da4	Mbeya	14	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
19d7d3a5-ef18-42dd-9cd2-7750288b9ed1	34524f7e-6a51-4b20-8b4c-85e07e096da4	Morogoro	16	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8d394941-f92b-427a-add3-50365e7d5caf	34524f7e-6a51-4b20-8b4c-85e07e096da4	Mtwara	17	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
690a718a-e0e2-49c7-8997-fe8b20c755e9	34524f7e-6a51-4b20-8b4c-85e07e096da4	Mwanza	18	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c6b657bf-dce5-4ad6-917d-c9495204fa1f	34524f7e-6a51-4b20-8b4c-85e07e096da4	Njombe	29	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3ad7816f-4903-43e0-9290-a470ff0c8b93	34524f7e-6a51-4b20-8b4c-85e07e096da4	Pemba North	06	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
95cc252a-e7dd-4efe-a9d1-7a02b892ac36	34524f7e-6a51-4b20-8b4c-85e07e096da4	Pemba South	10	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6dad4d32-38c9-417d-b9d5-0e8344cea7c5	34524f7e-6a51-4b20-8b4c-85e07e096da4	Pwani	19	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e4b2669b-2cd9-42a7-8387-5939c5328ece	34524f7e-6a51-4b20-8b4c-85e07e096da4	Rukwa	20	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e6157e04-5358-4683-8051-7d7081fd4f2e	34524f7e-6a51-4b20-8b4c-85e07e096da4	Ruvuma	21	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0746d003-b2d8-4c5e-a389-8c0521656e18	34524f7e-6a51-4b20-8b4c-85e07e096da4	Shinyanga	22	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f401f7b2-11be-4e5d-94db-ae0f3999883b	34524f7e-6a51-4b20-8b4c-85e07e096da4	Simiyu	30	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
67b19b10-3364-4702-bd28-e3c4e70a12ed	34524f7e-6a51-4b20-8b4c-85e07e096da4	Singida	23	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
013bf128-119c-4026-a293-b27389cf66c3	34524f7e-6a51-4b20-8b4c-85e07e096da4	Songwe	31	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5cb33526-1955-4108-b16a-7676516bccc7	34524f7e-6a51-4b20-8b4c-85e07e096da4	Tabora	24	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2bc1b00f-3ed4-4946-9834-b71c98c1e417	34524f7e-6a51-4b20-8b4c-85e07e096da4	Tanga	25	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
19a557f3-28dd-4b01-a26c-eb8b86e30b63	34524f7e-6a51-4b20-8b4c-85e07e096da4	Zanzibar North	07	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f30c207a-a2ea-40e3-a5ad-eaa9181aba3e	34524f7e-6a51-4b20-8b4c-85e07e096da4	Zanzibar South	11	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4b22f39c-d5c1-4fa2-810f-2c92bf64cf37	34524f7e-6a51-4b20-8b4c-85e07e096da4	Zanzibar West	15	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
692eaa6d-6cb5-4327-9449-0c4d4eebf62c	003d7a13-2a85-4f59-ac0d-086626675ac8	Amnat Charoen	37	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
90aed9d4-8634-4e73-8b4f-3eacbb1ef97d	003d7a13-2a85-4f59-ac0d-086626675ac8	Ang Thong	15	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a25c3b16-1405-47e1-b226-7866e684b055	003d7a13-2a85-4f59-ac0d-086626675ac8	Bangkok	10	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0df4a387-221f-4b63-8fcc-6196327b30ad	003d7a13-2a85-4f59-ac0d-086626675ac8	Bueng Kan	38	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
aedab296-7952-4e7d-9d4c-3d44ba1edc71	003d7a13-2a85-4f59-ac0d-086626675ac8	Buri Ram	31	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3ba5c4cf-2a88-4d1e-b262-29d8893a168b	003d7a13-2a85-4f59-ac0d-086626675ac8	Chachoengsao	24	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2908956c-5ae5-43ef-ad8a-62f82125fbed	003d7a13-2a85-4f59-ac0d-086626675ac8	Chai Nat	18	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dbad1247-0dee-4f82-9e0a-aab84e378eac	003d7a13-2a85-4f59-ac0d-086626675ac8	Chaiyaphum	36	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
efd83653-e05e-43e3-967f-76eef82e5161	003d7a13-2a85-4f59-ac0d-086626675ac8	Chanthaburi	22	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
05dd2071-7f33-49e3-969c-6eb5b91fe951	003d7a13-2a85-4f59-ac0d-086626675ac8	Chiang Mai	50	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
45de5daa-e80c-4b22-9792-e17a5e436f4d	003d7a13-2a85-4f59-ac0d-086626675ac8	Chiang Rai	57	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9d94c578-87dd-4a07-b889-4ff65fb7d920	003d7a13-2a85-4f59-ac0d-086626675ac8	Chon Buri	20	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5b09e191-9392-4118-8a2a-4a053a977738	003d7a13-2a85-4f59-ac0d-086626675ac8	Chumphon	86	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d5986684-16ff-4ef7-95be-ca531f80fd37	003d7a13-2a85-4f59-ac0d-086626675ac8	Kalasin	46	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f04ddf97-93d2-4079-a171-3f8ee4fdc295	003d7a13-2a85-4f59-ac0d-086626675ac8	Kamphaeng Phet	62	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7d29b9f7-67cb-4c9a-b503-c7ff5286f317	003d7a13-2a85-4f59-ac0d-086626675ac8	Kanchanaburi	71	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
db5589b8-424c-41d3-9602-45164da9ab2c	003d7a13-2a85-4f59-ac0d-086626675ac8	Khon Kaen	40	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
566c93d4-56f8-47fc-8848-e714be7fab7e	003d7a13-2a85-4f59-ac0d-086626675ac8	Krabi	81	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
20f3793b-789a-4e25-aa4c-7ee8fd8c806c	003d7a13-2a85-4f59-ac0d-086626675ac8	Lampang	52	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
679fafe4-d19f-403d-aca8-36babfccb8d4	003d7a13-2a85-4f59-ac0d-086626675ac8	Lamphun	51	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7ebb0c8b-611a-4fc3-9365-13c0a95d8086	003d7a13-2a85-4f59-ac0d-086626675ac8	Loei	42	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b26aec08-66d1-4147-92c1-f3fc23203799	003d7a13-2a85-4f59-ac0d-086626675ac8	Lop Buri	16	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
21e8754f-93fd-4aec-add6-80dfc5c392a0	003d7a13-2a85-4f59-ac0d-086626675ac8	Mae Hong Son	58	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
166612fd-01e7-495a-a63a-a6e79611124b	003d7a13-2a85-4f59-ac0d-086626675ac8	Maha Sarakham	44	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
83fd2f58-b824-4014-9f13-34ff57f5131b	003d7a13-2a85-4f59-ac0d-086626675ac8	Mukdahan	49	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d54ecefc-8c51-4322-8819-73ada577e061	003d7a13-2a85-4f59-ac0d-086626675ac8	Nakhon Nayok	26	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c4ba2734-46ea-40a7-9d3b-9676b8de150a	003d7a13-2a85-4f59-ac0d-086626675ac8	Nakhon Pathom	73	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e8f226e3-770e-4b02-8ffe-79bff064248b	003d7a13-2a85-4f59-ac0d-086626675ac8	Nakhon Phanom	48	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5cdbf94c-8b77-4c93-9914-65d96edfffe9	003d7a13-2a85-4f59-ac0d-086626675ac8	Nakhon Ratchasima	30	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c81bfa5e-5004-435b-bea2-580c9aea9b8f	003d7a13-2a85-4f59-ac0d-086626675ac8	Nakhon Sawan	60	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9353bbe2-2708-4c14-8731-dc74593bfc35	003d7a13-2a85-4f59-ac0d-086626675ac8	Nakhon Si Thammarat	80	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d998ad9c-38b8-4755-843b-9f4a90d6f8f4	003d7a13-2a85-4f59-ac0d-086626675ac8	Nan	55	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6fa24e28-42b8-4674-92a4-7c916e0e0dac	003d7a13-2a85-4f59-ac0d-086626675ac8	Narathiwat	96	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
63769d57-8650-43ad-9ca5-eabb581963dc	003d7a13-2a85-4f59-ac0d-086626675ac8	Nong Bua Lam Phu	39	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
33b355cf-7574-40b3-b5bf-504655453324	003d7a13-2a85-4f59-ac0d-086626675ac8	Nong Khai	43	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b9477559-be8b-4519-b7de-41efc4e4a43b	003d7a13-2a85-4f59-ac0d-086626675ac8	Nonthaburi	12	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1eeb5cca-311b-4fa4-9431-cc02c5c1d64a	003d7a13-2a85-4f59-ac0d-086626675ac8	Pathum Thani	13	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e3333207-5b08-4551-b6a0-f865a563181f	003d7a13-2a85-4f59-ac0d-086626675ac8	Pattani	94	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
41f5be67-e2ba-4853-be6b-dec46b6dd7c8	003d7a13-2a85-4f59-ac0d-086626675ac8	Pattaya	S	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
586519f4-7a0a-4ef0-958d-229e52f4e060	003d7a13-2a85-4f59-ac0d-086626675ac8	Phangnga	82	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
06409a96-e1e7-40ca-91a8-ade8107c9404	003d7a13-2a85-4f59-ac0d-086626675ac8	Phatthalung	93	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
753e6260-9f7b-4c46-b8db-b361d6b4ae2c	003d7a13-2a85-4f59-ac0d-086626675ac8	Phayao	56	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bc990c05-d7d8-48db-89a0-63fcd64c9ba5	003d7a13-2a85-4f59-ac0d-086626675ac8	Phetchabun	67	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b5d6305c-c02d-41c7-b0b3-0cef6730e143	003d7a13-2a85-4f59-ac0d-086626675ac8	Phetchaburi	76	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
93098078-f418-4288-bc0d-7887b9a2d43e	003d7a13-2a85-4f59-ac0d-086626675ac8	Phichit	66	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1023e1a7-82de-4674-bc5a-57f1d19b5cbb	003d7a13-2a85-4f59-ac0d-086626675ac8	Phitsanulok	65	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f33683e0-8607-4cb4-9695-d104c417d699	003d7a13-2a85-4f59-ac0d-086626675ac8	Phra Nakhon Si Ayutthaya	14	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6e4a98cf-92c1-43be-9929-69a1265a729a	003d7a13-2a85-4f59-ac0d-086626675ac8	Phrae	54	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
da1554b8-d13f-4322-a01e-7d920fc8008a	003d7a13-2a85-4f59-ac0d-086626675ac8	Phuket	83	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
df506032-4bea-4475-9764-0996c396c0f8	003d7a13-2a85-4f59-ac0d-086626675ac8	Prachin Buri	25	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d1efa0ce-39ed-476e-9f39-e6164d2667af	003d7a13-2a85-4f59-ac0d-086626675ac8	Prachuap Khiri Khan	77	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
295735f6-afec-4785-8bf8-23abfa1c5b72	003d7a13-2a85-4f59-ac0d-086626675ac8	Ranong	85	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b6da7384-beaf-4f0c-9e8a-edb5ee4c4c1a	003d7a13-2a85-4f59-ac0d-086626675ac8	Ratchaburi	70	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fa373556-9b81-4ac8-842f-57fe641e0336	003d7a13-2a85-4f59-ac0d-086626675ac8	Rayong	21	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ad68ed68-8a62-48ad-9a9a-0b5cd01f35d2	003d7a13-2a85-4f59-ac0d-086626675ac8	Roi Et	45	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
04b65be3-1c17-45e9-9760-e6fa35b7a576	003d7a13-2a85-4f59-ac0d-086626675ac8	Sa Kaeo	27	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
45fd4893-f415-40f3-ab10-6713edfedcc3	003d7a13-2a85-4f59-ac0d-086626675ac8	Sakon Nakhon	47	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
57d4adbf-5462-4329-90bf-b06208fbc679	003d7a13-2a85-4f59-ac0d-086626675ac8	Samut Prakan	11	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b475770d-c925-493d-b079-6702b853128c	003d7a13-2a85-4f59-ac0d-086626675ac8	Samut Sakhon	74	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
de8b87c1-9bc8-4dd1-8965-7978717b4bfa	003d7a13-2a85-4f59-ac0d-086626675ac8	Samut Songkhram	75	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7a114ae3-7b4b-473b-9727-c8299c35395d	003d7a13-2a85-4f59-ac0d-086626675ac8	Saraburi	19	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f1214f48-fa67-4f83-b5e4-30857ad604d0	003d7a13-2a85-4f59-ac0d-086626675ac8	Satun	91	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b5154f09-9960-49cc-bdd4-2b1a5def1fd2	003d7a13-2a85-4f59-ac0d-086626675ac8	Si Sa Ket	33	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
53dba470-0756-4466-81ae-86a98650a272	003d7a13-2a85-4f59-ac0d-086626675ac8	Sing Buri	17	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a775b420-2e7c-4c00-ba48-24ed01a4489f	003d7a13-2a85-4f59-ac0d-086626675ac8	Songkhla	90	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
66533494-9220-4dae-a7b0-639de52d5d63	003d7a13-2a85-4f59-ac0d-086626675ac8	Sukhothai	64	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ea37210a-ec61-4fab-882a-fc179a114aff	003d7a13-2a85-4f59-ac0d-086626675ac8	Suphan Buri	72	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
41db0538-ed94-4df0-9d93-0ebbfd59eb82	003d7a13-2a85-4f59-ac0d-086626675ac8	Surat Thani	84	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cb287981-5953-46a2-ade9-ed6d2dff069c	003d7a13-2a85-4f59-ac0d-086626675ac8	Surin	32	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ae7055fc-2f4d-4fb6-bba6-b7369439a436	003d7a13-2a85-4f59-ac0d-086626675ac8	Tak	63	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ad656566-712a-456f-97b3-c2829f5dcba4	003d7a13-2a85-4f59-ac0d-086626675ac8	Trang	92	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b150f8ea-14d4-46fc-924a-f81e71e62916	003d7a13-2a85-4f59-ac0d-086626675ac8	Trat	23	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9f40da08-ac91-499d-b8ed-4cf3c5309903	003d7a13-2a85-4f59-ac0d-086626675ac8	Ubon Ratchathani	34	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5c4ee581-ca2f-4823-b6ac-e172ad8ee24e	003d7a13-2a85-4f59-ac0d-086626675ac8	Udon Thani	41	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
296f0144-db1a-46e8-91b3-d2fd6e6df392	003d7a13-2a85-4f59-ac0d-086626675ac8	Uthai Thani	61	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0559ac2c-70be-4654-9f4f-2ca7e3fb2a21	003d7a13-2a85-4f59-ac0d-086626675ac8	Uttaradit	53	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
162be55d-173f-4419-a3de-b41ef7aa1f53	003d7a13-2a85-4f59-ac0d-086626675ac8	Yala	95	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a5929cca-2a68-4194-ac0f-dd2302921fc2	003d7a13-2a85-4f59-ac0d-086626675ac8	Yasothon	35	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0d83dae8-d834-46dc-9dd4-582d92535943	a3a07c37-6aff-49fa-8452-476e540b849b	Centrale Region	C	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5a651968-1615-476f-8ec0-c40aad9fcafb	a3a07c37-6aff-49fa-8452-476e540b849b	Kara Region	K	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0dffd45e-54c3-48de-b7a4-ab2f5ce1235d	a3a07c37-6aff-49fa-8452-476e540b849b	Maritime	M	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1adba8eb-efa2-48e7-aa95-8bb91cf9e148	a3a07c37-6aff-49fa-8452-476e540b849b	Plateaux Region	P	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d57bf05e-78eb-4d22-8e7b-b270bc0948a4	a3a07c37-6aff-49fa-8452-476e540b849b	Savanes Region	S	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
74d0b439-0623-44a9-a7c3-e71f238c8b2a	90e6041b-6ff3-456c-ba45-01b79518dc3b	Haʻapai	02	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a30ee96a-2bca-47f8-a550-9f535ef72981	90e6041b-6ff3-456c-ba45-01b79518dc3b	Niuas	03	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
72373776-842f-4c63-a492-ac9800899ff9	90e6041b-6ff3-456c-ba45-01b79518dc3b	Tongatapu	04	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8c497c8f-479e-4b7a-98c8-e7ca22f0d0a1	90e6041b-6ff3-456c-ba45-01b79518dc3b	Vavaʻu	05	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
46c25a8f-be7e-441d-9db2-4e0e8aa36ffa	90e6041b-6ff3-456c-ba45-01b79518dc3b	ʻEua	01	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d5961665-ee53-471b-937e-436a2e30f430	ead28f24-e8bd-439a-b119-b04ae97a4280	Arima	ARI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b57917fd-3c9e-47d8-bcfd-a47c3c5bb35a	ead28f24-e8bd-439a-b119-b04ae97a4280	Chaguanas	CHA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4c806ba2-4c89-42cd-a76b-a99759325271	ead28f24-e8bd-439a-b119-b04ae97a4280	Couva-Tabaquite-Talparo Regional Corporation	CTT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7cae2c89-a8f7-45ac-8fb0-93bf265c61bf	ead28f24-e8bd-439a-b119-b04ae97a4280	Diego Martin Regional Corporation	DMN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b9f8494e-2e29-45cf-aff1-7feaa014eb40	ead28f24-e8bd-439a-b119-b04ae97a4280	Eastern Tobago	ETO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fd5ec5aa-bc08-419f-ae2a-c4936134d01c	ead28f24-e8bd-439a-b119-b04ae97a4280	Penal-Debe Regional Corporation	PED	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a184fe96-f7a8-4740-8226-56b3a9e5babd	ead28f24-e8bd-439a-b119-b04ae97a4280	Point Fortin	PTF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2d9c1cd8-1207-4b49-b3c9-6ca6a26ad65f	ead28f24-e8bd-439a-b119-b04ae97a4280	Port of Spain	POS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f28449c4-6908-4790-ac55-b40f1dc2497e	ead28f24-e8bd-439a-b119-b04ae97a4280	Princes Town Regional Corporation	PRT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d2c5c3aa-65b1-42a4-b175-5e1d489a85db	ead28f24-e8bd-439a-b119-b04ae97a4280	Rio Claro-Mayaro Regional Corporation	MRC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e074e6b2-523e-4afb-bfb3-f8ee0a47608a	ead28f24-e8bd-439a-b119-b04ae97a4280	San Fernando	SFO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a841de1c-e6b1-4537-9ab9-7965d181f33b	ead28f24-e8bd-439a-b119-b04ae97a4280	San Juan-Laventille Regional Corporation	SJL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1e03898a-ff0b-4290-95ec-a8ee1adce012	ead28f24-e8bd-439a-b119-b04ae97a4280	Sangre Grande Regional Corporation	SGE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a894e539-8e74-444d-8ce4-980fc0fb7919	ead28f24-e8bd-439a-b119-b04ae97a4280	Siparia Regional Corporation	SIP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
127e22f3-d6db-4a1b-a02d-e05cf08a8595	ead28f24-e8bd-439a-b119-b04ae97a4280	Tunapuna-Piarco Regional Corporation	TUP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e33e70e3-2c20-402b-9449-ac50b087d167	ead28f24-e8bd-439a-b119-b04ae97a4280	Western Tobago	WTO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c2b5c13-dbb9-4621-8326-f9b2910c0561	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Ariana Governorate	12	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f6f5ac6b-8596-4976-b9a0-2e4ad3a144d7	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Ben Arous Governorate	13	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3a5fd180-3559-40ff-93e4-9ba4e760c618	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Bizerte Governorate	23	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fc25ef9d-ec4d-40d8-a2ca-a60ddea8811d	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Gabès Governorate	81	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c88dfd23-f544-4960-bd1d-1f5cc41ad17b	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Gafsa Governorate	71	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4d6de0e6-6231-4d29-aaa8-32ea0077e738	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Jendouba Governorate	32	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e3d36c12-51f9-47ee-837b-8340e94cb179	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Kairouan Governorate	41	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b0a787f7-21a8-43e2-af6c-a37dd24811b4	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Kasserine Governorate	42	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0b279a40-9c72-4a6a-836a-45be0920ac41	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Kassrine	31	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fc99a37d-bc34-476b-98c5-c3d490ec2329	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Kebili Governorate	73	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a6520ef1-b1df-4358-832c-91fcf5e7e2c1	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Kef Governorate	33	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f319d77d-0d95-4a15-845e-5232df69591f	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Mahdia Governorate	53	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f891c151-f469-417a-bbde-ee8e0711efb3	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Manouba Governorate	14	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b89c6cb6-f2f6-409f-99aa-c45cf344beb0	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Medenine Governorate	82	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
677bb96a-9140-4e1c-ad05-3d3bdf0304a5	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Monastir Governorate	52	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3a4e0c66-867f-4a86-9f9f-cc775052c2c4	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Sfax Governorate	61	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
94acb1a2-4169-41f6-9072-56fb7c21ae29	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Sidi Bouzid Governorate	43	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5ffec7c3-033c-4445-ac85-3a553192de4f	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Siliana Governorate	34	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b8ce4a76-6ac0-4428-a5d7-66b65e96d3ff	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Sousse Governorate	51	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
822c4ebe-aebc-4222-9e58-9cfdb90ea665	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Tataouine Governorate	83	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f6c84190-d11a-4a83-898c-465b159776e5	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Tozeur Governorate	72	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
56b4cef7-975a-4eff-b6be-941e2a4fd748	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Tunis Governorate	11	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
04269837-637f-4ba0-93b1-6fe95920823e	abfdf8bb-6cee-4f7d-b566-de2b551bd6b0	Zaghouan Governorate	22	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a9df60ec-2de0-40ff-ba1b-49c47920f36a	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Adana	01	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1064a778-55be-4545-9870-8f5eaa36e09d	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Adıyaman	02	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8debf460-edc6-4f41-805f-8f4b0146d17c	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Afyonkarahisar	03	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9d1ede40-d663-4193-8169-78219ec9fa56	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Aksaray	68	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
373ff176-eaf5-489a-8e1f-9f9ceec4f5de	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Amasya	05	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
557fa461-9014-4ed7-980e-7dc1684986cd	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Ankara	06	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1a7bc6bb-1fe3-4db7-a1ed-15d916f6b16c	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Antalya	07	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5eebca69-60fd-4ae7-b096-2f46a40ec166	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Ardahan	75	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c558fa1-8b33-4089-bcf8-eb791f37e3b3	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Artvin	08	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7f0b8e2b-aa60-4690-86c3-1121e00319e9	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Aydın	09	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a8be919a-143b-4dd8-b203-6fa0850288df	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Ağrı	04	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cdda68b4-5a33-4baf-be5a-5894358030a9	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Balıkesir	10	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5787759f-e9f8-43e4-87b8-36c68f799632	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bartın	74	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
40ca476e-5197-40b4-ac17-fb3076b80aa0	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Batman	72	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5aef10e6-c537-47fe-86bd-f37509910ba0	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bayburt	69	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
28639c38-29c0-4d29-b97d-ae30556273c0	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bilecik	11	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6b879526-ab18-4279-97b0-d28305e8be71	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bingöl	12	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
81455303-5cd6-46d9-a530-295671c2b9d7	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bitlis	13	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
19f51c60-9b92-4ff3-a7f7-c8710406ab84	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bolu	14	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
08a3f204-27ca-4f1d-8569-402a79d994d2	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Burdur	15	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4054f3b7-9839-48e2-a7f6-51ea7e884d7a	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Bursa	16	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
36db21e6-c4c1-4cab-92f0-37f55cfff905	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Denizli	20	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c21dc9cc-0baa-4c9e-b700-d4298f14c9d0	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Diyarbakır	21	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
81e023f1-08a1-409b-a0eb-7c6c0a5b9192	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Düzce	81	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3640c2d4-ad1e-4312-b72c-6450c88546f8	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Edirne	22	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
170ce4bf-c875-4c29-85d4-3f3a69b49013	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Elazığ	23	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
921cd551-7396-4ddc-87da-da2a631873e8	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Erzincan	24	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d5beb0de-7655-4456-90c8-3c6c4a53c436	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Erzurum	25	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6df550e6-5cf8-410b-a067-a23fb22c8530	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Eskişehir	26	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
160ecf55-7cd9-4438-8218-725ae195a8c7	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Gaziantep	27	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
02903108-e26c-42aa-849d-a93a2a487aba	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Giresun	28	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
986f21bc-89f5-44c4-a664-a9ad58f18401	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Gümüşhane	29	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
80e8e818-ff4b-489a-b5cd-d43a07efe262	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Hakkâri	30	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2cf44c2f-1abd-4986-be0e-37edf40d378e	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Hatay	31	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
69e1174e-4637-44b5-9d79-fd68876a4994	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Isparta	32	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
baf5cc7f-bee2-4207-b4ec-144c1e6c9bbe	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Istanbul	34	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
58b5f278-b570-42af-a698-6172e9b95a9a	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Iğdır	76	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
42643a30-6a53-4b2f-885b-a8b38939ee97	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kahramanmaraş	46	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
15bb7935-5a08-4b05-9433-52bace2020ad	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Karabük	78	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d12c0ba0-9114-41de-974e-c1c1d86bbb10	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Karaman	70	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
12ad2264-759b-4c30-a18d-c6cbd29609df	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kars	36	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6cfce45f-9549-41d3-9c46-33f6d6025645	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kastamonu	37	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
79ad15aa-11cd-4783-beb0-aea4868fd2f3	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kayseri	38	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3e7b6532-09a1-42b9-a777-3bd67ad7a913	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kilis	79	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7f8d10be-56c9-49b5-87aa-531d26bcad25	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kocaeli	41	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
57b2bc9c-a755-46e8-bfea-ae8a7706153c	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Konya	42	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8732fc45-8ddd-493e-9a60-53dce9b1de24	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kütahya	43	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3c4a4930-26af-4355-92b5-7faf5a033282	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kırklareli	39	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a5a9046e-566e-4e3a-a581-be9319ed573c	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kırıkkale	71	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b10d1d6b-0344-44cf-816b-3abad1d71390	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Kırşehir	40	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
357b1e8e-9d7c-428d-91e9-10968bd27b28	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Malatya	44	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cffbdb20-4209-4b35-ba2e-73a94db7f08b	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Manisa	45	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ae0bf996-4ba6-41dd-87de-58ab19d89b9c	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Mardin	47	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3eda4ed8-d75f-4c43-8bda-5b5683038044	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Mersin	33	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ef66d274-e0d4-481c-8b61-acd15a01aa90	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Muğla	48	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1523b66e-1e29-4fc0-8b3a-e36d82a24c05	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Muş	49	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bd19df78-c596-4060-9a2a-3596600e0bf4	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Nevşehir	50	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
05712646-e4c8-4206-b586-e5ca32d1114f	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Niğde	51	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f1e02af0-7d80-40ef-becd-29d67601e67b	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Ordu	52	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1b9004c1-7efb-445d-8301-95914dca049a	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Osmaniye	80	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d0aa7c59-9372-4a85-804b-e56eb5244bb3	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Rize	53	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bd426531-fb75-4685-84b8-78987145a2f7	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Sakarya	54	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
42daf010-bb1d-4da3-a8cb-a3e8b99d9207	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Samsun	55	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fb5f5d8d-dbbd-4d70-8cb6-21ac2d5db70c	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Siirt	56	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6a036dba-412b-4bbb-ad04-e0e502ee48bc	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Sinop	57	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8d227a74-a725-4c1a-97b3-e1af5f154fff	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Sivas	58	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a4b4b7e5-7e93-4beb-872f-b2ed9afd4c09	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Tekirdağ	59	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
332c58f7-326c-4cb4-89ac-b3d0e39cc530	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Tokat	60	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8c08e2e1-d06a-411e-b273-f40f9d4b6dde	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Trabzon	61	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5af0119b-768e-47b6-8426-d06494e8cca1	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Tunceli	62	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2e9b335e-7beb-4fd7-8af4-f2f850b0b30e	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Uşak	64	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
97fd0980-df07-4649-9a1d-d4244a3c26db	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Van	65	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d4648b21-937b-42dd-a70f-75d2228c9212	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Yalova	77	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d57d7b23-583a-4fbe-8316-9399be186d39	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Yozgat	66	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
60561865-75f7-4dd0-b1b8-a437f2a6c17a	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Zonguldak	67	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b8af18c5-2210-43b5-9b8e-43a0a1afa0c7	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Çanakkale	17	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
69216bae-38cf-4747-9c4c-870ca7cc7603	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Çankırı	18	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
97c4459f-7d56-4569-b8c6-275e8dab5dc7	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Çorum	19	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b0261b94-5d37-4068-822a-a8ad15dc820a	b7f7a8da-4fd0-484d-8608-6bff39e7376f	İzmir	35	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a4ff2ed7-940e-4f03-932d-eb72071594c5	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Şanlıurfa	63	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
61fe225b-e7d5-45fa-a75c-6eaac8be909f	b7f7a8da-4fd0-484d-8608-6bff39e7376f	Şırnak	73	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
12e9e518-3dd0-46d7-984c-ab33bc53ad5a	1c9d54fb-02e1-429f-bda7-fbf449442bae	Ahal Region	A	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
90000b95-a7f8-418e-9d70-ec8c802591e3	1c9d54fb-02e1-429f-bda7-fbf449442bae	Ashgabat	S	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9a4ad54e-ac2a-426d-aa0b-8f4ec2c6dc50	1c9d54fb-02e1-429f-bda7-fbf449442bae	Balkan Region	B	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
53c06564-fdd5-4d74-8d35-040c897cdd45	1c9d54fb-02e1-429f-bda7-fbf449442bae	Daşoguz Region	D	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dd8a337d-745c-48d6-adb1-832a04a80034	1c9d54fb-02e1-429f-bda7-fbf449442bae	Lebap Region	L	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b9bf7962-30e9-4339-a918-b5a07b7df9ec	1c9d54fb-02e1-429f-bda7-fbf449442bae	Mary Region	M	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
932d5a4e-703c-48e1-9d08-0cda981fefe4	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Funafuti	FUN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
40078ebb-63e9-4650-b7dc-fb2e9a1f32a0	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Nanumanga	NMG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ad9ce12f-24c2-4382-b837-527b71f60ba9	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Nanumea	NMA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7005f7b3-d173-4cc8-9f5b-a2da4dd679ea	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Niutao Island Council	NIT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
070cf25f-58dc-474d-b225-31d4053d89ec	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Nui	NUI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c7c8a06b-3945-419e-9d93-e28a75588e0d	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Nukufetau	NKF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
090d18be-809d-455c-80b0-2d6a8f2400e3	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Nukulaelae	NKL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
84a59c54-a6e7-4cdc-8dba-93faafb2a4b3	d5aee589-7821-4a3b-bb7f-33865ebdf0d2	Vaitupu	VAI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d26b573b-5845-4a3a-a8f3-04a11fdb2f20	cd9e2f92-8912-4711-931b-1bb712920a8c	Abim District	314	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6965a390-0e19-4b3a-ae33-90005a7db1f0	cd9e2f92-8912-4711-931b-1bb712920a8c	Adjumani District	301	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6edc765d-53b7-416e-8813-939d2181b0a7	cd9e2f92-8912-4711-931b-1bb712920a8c	Agago District	322	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f17c1fc0-74dd-4316-883e-460622b5bd8c	cd9e2f92-8912-4711-931b-1bb712920a8c	Alebtong District	323	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e2c99d6a-8434-4932-b32a-685d81da83d7	cd9e2f92-8912-4711-931b-1bb712920a8c	Amolatar District	315	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6a8cac49-9438-4c22-ad71-816c4735e9ba	cd9e2f92-8912-4711-931b-1bb712920a8c	Amudat District	324	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dff67c97-e43b-47ab-9428-d8f12104a141	cd9e2f92-8912-4711-931b-1bb712920a8c	Amuria District	216	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
20fa8da4-387f-4ece-9f06-8c3c67eaab68	cd9e2f92-8912-4711-931b-1bb712920a8c	Amuru District	316	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
72d5f2b2-721a-48ae-ac93-f09346d4e243	cd9e2f92-8912-4711-931b-1bb712920a8c	Apac District	302	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
24875b0e-2aee-49d2-95a1-b0f98f6b3d43	cd9e2f92-8912-4711-931b-1bb712920a8c	Arua District	303	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8f13da77-e12e-438e-af94-3f7c49a908e4	cd9e2f92-8912-4711-931b-1bb712920a8c	Budaka District	217	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
40294c05-990a-4220-ae07-6403bfef364a	cd9e2f92-8912-4711-931b-1bb712920a8c	Bududa District	218	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
17b3baaf-8df5-4294-8fa8-e397af20c1e9	cd9e2f92-8912-4711-931b-1bb712920a8c	Bugiri District	201	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4d46a8e8-0a10-444b-ad2b-fd9dc3469315	cd9e2f92-8912-4711-931b-1bb712920a8c	Buhweju District	420	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4ef9e1d0-f768-437d-a31c-e162213b6ed5	cd9e2f92-8912-4711-931b-1bb712920a8c	Buikwe District	117	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e8e1c7db-95b1-4bf7-9e74-c7af2647f783	cd9e2f92-8912-4711-931b-1bb712920a8c	Bukedea District	219	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
41e9a32a-b5af-4cd3-a016-9e93f5065124	cd9e2f92-8912-4711-931b-1bb712920a8c	Bukomansimbi District	118	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
913cb3a8-f25f-4bc7-9ebb-dc5d3d3836a2	cd9e2f92-8912-4711-931b-1bb712920a8c	Bukwo District	220	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c6799f35-c6d5-48f2-b44c-2083dd6f0d16	cd9e2f92-8912-4711-931b-1bb712920a8c	Bulambuli District	225	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
eeda587b-8b59-470e-a257-79faa1d77f89	cd9e2f92-8912-4711-931b-1bb712920a8c	Buliisa District	416	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7a8048e8-23da-4c69-bf3a-8b9a1acb5c34	cd9e2f92-8912-4711-931b-1bb712920a8c	Bundibugyo District	401	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
551c9398-70b0-4f7a-a2b5-a8ddec65b7c6	cd9e2f92-8912-4711-931b-1bb712920a8c	Bunyangabu District	430	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0a456a43-60ca-4d6b-9bf3-5e70c096b6c9	cd9e2f92-8912-4711-931b-1bb712920a8c	Bushenyi District	402	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
31857d7a-c8a9-4906-a2aa-10412fa19eb6	cd9e2f92-8912-4711-931b-1bb712920a8c	Busia District	202	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1f4cc6e0-b346-4714-a127-2a620fcdec86	cd9e2f92-8912-4711-931b-1bb712920a8c	Butaleja District	221	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d1226ef2-a43f-43ee-ad4d-1ab8e4ad7bfa	cd9e2f92-8912-4711-931b-1bb712920a8c	Butambala District	119	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bdda407d-a2ee-409e-b9b5-f1994ac312b8	cd9e2f92-8912-4711-931b-1bb712920a8c	Butebo District	233	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4d02d3ee-6098-4b5d-bc88-56dc4887cbe6	cd9e2f92-8912-4711-931b-1bb712920a8c	Buvuma District	120	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ebd542ed-a516-481a-b636-727a9b2f4cca	cd9e2f92-8912-4711-931b-1bb712920a8c	Buyende District	226	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
74bf5981-dfe4-4ebf-b10a-ee9a0ce77731	cd9e2f92-8912-4711-931b-1bb712920a8c	Central Region	C	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0dadb7ca-153e-45d0-85ec-f2f4ee83de01	cd9e2f92-8912-4711-931b-1bb712920a8c	Dokolo District	317	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
65485387-6ec9-4823-b2c5-84499044cd69	cd9e2f92-8912-4711-931b-1bb712920a8c	Eastern Region	E	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
29e27b0a-2921-414f-9183-f64621742ec2	cd9e2f92-8912-4711-931b-1bb712920a8c	Gomba District	121	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7ca248c2-bc46-46b1-92ef-1fc8489c3696	cd9e2f92-8912-4711-931b-1bb712920a8c	Gulu District	304	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a18cc9a6-bc86-4a69-b0b3-a7fadc24a7ff	cd9e2f92-8912-4711-931b-1bb712920a8c	Ibanda District	417	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bb2ab01a-30c0-49d0-9be7-94a4473e5586	cd9e2f92-8912-4711-931b-1bb712920a8c	Iganga District	203	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7294d000-94b8-42cd-9049-77f30ff3211c	cd9e2f92-8912-4711-931b-1bb712920a8c	Isingiro District	418	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3285151c-101f-4bc2-ab52-1045962dcd6a	cd9e2f92-8912-4711-931b-1bb712920a8c	Jinja District	204	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
db96b6eb-6842-4796-a496-fa47b4830d5c	cd9e2f92-8912-4711-931b-1bb712920a8c	Kaabong District	318	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e3c4753a-92d6-46fe-b2f4-94b03289f686	cd9e2f92-8912-4711-931b-1bb712920a8c	Kabale District	404	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6a7d0d6c-a5c1-4c94-ae07-6f7f31f4eee6	cd9e2f92-8912-4711-931b-1bb712920a8c	Kabarole District	405	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9c02ffa4-d666-40ed-95ca-6fd37e83daab	cd9e2f92-8912-4711-931b-1bb712920a8c	Kaberamaido District	213	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c4a6604c-134e-49a1-8421-9517c3a4df2f	cd9e2f92-8912-4711-931b-1bb712920a8c	Kagadi District	427	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f06b2a4c-a352-4955-b3f9-32f96a5de768	cd9e2f92-8912-4711-931b-1bb712920a8c	Kakumiro District	428	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4ccbc789-c13b-4534-b3db-a4d298340398	cd9e2f92-8912-4711-931b-1bb712920a8c	Kalangala District	101	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6f499a0f-0657-40bb-a54b-513300cf4e39	cd9e2f92-8912-4711-931b-1bb712920a8c	Kaliro District	222	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2d312a87-45ce-4b1f-a75a-5fd47996ad3b	cd9e2f92-8912-4711-931b-1bb712920a8c	Kalungu District	122	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6a480477-082a-4207-a8d9-9bd69549eee0	cd9e2f92-8912-4711-931b-1bb712920a8c	Kampala District	102	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
308fd1c9-9461-4823-8f5d-c77442b6d412	cd9e2f92-8912-4711-931b-1bb712920a8c	Kamuli District	205	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
70fc956b-2c62-4835-b55a-525bf86a3a31	cd9e2f92-8912-4711-931b-1bb712920a8c	Kamwenge District	413	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
10345167-fa14-4804-b6a9-816f52cc6a0f	cd9e2f92-8912-4711-931b-1bb712920a8c	Kanungu District	414	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f9f60a39-c6d9-4854-b9da-6f64060b37a8	cd9e2f92-8912-4711-931b-1bb712920a8c	Kapchorwa District	206	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4b2f2b04-430e-4751-b320-167a4e2f8b81	cd9e2f92-8912-4711-931b-1bb712920a8c	Kasese District	406	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fd5791c8-4409-4f6d-a318-e9c677524347	cd9e2f92-8912-4711-931b-1bb712920a8c	Katakwi District	207	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fe9ac4b0-41ab-40f2-a4c9-f19259f0732b	cd9e2f92-8912-4711-931b-1bb712920a8c	Kayunga District	112	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dc38c91c-25c7-40ea-ac54-6e7ecfa22463	cd9e2f92-8912-4711-931b-1bb712920a8c	Kibaale District	407	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ea6c4ecf-f729-49cc-9c53-a60bc90611ec	cd9e2f92-8912-4711-931b-1bb712920a8c	Kiboga District	103	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2744f18c-d973-4a5d-a84b-347ea02b3017	cd9e2f92-8912-4711-931b-1bb712920a8c	Kibuku District	227	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c8884f80-542d-4ba2-9111-9c8cc860cd07	cd9e2f92-8912-4711-931b-1bb712920a8c	Kiruhura District	419	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
85bb03d6-3ce7-4301-a877-3cabf669da76	cd9e2f92-8912-4711-931b-1bb712920a8c	Kiryandongo District	421	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c7aee48b-acc1-4204-bcdf-793ec91e8e46	cd9e2f92-8912-4711-931b-1bb712920a8c	Kisoro District	408	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
11c5a9fe-069f-41c9-a15b-f3d04992b348	cd9e2f92-8912-4711-931b-1bb712920a8c	Kitgum District	305	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ae378d29-621f-4f4a-b649-35ec91d8493f	cd9e2f92-8912-4711-931b-1bb712920a8c	Koboko District	319	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c7524d4-0e0e-4477-825d-0a91c9245d71	cd9e2f92-8912-4711-931b-1bb712920a8c	Kole District	325	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c418f7b1-894e-49f5-872c-5c8c880b5354	cd9e2f92-8912-4711-931b-1bb712920a8c	Kotido District	306	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1cd64889-94b5-4eaa-8d7d-550e91c2c0ac	cd9e2f92-8912-4711-931b-1bb712920a8c	Kumi District	208	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
30f4fcba-46cf-47d2-bbe5-98a0f8846fb8	cd9e2f92-8912-4711-931b-1bb712920a8c	Kween District	228	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bd41de00-55e6-4f9b-89b7-235e248c381b	cd9e2f92-8912-4711-931b-1bb712920a8c	Kyankwanzi District	123	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
88f3cc43-f444-439c-9860-cdb73ec511ab	cd9e2f92-8912-4711-931b-1bb712920a8c	Kyegegwa District	422	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ab8c6318-8a02-44fd-9a7f-84e0e8310417	cd9e2f92-8912-4711-931b-1bb712920a8c	Kyenjojo District	415	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cd66a323-9d95-4f44-be8e-ee2def62dc09	cd9e2f92-8912-4711-931b-1bb712920a8c	Kyotera District	125	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a8fcde9e-2bc3-44f7-9a06-52e29b2105df	cd9e2f92-8912-4711-931b-1bb712920a8c	Lamwo District	326	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
26955514-ea8c-4f73-ada7-c94218c71401	cd9e2f92-8912-4711-931b-1bb712920a8c	Lira District	307	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4db124a1-490f-45ec-b5ea-fa710ab08a14	cd9e2f92-8912-4711-931b-1bb712920a8c	Luuka District	229	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cad1101a-6438-448d-bc96-8fc7c36786ae	cd9e2f92-8912-4711-931b-1bb712920a8c	Luwero District	104	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9fb3ecb2-6710-4743-b76b-dbe1ee597c1e	cd9e2f92-8912-4711-931b-1bb712920a8c	Lwengo District	124	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
92b91d4c-215a-48d9-a345-095e745e96a0	cd9e2f92-8912-4711-931b-1bb712920a8c	Lyantonde District	114	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bd8e5a65-5e82-49a3-9fa2-6d241aa79ec1	cd9e2f92-8912-4711-931b-1bb712920a8c	Manafwa District	223	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
21d10fc0-8047-4204-a04f-fc8edbb47a5c	cd9e2f92-8912-4711-931b-1bb712920a8c	Maracha District	320	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
af5f2316-d090-4572-b6e0-a6f8844b942e	cd9e2f92-8912-4711-931b-1bb712920a8c	Masaka District	105	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f41595b4-e560-42ec-b11d-160b44a1abb8	cd9e2f92-8912-4711-931b-1bb712920a8c	Masindi District	409	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
df88df53-b3bb-4007-aaeb-a3b640878506	cd9e2f92-8912-4711-931b-1bb712920a8c	Mayuge District	214	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
17f9c602-d1fe-4d74-b83a-648934f9c647	cd9e2f92-8912-4711-931b-1bb712920a8c	Mbale District	209	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5e7d3ecb-f3c0-44cf-98a2-94d84ba63d82	cd9e2f92-8912-4711-931b-1bb712920a8c	Mbarara District	410	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d36c98e7-f9ea-4e77-950b-137adc15135e	cd9e2f92-8912-4711-931b-1bb712920a8c	Mitooma District	423	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c5576437-523e-4f15-92f0-a7acae04fdfe	cd9e2f92-8912-4711-931b-1bb712920a8c	Mityana District	115	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1d7eb421-b948-43e0-b9ab-3e22df647931	cd9e2f92-8912-4711-931b-1bb712920a8c	Moroto District	308	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
462ff62d-2189-4459-b72e-211abb8a6fb1	cd9e2f92-8912-4711-931b-1bb712920a8c	Moyo District	309	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
716093e4-225a-4749-8c86-8205ff20dcfb	cd9e2f92-8912-4711-931b-1bb712920a8c	Mpigi District	106	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b9ab9aca-c14e-44dd-9aa4-c4a77cfaa359	cd9e2f92-8912-4711-931b-1bb712920a8c	Mubende District	107	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
10ab091e-f37f-4222-b5b8-815717411e2a	cd9e2f92-8912-4711-931b-1bb712920a8c	Mukono District	108	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4eb35761-dfe6-4c97-bbd3-e2677b76d3ad	cd9e2f92-8912-4711-931b-1bb712920a8c	Nakapiripirit District	311	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8d3f878a-cded-4f99-adf3-4cf43229fa6d	cd9e2f92-8912-4711-931b-1bb712920a8c	Nakaseke District	116	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7e94ec34-df0b-4194-b191-89089eb9f855	cd9e2f92-8912-4711-931b-1bb712920a8c	Nakasongola District	109	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
19472155-4ef4-406d-a285-b2bae70f4b25	cd9e2f92-8912-4711-931b-1bb712920a8c	Namayingo District	230	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
86b0b587-d6c7-4ea5-a0f6-467bffd24f02	cd9e2f92-8912-4711-931b-1bb712920a8c	Namisindwa District	234	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b1ed6542-f679-4b0c-ab92-2fc50edfe73e	cd9e2f92-8912-4711-931b-1bb712920a8c	Namutumba District	224	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bdb8ec81-1546-4db3-8287-02963a43737c	cd9e2f92-8912-4711-931b-1bb712920a8c	Napak District	327	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
86607a8a-a59c-4fc9-be69-4226cb33a5f5	cd9e2f92-8912-4711-931b-1bb712920a8c	Nebbi District	310	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9690128d-9a6d-46b9-847d-8382906d116b	cd9e2f92-8912-4711-931b-1bb712920a8c	Ngora District	231	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cc5cf4b6-ff67-442a-9165-9c3b5d644ffc	cd9e2f92-8912-4711-931b-1bb712920a8c	Northern Region	N	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c0c80e93-e263-4b3b-90a3-eb7c33c59fc0	cd9e2f92-8912-4711-931b-1bb712920a8c	Ntoroko District	424	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
531469ab-8fda-4dc3-ae73-f7be83e499b6	cd9e2f92-8912-4711-931b-1bb712920a8c	Ntungamo District	411	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
53113d42-794b-46b0-818a-b9f8abaaa00d	cd9e2f92-8912-4711-931b-1bb712920a8c	Nwoya District	328	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8af12d94-6ab8-450f-9585-7d443f426631	cd9e2f92-8912-4711-931b-1bb712920a8c	Omoro District	331	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
99fe5012-416a-43ae-b737-2d4383859e63	cd9e2f92-8912-4711-931b-1bb712920a8c	Otuke District	329	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
449ff65e-c2ca-416e-94ad-e99aa85e1b32	cd9e2f92-8912-4711-931b-1bb712920a8c	Oyam District	321	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
446e27be-1760-410a-a496-12beb69b4e92	cd9e2f92-8912-4711-931b-1bb712920a8c	Pader District	312	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4a39f942-5a4b-4fc8-81c4-375efa5cdfd8	cd9e2f92-8912-4711-931b-1bb712920a8c	Pakwach District	332	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0c32c271-c538-4fd4-a72e-ecb2ece30583	cd9e2f92-8912-4711-931b-1bb712920a8c	Pallisa District	210	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
967e56a9-e444-4850-b166-7c4743c19c2f	cd9e2f92-8912-4711-931b-1bb712920a8c	Rakai District	110	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5e8270ca-254d-46fd-bfc9-72811a678ae6	cd9e2f92-8912-4711-931b-1bb712920a8c	Rubanda District	429	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c738c0a0-c8a0-4bcc-8aa4-ff9e1b306f1a	cd9e2f92-8912-4711-931b-1bb712920a8c	Rubirizi District	425	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7ef97e6e-071d-47a5-ae22-137b3ea98979	cd9e2f92-8912-4711-931b-1bb712920a8c	Rukiga District	431	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6f455e64-0bba-49bf-a344-7b8293148e2b	cd9e2f92-8912-4711-931b-1bb712920a8c	Rukungiri District	412	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4cc17806-047d-4045-bc58-f9f862484667	cd9e2f92-8912-4711-931b-1bb712920a8c	Sembabule District	111	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a4e7d580-d897-4a93-ba94-0ccf0552366a	cd9e2f92-8912-4711-931b-1bb712920a8c	Serere District	232	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f36bb112-082a-4671-a0b0-d32796edcb44	cd9e2f92-8912-4711-931b-1bb712920a8c	Sheema District	426	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b0c1df0b-527c-401a-a89a-429b0e6dd54b	cd9e2f92-8912-4711-931b-1bb712920a8c	Sironko District	215	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a6f750ee-a288-43df-bfdf-677cfce0e764	cd9e2f92-8912-4711-931b-1bb712920a8c	Soroti District	211	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0bd96f40-e3f6-4e1a-afe1-35095b17e728	cd9e2f92-8912-4711-931b-1bb712920a8c	Tororo District	212	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6c3cc664-90e4-48ab-9ba2-cd2665698f6c	cd9e2f92-8912-4711-931b-1bb712920a8c	Wakiso District	113	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a963ddd8-e684-41f8-8a0f-8c4bbedbe2bf	cd9e2f92-8912-4711-931b-1bb712920a8c	Western Region	W	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2e08a122-0392-4cbf-95f6-6e350eead4a1	cd9e2f92-8912-4711-931b-1bb712920a8c	Yumbe District	313	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a7fbf2dd-892d-45f9-8395-66dd2000d2a0	cd9e2f92-8912-4711-931b-1bb712920a8c	Zombo District	330	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
161c1e51-7b9a-4722-b23c-e542f765660f	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Autonomous Republic of Crimea	43	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dd422765-8c1a-437c-bb8b-fa2aff028345	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Cherkaska oblast	71	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8f99917a-c8f2-461f-a78b-4a0bb3efbb6b	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Chernihivska oblast	74	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0cec76b7-bac7-428e-8f24-0c354385c03f	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Chernivetska oblast	77	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
deefc303-19de-423d-81d1-7661ac77430c	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Dnipropetrovska oblast	12	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b43f36ab-ce65-4ecb-9719-1680de19c1bd	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Donetska oblast	14	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
43a19b5d-65c1-4539-aeed-92a4224451aa	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Ivano-Frankivska oblast	26	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2c394b65-7ad0-4674-9750-de87e0f6b87c	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Kharkivska oblast	63	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4e654d49-db10-4cd8-968d-3f7dc8bc941c	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Khersonska oblast	65	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4f2dcc91-937b-438c-89c6-41c542d8fcd9	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Khmelnytska oblast	68	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2aa0d025-4d98-4e61-be34-42f7c63e1857	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Kirovohradska oblast	35	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bba4a777-135b-43f0-b646-f3229820ca69	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Kyiv	30	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
23254d5e-5d97-494d-bf51-86c923b2d95a	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Kyivska oblast	32	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fd1b1ac1-0686-460e-8641-cac82debb673	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Luhanska oblast	09	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ab5f0f85-8e40-4689-8773-3256e6e9a830	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Lvivska oblast	46	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cdff365e-3e92-4075-a47f-52dce3f1100a	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Mykolaivska oblast	48	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
823ea560-be45-406e-ba17-44c2f9dfd4db	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Odeska oblast	51	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
00df1733-ac87-4a41-8feb-b21bcbd0e615	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Poltavska oblast	53	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
128d3413-22e9-439b-a150-4c0eb945531f	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Rivnenska oblast	56	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3283a27f-4702-42ba-b10e-5b809f3cf9d5	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Sumska oblast	59	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4f2f04f5-ada5-430d-be6f-7aa3119e377e	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Ternopilska oblast	61	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
22d9542f-2e2d-433f-b213-c783d66287ba	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Vinnytska oblast	05	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1b0013e6-6a83-495c-9e65-54456c9670e4	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Volynska oblast	07	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
13bfb75b-6dd1-481c-b4d2-1c17f1401eeb	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Zakarpatska Oblast	21	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
324c8168-6a32-4836-8b55-f15a970b4983	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Zaporizka oblast	23	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7aab5d42-5a24-4a5c-9573-02556401df01	7f3e136d-0b01-405b-9d8a-0d69bdafb749	Zhytomyrska oblast	18	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c219efd4-4635-454b-ae2d-fd543e9df76f	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Abu Dhabi Emirate	AZ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
00f747ef-5c64-4c6d-89b0-8bce86a30ff9	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Ajman Emirate	AJ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f929b308-ca89-4b22-88c2-1aa203407b83	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Dubai	DU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
83cd862d-f41f-465c-9644-84ec7a1bb1f4	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Fujairah	FU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1967f7b5-fec2-45fb-856c-dac2f8dc7d8b	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Ras al-Khaimah	RK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
09551c48-3819-4e15-9218-9c6eb623bce6	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Sharjah Emirate	SH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2a66d925-72ba-4989-a0b2-b73a6b230ee9	76fce7c5-2e47-440d-96c1-a5b5e9fcffa1	Umm al-Quwain	UQ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
717ae789-38ca-446c-bd6d-16fd260d1a8f	0b14b530-6931-4a96-9bd7-3be9eaefb427	Aberdeen	ABE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ae75de29-a4a2-4fa3-9e2a-163a79957067	0b14b530-6931-4a96-9bd7-3be9eaefb427	Aberdeenshire	ABD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
172d9685-af36-4335-b847-66749835d1ee	0b14b530-6931-4a96-9bd7-3be9eaefb427	Angus	ANS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e5493c8c-33bc-4371-8bc4-e4e485f90117	0b14b530-6931-4a96-9bd7-3be9eaefb427	Antrim	ANT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bc6f4461-64dd-4a59-9cd0-9dce66f521ef	0b14b530-6931-4a96-9bd7-3be9eaefb427	Antrim and Newtownabbey	ANN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
427a523a-0523-49c3-8a31-84c7a3bee569	0b14b530-6931-4a96-9bd7-3be9eaefb427	Ards	ARD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7feab4c3-7fd8-4da9-92f1-56c42382d8b3	0b14b530-6931-4a96-9bd7-3be9eaefb427	Ards and North Down	AND	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d9982757-c804-4f4e-898a-a1bd4d59b8ad	0b14b530-6931-4a96-9bd7-3be9eaefb427	Argyll and Bute	AGB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
505453c5-2489-491f-ac6f-a369179a2922	0b14b530-6931-4a96-9bd7-3be9eaefb427	Armagh City and District Council	ARM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
31bdb973-a6a1-449d-98d7-654d5c4d3c1b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Armagh, Banbridge and Craigavon	ABC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1f147356-33c9-464c-a6c7-e20392ec1ade	0b14b530-6931-4a96-9bd7-3be9eaefb427	Ascension Island	SH-AC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d8a3202a-3e24-44cc-96b9-e1de049cbcc5	0b14b530-6931-4a96-9bd7-3be9eaefb427	Ballymena Borough	BLA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
04c16969-d186-4454-a009-19b6bd8d3673	0b14b530-6931-4a96-9bd7-3be9eaefb427	Ballymoney	BLY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1cb47cfc-a543-4951-a3ba-aed87cb4406b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Banbridge	BNB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
78c8c4c5-1ebe-4c57-bb9a-932037c4e347	0b14b530-6931-4a96-9bd7-3be9eaefb427	Barnsley	BNS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4e5e37a0-b853-423e-b565-93f56a02b921	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bath and North East Somerset	BAS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5a23ec65-0128-4cb9-9419-d6a6de5d37c2	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bedford	BDF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0c19e473-0909-4283-83de-61a16ff29c79	0b14b530-6931-4a96-9bd7-3be9eaefb427	Belfast district	BFS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c79f9e10-8626-435e-a1ca-a1868242d568	0b14b530-6931-4a96-9bd7-3be9eaefb427	Birmingham	BIR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
12b978f3-0599-45a2-8a4c-3c5e02df3b2d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Blackburn with Darwen	BBD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dea11ad9-68c9-44e8-b334-45396323ae68	0b14b530-6931-4a96-9bd7-3be9eaefb427	Blackpool	BPL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f459f326-14c3-40f4-b004-3da685745a94	0b14b530-6931-4a96-9bd7-3be9eaefb427	Blaenau Gwent County Borough	BGW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6eb5cb3f-5295-4759-abda-be46469e358f	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bolton	BOL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3bc5069a-b5b9-45a3-84f1-c438f804ed3b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bournemouth	BMH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
be25646e-5d2f-4a62-b883-eaf09dc891e5	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bracknell Forest	BRC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c9b5679-d8fd-4085-af55-d1274c3a581b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bradford	BRD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
50e00cec-b22c-4485-b774-61262328d56a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bridgend County Borough	BGE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ecb250f0-93fd-40e6-bf85-3c419571c9cb	0b14b530-6931-4a96-9bd7-3be9eaefb427	Brighton and Hove	BNH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fd893e8c-6e07-4811-9ecd-8206ee2d2a86	0b14b530-6931-4a96-9bd7-3be9eaefb427	Buckinghamshire	BKM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6831739f-37ae-4bec-bcfb-1de19b09bf0d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Bury	BUR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ff9a0c0f-2e36-4372-92ef-9892e88c08b5	0b14b530-6931-4a96-9bd7-3be9eaefb427	Caerphilly County Borough	CAY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7033a8f3-3450-4cc5-a113-abe7331f7202	0b14b530-6931-4a96-9bd7-3be9eaefb427	Calderdale	CLD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9690ecf4-6bfa-4b16-bbbd-d936b678d343	0b14b530-6931-4a96-9bd7-3be9eaefb427	Cambridgeshire	CAM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
511869db-f174-4cdc-9962-8c92c8a06e76	0b14b530-6931-4a96-9bd7-3be9eaefb427	Carmarthenshire	CMN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f09e342c-c623-411c-8ae6-7b7ddd29452d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Carrickfergus Borough Council	CKF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7d9f7235-8a99-4bcc-9549-78900281f168	0b14b530-6931-4a96-9bd7-3be9eaefb427	Castlereagh	CSR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
83bb66e1-ff4e-4057-b41e-45ff38923c6b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Causeway Coast and Glens	CCG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
42da922c-ec85-4d8d-bf91-14f93e372b4d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Central Bedfordshire	CBF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0838a1d6-683e-4942-9a82-b4a74427cfc6	0b14b530-6931-4a96-9bd7-3be9eaefb427	Ceredigion	CGN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4240a713-2258-4945-a129-00349afd1f8e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Cheshire East	CHE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3e05ea0f-0ab4-435a-8212-c095ec056a66	0b14b530-6931-4a96-9bd7-3be9eaefb427	Cheshire West and Chester	CHW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
636c95ce-89a4-48fd-b94c-e81327bd8e04	0b14b530-6931-4a96-9bd7-3be9eaefb427	City and County of Cardiff	CRF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a9168d40-2f3b-4494-9a39-66d641f52172	0b14b530-6931-4a96-9bd7-3be9eaefb427	City and County of Swansea	SWA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2180ae42-c794-4baa-89f5-59988bce6990	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Bristol	BST	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
41348328-6efc-44a6-a85f-d1a96ba8a126	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Derby	DER	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
393f08ce-915b-4056-aaee-111a42dbd404	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Kingston upon Hull	KHL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
46d0e7b0-001d-4d5a-b767-06d1ff20957e	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Leicester	LCE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b5b46c33-3ae6-4c5f-b560-c889d448c22e	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of London	LND	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d54ca1bf-9c4c-40e6-af82-c6971f3f34ae	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Nottingham	NGM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2e37a9fb-b732-418a-b1dc-a6b5859a541e	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Peterborough	PTE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d5208dea-3916-468c-8cb0-e9b6e88ee032	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Plymouth	PLY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
69110b0c-6ca6-4533-b977-4eda48c6e0c6	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Portsmouth	POR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
70979f81-fe51-4ef0-9007-bd4c70073f35	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Southampton	STH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7780ede6-aedc-49d6-9b4b-4eabd958029e	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Stoke-on-Trent	STE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
024931f5-2187-483c-83d1-74dbe1a2dfb8	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Sunderland	SND	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cb578c7e-73c1-4dda-ad52-0bbd2e91a528	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Westminster	WSM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a2680ea7-61fe-4dfc-8303-6b0047b57fc0	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of Wolverhampton	WLV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
aa728fe1-0a8c-4ed5-bf32-f5f155040c56	0b14b530-6931-4a96-9bd7-3be9eaefb427	City of York	YOR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8723a734-071d-427e-a87c-c42a71fb87ed	0b14b530-6931-4a96-9bd7-3be9eaefb427	Clackmannanshire	CLK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dace1398-dbf0-48af-8d5b-cfa87d724e20	0b14b530-6931-4a96-9bd7-3be9eaefb427	Coleraine Borough Council	CLR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b76fd994-25c3-4d50-8c3f-909aa2c18a83	0b14b530-6931-4a96-9bd7-3be9eaefb427	Conwy County Borough	CWY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1b69e533-18a0-4f0c-b1a2-5d59ec835c76	0b14b530-6931-4a96-9bd7-3be9eaefb427	Cookstown District Council	CKT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0771d503-c5e6-427c-afeb-63f270f6d629	0b14b530-6931-4a96-9bd7-3be9eaefb427	Cornwall	CON	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c50604c8-8cc7-44de-b789-b1149604d110	0b14b530-6931-4a96-9bd7-3be9eaefb427	County Durham	DUR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
67cc1e10-34b8-4072-94d9-f036f32cafb0	0b14b530-6931-4a96-9bd7-3be9eaefb427	Coventry	COV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f5ade339-98bd-4c10-a4a8-5c2f4fe37efc	0b14b530-6931-4a96-9bd7-3be9eaefb427	Craigavon Borough Council	CGV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
861d1800-4942-4245-82c3-1f63b20e743e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Cumbria	CMA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
67b7db1f-206d-4aac-b588-a64212cec72e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Darlington	DAL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ba4032a1-6d9c-4ba8-aadb-84a48c2f75b1	0b14b530-6931-4a96-9bd7-3be9eaefb427	Denbighshire	DEN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
37520e12-778a-4a8a-8c80-74d86422a246	0b14b530-6931-4a96-9bd7-3be9eaefb427	Derbyshire	DBY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9a38f776-d857-4e0f-84a4-9f0abd4e30dd	0b14b530-6931-4a96-9bd7-3be9eaefb427	Derry City Council	DRY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5c1310c6-e864-4eed-bcfc-345d68ef7d65	0b14b530-6931-4a96-9bd7-3be9eaefb427	Derry City and Strabane	DRS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4153ef8e-dd28-4671-ba86-c15ef3b27dfa	0b14b530-6931-4a96-9bd7-3be9eaefb427	Devon	DEV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cd71cd18-b40a-4cbf-802e-cd9d7f58e448	0b14b530-6931-4a96-9bd7-3be9eaefb427	Doncaster	DNC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
53f875e0-456d-4eb9-9ae4-5b4e40db0005	0b14b530-6931-4a96-9bd7-3be9eaefb427	Dorset	DOR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3a51bf2e-e119-43e2-a0a0-dbe4ad2d1ee6	0b14b530-6931-4a96-9bd7-3be9eaefb427	Down District Council	DOW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
38024d44-865b-49ce-8cd3-ba80eb9e7668	0b14b530-6931-4a96-9bd7-3be9eaefb427	Dudley	DUD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
450e231f-eda7-48ef-923b-c49b48650d3d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Dumfries and Galloway	DGY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c598a8c1-9393-42fe-b5fd-9669dc4323c6	0b14b530-6931-4a96-9bd7-3be9eaefb427	Dundee	DND	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ef36ba0f-c83d-465c-b6f9-d80213c1bf35	0b14b530-6931-4a96-9bd7-3be9eaefb427	Dungannon and South Tyrone Borough Council	DGN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b28c58a4-4e16-4c9a-a259-19a157bc4ea1	0b14b530-6931-4a96-9bd7-3be9eaefb427	East Ayrshire	EAY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
eaf63247-f766-4117-a1e8-8c6a81374eaa	0b14b530-6931-4a96-9bd7-3be9eaefb427	East Dunbartonshire	EDU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d0ca3f95-9a0c-4def-ba05-e5402144c10f	0b14b530-6931-4a96-9bd7-3be9eaefb427	East Lothian	ELN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a070448d-22b4-48e7-b10d-c45149ef46e7	0b14b530-6931-4a96-9bd7-3be9eaefb427	East Renfrewshire	ERW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c811a9d6-7d81-4a11-a428-2ef5e836cf3f	0b14b530-6931-4a96-9bd7-3be9eaefb427	East Riding of Yorkshire	ERY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c6c36d0f-99f8-4396-9a60-b30a081c423a	0b14b530-6931-4a96-9bd7-3be9eaefb427	East Sussex	ESX	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b81b9d04-1c4d-4ec9-8bb6-4a95b3bf2985	0b14b530-6931-4a96-9bd7-3be9eaefb427	Edinburgh	EDH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
325fb2e4-1323-460b-a564-eb10e61a9a1e	0b14b530-6931-4a96-9bd7-3be9eaefb427	England	ENG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1b8d8c21-1f3f-49c3-8368-518ac3a2e748	0b14b530-6931-4a96-9bd7-3be9eaefb427	Essex	ESS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
81fb7991-1ca5-4cab-81ae-5f5a5812098c	0b14b530-6931-4a96-9bd7-3be9eaefb427	Falkirk	FAL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ea8c87e7-ee1e-42f9-bbb7-efd4ef89dfb7	0b14b530-6931-4a96-9bd7-3be9eaefb427	Fermanagh District Council	FER	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e47776d1-bf32-4c84-886c-4ce0d078df99	0b14b530-6931-4a96-9bd7-3be9eaefb427	Fermanagh and Omagh	FMO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d661d697-b09c-4ea3-bb8a-35d9a2bf7aa2	0b14b530-6931-4a96-9bd7-3be9eaefb427	Fife	FIF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
18c95f58-5a2b-4103-bbcf-af8bbffe45da	0b14b530-6931-4a96-9bd7-3be9eaefb427	Flintshire	FLN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8fddfb69-0d30-4992-8d4d-1c76de1de594	0b14b530-6931-4a96-9bd7-3be9eaefb427	Gateshead	GAT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dbb311b2-250b-449b-aaad-07175190f9c2	0b14b530-6931-4a96-9bd7-3be9eaefb427	Glasgow	GLG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
59eb7873-0cf6-41cb-a5e5-344f474e6e27	0b14b530-6931-4a96-9bd7-3be9eaefb427	Gloucestershire	GLS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
77d180e9-1b8a-4fed-b2c2-c87192f347b6	0b14b530-6931-4a96-9bd7-3be9eaefb427	Gwynedd	GWN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
89726fee-c378-4e01-821a-a39f1ddfce97	0b14b530-6931-4a96-9bd7-3be9eaefb427	Halton	HAL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3034518f-1f70-4839-b587-003f6e10f048	0b14b530-6931-4a96-9bd7-3be9eaefb427	Hampshire	HAM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c3564c07-8606-4544-8602-6df562c6603a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Hartlepool	HPL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1d7179ec-4939-468d-b612-228c10b876b1	0b14b530-6931-4a96-9bd7-3be9eaefb427	Herefordshire	HEF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2b4f1a70-da9a-4190-bee3-949dd9c39341	0b14b530-6931-4a96-9bd7-3be9eaefb427	Hertfordshire	HRT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9014e2ae-d5ed-4b39-bdf9-fe1d1b1edf6f	0b14b530-6931-4a96-9bd7-3be9eaefb427	Highland	HLD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
82f9a4e3-2a27-4460-9696-89724b10ea14	0b14b530-6931-4a96-9bd7-3be9eaefb427	Inverclyde	IVC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2269dee6-8cdb-4bc6-b575-629ead2a6830	0b14b530-6931-4a96-9bd7-3be9eaefb427	Isle of Wight	IOW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8070ef0a-cede-49dc-bfac-52f6014db251	0b14b530-6931-4a96-9bd7-3be9eaefb427	Isles of Scilly	IOS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
be45fe3e-8fed-4ddb-b306-23effbb5c623	0b14b530-6931-4a96-9bd7-3be9eaefb427	Kent	KEN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
52352540-2fbd-4db2-a6cd-a85023b0ba6b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Kirklees	KIR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d9dd90cc-db00-4331-ad0c-2842a39735e9	0b14b530-6931-4a96-9bd7-3be9eaefb427	Knowsley	KWL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6445b038-2de8-42b1-a904-a5920759a3b3	0b14b530-6931-4a96-9bd7-3be9eaefb427	Lancashire	LAN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3cdce0e6-b941-47df-b6df-8ddc548f52a4	0b14b530-6931-4a96-9bd7-3be9eaefb427	Larne Borough Council	LRN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6e2eda59-c781-4e7b-9445-da7b65a62158	0b14b530-6931-4a96-9bd7-3be9eaefb427	Leeds	LDS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3fceeb48-2082-4a5d-9208-7523665d4249	0b14b530-6931-4a96-9bd7-3be9eaefb427	Leicestershire	LEC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
028e5ed3-8a56-4ba7-ac4a-34e410a4abc5	0b14b530-6931-4a96-9bd7-3be9eaefb427	Limavady Borough Council	LMV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cfe2f19d-1f40-4150-b557-4026fc21433c	0b14b530-6931-4a96-9bd7-3be9eaefb427	Lincolnshire	LIN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
252f54c7-2131-4fc3-ba51-c0f4152b66d3	0b14b530-6931-4a96-9bd7-3be9eaefb427	Lisburn City Council	LSB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3012d5b2-e995-4e89-b6e1-cc13ec288980	0b14b530-6931-4a96-9bd7-3be9eaefb427	Lisburn and Castlereagh	LBC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b4dc710e-53ee-4ac3-93d7-a310442b645f	0b14b530-6931-4a96-9bd7-3be9eaefb427	Liverpool	LIV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7f95c9d2-4049-4a54-8c8d-840daa002812	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Barking and Dagenham	BDG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c6e916a7-b49a-477d-a992-29dff0273cb4	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Barnet	BNE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
039e97cb-b316-45cf-984f-7a63eeba9046	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Bexley	BEX	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c54ef551-1c66-428e-b1e6-90c3cf4224ec	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Brent	BEN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
600c5111-7e69-4ca0-bf19-0ed860ee1b9c	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Bromley	BRY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
310bc463-5ad0-42b8-bc88-d21116764782	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Camden	CMD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2f56fbf8-4c6e-4517-99a0-0539ac981b49	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Croydon	CRY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b23f5a47-0ea4-4d38-8a9b-582c0aec5f0f	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Ealing	EAL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3181f0c5-3120-45ce-aa7b-ab877cccd077	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Enfield	ENF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c7412cb0-05e0-4948-a6f1-eb6461315890	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Hackney	HCK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
feb3a3f3-9bda-4359-8c0a-1ddac9793047	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Hammersmith and Fulham	HMF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f58105bb-3c65-40d9-8136-bc7f4dc88f95	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Haringey	HRY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5a115c8b-7266-4b4d-958a-9c083de82d81	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Harrow	HRW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5c7648ab-5f60-4ae4-b34a-494fe2661dd2	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Havering	HAV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6f6c066a-0256-4c3a-b2f5-070f65463fda	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Hillingdon	HIL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8819d12f-1e64-46c0-9f8b-7e341427d415	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Hounslow	HNS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
92ad8f43-d4ff-4697-8a5a-476799b38393	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Islington	ISL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
325d014e-4859-495e-85f9-dd156b2a9d64	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Lambeth	LBH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f15b4233-acfc-4b12-8eea-ad877a5e8879	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Lewisham	LEW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5fbea83b-c488-4d71-84f1-79166411d516	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Merton	MRT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5b617b2c-9190-4bf9-91b6-8b9cd53d2ba1	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Newham	NWM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dfc69a50-7a42-4784-b060-a4657c660cdd	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Redbridge	RDB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
914892c7-5ca8-4e49-82cc-5e34fe019904	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Richmond upon Thames	RIC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e9b13e9c-5c93-4b0f-bd82-89cab04f2303	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Southwark	SWK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bfa96595-b96d-4583-a161-ad86a086d882	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Sutton	STN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a2e2baf9-48d8-4c31-aa33-e4324c07d41a	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Tower Hamlets	TWH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
38a9eb69-3555-4815-8059-abe38214b9e5	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Waltham Forest	WFT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bde9fc4c-40db-4b5a-ac16-90adc273c07f	0b14b530-6931-4a96-9bd7-3be9eaefb427	London Borough of Wandsworth	WND	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
eb5e7bc1-11c5-4b26-9aa8-f743ff2a27f5	0b14b530-6931-4a96-9bd7-3be9eaefb427	Magherafelt District Council	MFT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fa97f643-8379-4510-a0df-dddfcf2fad21	0b14b530-6931-4a96-9bd7-3be9eaefb427	Manchester	MAN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5875c630-80fe-4db1-ae74-e3d3fc308311	0b14b530-6931-4a96-9bd7-3be9eaefb427	Medway	MDW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e5ebff4a-47c9-472f-a211-a2ebc7886b0a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Merthyr Tydfil County Borough	MTY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0a5867d6-2792-4c77-967b-5788e43ee760	0b14b530-6931-4a96-9bd7-3be9eaefb427	Metropolitan Borough of Wigan	WGN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4df8423e-d49d-4b3f-b9db-b9be7fc6b8d3	0b14b530-6931-4a96-9bd7-3be9eaefb427	Mid Ulster	MUL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f31d2cc1-7b2f-4d36-9531-077e4dcccab1	0b14b530-6931-4a96-9bd7-3be9eaefb427	Mid and East Antrim	MEA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3cf26069-4038-46e1-852d-76a30e38abad	0b14b530-6931-4a96-9bd7-3be9eaefb427	Middlesbrough	MDB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
111c828c-4e46-41d3-bffb-a31dba50839d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Midlothian	MLN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4d7896d9-4267-447f-bd74-6c523effcd53	0b14b530-6931-4a96-9bd7-3be9eaefb427	Milton Keynes	MIK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b7603fcf-aa6e-4229-ac15-3e4de15acd85	0b14b530-6931-4a96-9bd7-3be9eaefb427	Monmouthshire	MON	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
615b2350-a298-4011-a28e-f9f7175ce2bb	0b14b530-6931-4a96-9bd7-3be9eaefb427	Moray	MRY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e6dffa65-bfb5-4945-bf8e-b0a208c98752	0b14b530-6931-4a96-9bd7-3be9eaefb427	Moyle District Council	MYL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ab8e7b83-6627-4aea-8829-872332524c6d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Neath Port Talbot County Borough	NTL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
29289be9-1c8b-4508-a241-73b34c498399	0b14b530-6931-4a96-9bd7-3be9eaefb427	Newcastle upon Tyne	NET	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
74a83a81-a58a-478e-a99a-4ef7c8416635	0b14b530-6931-4a96-9bd7-3be9eaefb427	Newport	NWP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
aa9be6bd-ee5a-466e-8f6f-cc24c10a5865	0b14b530-6931-4a96-9bd7-3be9eaefb427	Newry and Mourne District Council	NYM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8d266a0c-b3a6-42eb-aa86-8c440396503e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Newry, Mourne and Down	NMD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
37d2fd61-902f-43fe-b17b-fa0264c5e872	0b14b530-6931-4a96-9bd7-3be9eaefb427	Newtownabbey Borough Council	NTA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5c4d1e66-c048-4570-aac6-575878ed7668	0b14b530-6931-4a96-9bd7-3be9eaefb427	Norfolk	NFK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ee9406c4-c0d1-4b45-9c71-3e9901a164d3	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Ayrshire	NAY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
86942216-2bb9-4586-a152-d8f555df8c83	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Down Borough Council	NDN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
71d60c37-b0c7-44d6-b818-9ba7c54bfe4a	0b14b530-6931-4a96-9bd7-3be9eaefb427	North East Lincolnshire	NEL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a50ba335-e339-4a76-a7f8-95cf894ecdbd	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Lanarkshire	NLK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3ccfcae5-1608-4631-9cee-ed3b41679c57	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Lincolnshire	NLN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
285a81f3-3a26-4fc3-a203-81bca25be99d	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Somerset	NSM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dec0837b-28c8-4a40-bd42-d2a28158841e	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Tyneside	NTY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c3e5577e-acc5-426f-9b69-b3b29eb03a13	0b14b530-6931-4a96-9bd7-3be9eaefb427	North Yorkshire	NYK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d1aed67c-33f8-411c-94d5-0fa082a14f65	0b14b530-6931-4a96-9bd7-3be9eaefb427	Northamptonshire	NTH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4f2249da-279a-4a0a-b701-508859a74999	0b14b530-6931-4a96-9bd7-3be9eaefb427	Northern Ireland	NIR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0eaca3a9-af11-439b-aa15-de7f09a6337d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Northumberland	NBL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c61b376d-81ce-4558-a9e2-11d06bc1cf09	0b14b530-6931-4a96-9bd7-3be9eaefb427	Nottinghamshire	NTT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
744f7527-049d-4dc7-ad18-d8d0251b2475	0b14b530-6931-4a96-9bd7-3be9eaefb427	Oldham	OLD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bd3be3ec-ae73-479f-803c-8febefcb9ac3	0b14b530-6931-4a96-9bd7-3be9eaefb427	Omagh District Council	OMH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f63c22be-1470-4815-aab2-a3ec460010f4	0b14b530-6931-4a96-9bd7-3be9eaefb427	Orkney Islands	ORK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
303125a5-f3e4-4816-92f7-bfefaa310805	0b14b530-6931-4a96-9bd7-3be9eaefb427	Outer Hebrides	ELS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
de3b6412-f037-42a1-858c-728f9c0da455	0b14b530-6931-4a96-9bd7-3be9eaefb427	Oxfordshire	OXF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f0e2ebe3-6a13-4bc2-9c6e-4e3575033cf4	0b14b530-6931-4a96-9bd7-3be9eaefb427	Pembrokeshire	PEM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c02b1ff1-8b2d-4562-a092-2be3a395ad1f	0b14b530-6931-4a96-9bd7-3be9eaefb427	Perth and Kinross	PKN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
34852221-77de-4ed4-aa2c-7a3c18940471	0b14b530-6931-4a96-9bd7-3be9eaefb427	Poole	POL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5c90b12c-9de4-44e1-8c99-5df0210ba0f2	0b14b530-6931-4a96-9bd7-3be9eaefb427	Powys	POW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7f0be573-356d-4856-856c-986acbb62901	0b14b530-6931-4a96-9bd7-3be9eaefb427	Reading	RDG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
537081ab-f229-4c10-976d-2b5f2ac9de17	0b14b530-6931-4a96-9bd7-3be9eaefb427	Redcar and Cleveland	RCC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8e0cb839-ded1-412b-8213-32c95d48a626	0b14b530-6931-4a96-9bd7-3be9eaefb427	Renfrewshire	RFW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c84dae30-8848-47ea-9d24-45b5110fab76	0b14b530-6931-4a96-9bd7-3be9eaefb427	Rhondda Cynon Taf	RCT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e29c00a7-a487-43a3-a15c-9826595ad106	0b14b530-6931-4a96-9bd7-3be9eaefb427	Rochdale	RCH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
037ebad1-9911-48c0-aeab-328b7136081e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Rotherham	ROT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b1a9ec6d-d6a7-4574-9ed9-a3cefd3d90d0	0b14b530-6931-4a96-9bd7-3be9eaefb427	Royal Borough of Greenwich	GRE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d34415bb-6ed4-4f92-8be1-ae1c11d35312	0b14b530-6931-4a96-9bd7-3be9eaefb427	Royal Borough of Kensington and Chelsea	KEC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
de96b00a-95d0-4fd5-b034-a887d18f294c	0b14b530-6931-4a96-9bd7-3be9eaefb427	Royal Borough of Kingston upon Thames	KTT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
23020a92-1f93-4611-8219-e28585418dd7	0b14b530-6931-4a96-9bd7-3be9eaefb427	Rutland	RUT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
cfcf6525-c46b-4c7b-ac65-1f02e6a23f1e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Saint Helena	SH-HL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3559c344-546c-4485-86b3-43b7a9027d6a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Salford	SLF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
737d7e68-7bca-483a-bf10-6507b8b2f6bb	0b14b530-6931-4a96-9bd7-3be9eaefb427	Sandwell	SAW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
99411e16-cb30-4993-abd0-9524022d707e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Scotland	SCT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c52ced5f-1ee2-40aa-bddf-536306666347	0b14b530-6931-4a96-9bd7-3be9eaefb427	Scottish Borders	SCB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3779fc86-e46f-4f89-86e5-d4e33c243896	0b14b530-6931-4a96-9bd7-3be9eaefb427	Sefton	SFT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9d7affbd-7379-4b4c-8fd2-f401d7c8e033	0b14b530-6931-4a96-9bd7-3be9eaefb427	Sheffield	SHF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
81c9da9f-ca97-4c4c-a76b-871bc062ab87	0b14b530-6931-4a96-9bd7-3be9eaefb427	Shetland Islands	ZET	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7469ca45-5609-402a-a8d0-fdc1f2a44078	0b14b530-6931-4a96-9bd7-3be9eaefb427	Shropshire	SHR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0ba7d038-d6c1-4a7f-954a-470dfb38df7b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Slough	SLG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9ba523e8-b8a5-4de1-a97a-1bba51b81f8a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Solihull	SOL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d095b040-30aa-41ab-b5d9-7a26da950aec	0b14b530-6931-4a96-9bd7-3be9eaefb427	Somerset	SOM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
733c4d01-093d-48b7-935b-e6034dc641df	0b14b530-6931-4a96-9bd7-3be9eaefb427	South Ayrshire	SAY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bf78e5b6-3cfc-4f32-934f-ca4af435305e	0b14b530-6931-4a96-9bd7-3be9eaefb427	South Gloucestershire	SGC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4cd91f65-fbd0-4025-ada5-b1058e5f7c65	0b14b530-6931-4a96-9bd7-3be9eaefb427	South Lanarkshire	SLK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
eac50f87-2e29-4c30-90be-492a02bb2d3e	0b14b530-6931-4a96-9bd7-3be9eaefb427	South Tyneside	STY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9c32c643-a01d-46f5-92f0-d43f22959038	0b14b530-6931-4a96-9bd7-3be9eaefb427	Southend-on-Sea	SOS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
30b694f6-b8bd-434b-ba3b-bce44f53ba6f	0b14b530-6931-4a96-9bd7-3be9eaefb427	St Helens	SHN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
14f988ef-f010-4232-8a29-23692adee766	0b14b530-6931-4a96-9bd7-3be9eaefb427	Staffordshire	STS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6ac1e1da-9ab2-462f-b298-6249355b1c38	0b14b530-6931-4a96-9bd7-3be9eaefb427	Stirling	STG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3c2694ee-e4a7-4298-a154-626353eacc5a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Stockport	SKP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
950fe3aa-a1ce-4a30-9d09-7efa93a459ef	0b14b530-6931-4a96-9bd7-3be9eaefb427	Stockton-on-Tees	STT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
de1a6725-8e30-449c-8958-b27314240169	0b14b530-6931-4a96-9bd7-3be9eaefb427	Strabane District Council	STB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ecd81996-dba4-4766-84b0-f9f292a071ee	0b14b530-6931-4a96-9bd7-3be9eaefb427	Suffolk	SFK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5b996d44-0c05-4a25-80f5-78f3d6eb3a3a	0b14b530-6931-4a96-9bd7-3be9eaefb427	Surrey	SRY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d1c65a9e-ed15-4ef8-b49a-37ce869dc330	0b14b530-6931-4a96-9bd7-3be9eaefb427	Swindon	SWD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e0f068ad-4eb6-4f62-bc19-7b731a6d6427	0b14b530-6931-4a96-9bd7-3be9eaefb427	Tameside	TAM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
35583c5d-1286-43ba-ab6e-415a5ee32161	0b14b530-6931-4a96-9bd7-3be9eaefb427	Telford and Wrekin	TFW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f739824d-080d-46d6-97b3-3b8245c528fc	0b14b530-6931-4a96-9bd7-3be9eaefb427	Thurrock	THR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3c710870-6e5b-473f-894e-8ccccdd072a3	0b14b530-6931-4a96-9bd7-3be9eaefb427	Torbay	TOB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6ab771cb-fb8a-4566-9cef-65cd0c46b910	0b14b530-6931-4a96-9bd7-3be9eaefb427	Torfaen	TOF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1aba528f-16be-4f67-bf7e-21dae3f96c52	0b14b530-6931-4a96-9bd7-3be9eaefb427	Trafford	TRF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
42bc4ba3-f394-4650-8343-c1a2889cfdee	0b14b530-6931-4a96-9bd7-3be9eaefb427	United Kingdom	UKM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2ad052a7-9d2b-4c4e-bcc5-728b6c598a31	0b14b530-6931-4a96-9bd7-3be9eaefb427	Vale of Glamorgan	VGL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c0b68f36-9ae6-4ff5-89f9-369c88d92d5c	0b14b530-6931-4a96-9bd7-3be9eaefb427	Wakefield	WKF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0d297297-7a06-4a67-8fdc-32a71d0fde60	0b14b530-6931-4a96-9bd7-3be9eaefb427	Wales	WLS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b30c6975-c77a-4fe3-863b-f57db9df21bd	0b14b530-6931-4a96-9bd7-3be9eaefb427	Walsall	WLL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c688dcd1-eb67-4697-afe4-8e370a1a4a79	0b14b530-6931-4a96-9bd7-3be9eaefb427	Warrington	WRT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9fad2cfe-50ab-4f73-ad7e-a63a64b25a26	0b14b530-6931-4a96-9bd7-3be9eaefb427	Warwickshire	WAR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a78efa5f-9a60-49fd-8b73-4e13cfe10e7c	0b14b530-6931-4a96-9bd7-3be9eaefb427	West Berkshire	WBK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3341084a-0df0-4739-bc88-46ad7c076c96	0b14b530-6931-4a96-9bd7-3be9eaefb427	West Dunbartonshire	WDU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7a128316-0e2c-4137-8bfe-9ea836e41836	0b14b530-6931-4a96-9bd7-3be9eaefb427	West Lothian	WLN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d28486d2-9762-4d7c-bb59-3feb1490195d	0b14b530-6931-4a96-9bd7-3be9eaefb427	West Sussex	WSX	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1bd10849-aadb-454c-9938-98d58e7487fc	0b14b530-6931-4a96-9bd7-3be9eaefb427	Wiltshire	WIL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ac62dc9d-4953-4614-a8e6-ecdc161afe04	0b14b530-6931-4a96-9bd7-3be9eaefb427	Windsor and Maidenhead	WNM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7fd1f3f9-8252-4b28-9cca-6f8b3b8ecf5e	0b14b530-6931-4a96-9bd7-3be9eaefb427	Wirral	WRL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7ecbb12b-631b-4908-b456-fc120693d40d	0b14b530-6931-4a96-9bd7-3be9eaefb427	Wokingham	WOK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3321bc80-ff1f-4bec-b0dc-dba01b92e00c	0b14b530-6931-4a96-9bd7-3be9eaefb427	Worcestershire	WOR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
172aa48b-1fa4-4263-acf7-f3687959394b	0b14b530-6931-4a96-9bd7-3be9eaefb427	Wrexham County Borough	WRX	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4a793d39-40d1-4d52-9e5c-431ebcc3c2e3	be39de9f-351d-403c-9978-092cfa18e734	Alabama	AL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9d1e509b-f3e0-4afd-9576-e8b48e12e3bc	be39de9f-351d-403c-9978-092cfa18e734	Alaska	AK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9be92bc3-5dfd-458d-86f8-1cc0ba679738	be39de9f-351d-403c-9978-092cfa18e734	American Samoa	AS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b2430f3f-1c4f-4c4f-87c6-9377b25acfe6	be39de9f-351d-403c-9978-092cfa18e734	Arizona	AZ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a0dab05e-4706-4209-994e-7d812bd069c6	be39de9f-351d-403c-9978-092cfa18e734	Arkansas	AR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
373b631c-3abc-4c6f-bf84-73bce89a8cf4	be39de9f-351d-403c-9978-092cfa18e734	Baker Island	UM-81	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ca1e18b0-3d66-4ff4-a5b7-dd7a6c48dc49	be39de9f-351d-403c-9978-092cfa18e734	California	CA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c617156d-63e0-4cc9-af04-555211d2190c	be39de9f-351d-403c-9978-092cfa18e734	Colorado	CO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f4df4502-bfd7-4efe-be4e-7569b2d228d8	be39de9f-351d-403c-9978-092cfa18e734	Connecticut	CT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fa990ed2-477d-4fca-95e4-9bc1f273018e	be39de9f-351d-403c-9978-092cfa18e734	Delaware	DE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
481e7082-6c2c-451f-b785-bcbe0dbe8c0c	be39de9f-351d-403c-9978-092cfa18e734	District of Columbia	DC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
372a1595-2926-4bf1-bab2-e0584b977f2f	be39de9f-351d-403c-9978-092cfa18e734	Florida	FL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
884ef571-ec9b-4f61-aab2-706998a57e29	be39de9f-351d-403c-9978-092cfa18e734	Georgia	GA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4dfdbdac-ba60-49c4-85f4-52fbb91422a7	be39de9f-351d-403c-9978-092cfa18e734	Guam	GU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
82efc310-6638-4fd9-9891-23b2d323bba5	be39de9f-351d-403c-9978-092cfa18e734	Hawaii	HI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
067e37d2-9f14-4204-b97f-786b6f75a426	be39de9f-351d-403c-9978-092cfa18e734	Howland Island	UM-84	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
466c5777-f668-48a7-84cf-fce15b659ccf	be39de9f-351d-403c-9978-092cfa18e734	Idaho	ID	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
596a3987-3245-4b0a-acb2-e6e5ea70272a	be39de9f-351d-403c-9978-092cfa18e734	Illinois	IL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
30da31fd-1064-42e1-b76e-fe1bbfa4b6e2	be39de9f-351d-403c-9978-092cfa18e734	Indiana	IN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4c6eeb53-fa6e-4395-a28b-d6261d3b2da4	be39de9f-351d-403c-9978-092cfa18e734	Iowa	IA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6d479487-4c67-45a0-828c-b350c498c8f5	be39de9f-351d-403c-9978-092cfa18e734	Jarvis Island	UM-86	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5171b975-e7ba-47a1-80fa-8fd318b7a0f8	be39de9f-351d-403c-9978-092cfa18e734	Johnston Atoll	UM-67	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
293b33d5-1e48-417c-ae4e-af88f3ebfa35	be39de9f-351d-403c-9978-092cfa18e734	Kansas	KS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b13540b5-b343-4f90-911f-e74e4f8252a3	be39de9f-351d-403c-9978-092cfa18e734	Kentucky	KY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4a47828b-9318-4726-bccd-68b60e073896	be39de9f-351d-403c-9978-092cfa18e734	Kingman Reef	UM-89	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
08375fb4-2e50-436b-bf2b-1ccc32eb88e0	be39de9f-351d-403c-9978-092cfa18e734	Louisiana	LA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a0c3820e-21b5-4a81-8aba-e290bf23108e	be39de9f-351d-403c-9978-092cfa18e734	Maine	ME	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7ff74b80-7580-4f13-8621-d187706776c0	be39de9f-351d-403c-9978-092cfa18e734	Maryland	MD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ec360de2-28b8-413b-8d4e-718d5f27a6a4	be39de9f-351d-403c-9978-092cfa18e734	Massachusetts	MA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
46b75411-76c3-4fe8-bdb6-afea85dcc93c	be39de9f-351d-403c-9978-092cfa18e734	Michigan	MI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
855c5e83-8ef0-48dc-b0ab-d66ba89e69a4	be39de9f-351d-403c-9978-092cfa18e734	Midway Atoll	UM-71	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
706f8e6e-0336-4db8-babc-9bbcb945628b	be39de9f-351d-403c-9978-092cfa18e734	Minnesota	MN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a4e2c498-f084-4bce-8e62-7f56de039ea8	be39de9f-351d-403c-9978-092cfa18e734	Mississippi	MS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e45dcdfd-4ae7-4e78-97df-8276e810c58e	be39de9f-351d-403c-9978-092cfa18e734	Missouri	MO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
145d5678-0fe4-4f37-bae4-46a229f9ed38	be39de9f-351d-403c-9978-092cfa18e734	Montana	MT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a6862341-86c2-461a-8341-ef2932b21476	be39de9f-351d-403c-9978-092cfa18e734	Navassa Island	UM-76	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d98a9ab3-8ff9-43ca-9358-2b2c74ff2b59	be39de9f-351d-403c-9978-092cfa18e734	Nebraska	NE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4cb2702f-84c1-4888-a003-266f901c527a	be39de9f-351d-403c-9978-092cfa18e734	Nevada	NV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
521bb416-7c95-4f5d-a9c6-28952e5c35f5	be39de9f-351d-403c-9978-092cfa18e734	New Hampshire	NH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
650432dd-6fea-491c-8eb3-9cebbf689797	be39de9f-351d-403c-9978-092cfa18e734	New Jersey	NJ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
954b8324-2ac7-4fd4-a48c-24e90873de89	be39de9f-351d-403c-9978-092cfa18e734	New Mexico	NM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fc1cafda-43a7-44db-b4b7-edb51217d686	be39de9f-351d-403c-9978-092cfa18e734	New York	NY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8a0d02bc-0420-4ef4-ba76-b6ccbde77735	be39de9f-351d-403c-9978-092cfa18e734	North Carolina	NC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
91b5ee9a-5e92-41d0-8bf1-ae3333583ee6	be39de9f-351d-403c-9978-092cfa18e734	North Dakota	ND	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9a7c7dd0-0532-4392-abf5-d1730f3f7a15	be39de9f-351d-403c-9978-092cfa18e734	Northern Mariana Islands	MP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7ccf2200-c8c4-4fc7-ae12-148c4c2323f0	be39de9f-351d-403c-9978-092cfa18e734	Ohio	OH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e0af2b64-2717-4cb3-b874-24dcd3a5d23c	be39de9f-351d-403c-9978-092cfa18e734	Oklahoma	OK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f2a60a8a-99c1-4af2-8b1f-37ba43ecee0a	be39de9f-351d-403c-9978-092cfa18e734	Oregon	OR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6586ca77-89c8-4690-b58b-39ba36275067	be39de9f-351d-403c-9978-092cfa18e734	Palmyra Atoll	UM-95	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c654c48e-ac4e-4860-9940-5681255aa57c	be39de9f-351d-403c-9978-092cfa18e734	Pennsylvania	PA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
441c8bc0-0a80-4255-bb85-9c6e5b7a0a58	be39de9f-351d-403c-9978-092cfa18e734	Puerto Rico	PR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9953d584-a56b-4e5a-aaa3-0ade5f519505	be39de9f-351d-403c-9978-092cfa18e734	Rhode Island	RI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
10a527a4-6dba-4f72-95cc-318b2d82ad45	be39de9f-351d-403c-9978-092cfa18e734	South Carolina	SC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d4142290-8d3b-46ba-89cb-e145bfbcb96f	be39de9f-351d-403c-9978-092cfa18e734	South Dakota	SD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
14c6a972-43ad-459a-9c88-0f5092c88ca6	be39de9f-351d-403c-9978-092cfa18e734	Tennessee	TN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4a954718-4b54-4f7c-a2f2-e8e42ee8a21f	be39de9f-351d-403c-9978-092cfa18e734	Texas	TX	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ce65713b-1c48-4240-9aa1-fe957d2163d3	be39de9f-351d-403c-9978-092cfa18e734	United States Minor Outlying Islands	UM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
438090e1-2f9e-443c-89cd-c554ae3e2ba8	be39de9f-351d-403c-9978-092cfa18e734	United States Virgin Islands	VI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
aebc959f-e727-4a74-bd78-918db803c028	be39de9f-351d-403c-9978-092cfa18e734	Utah	UT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
290e77dc-3d58-44cf-b8d6-6204dd25beb5	be39de9f-351d-403c-9978-092cfa18e734	Vermont	VT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c49e0e7-863d-4b29-b34c-2a2fe859e07c	be39de9f-351d-403c-9978-092cfa18e734	Virginia	VA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3a99ee07-6053-4246-a941-43bac4130c40	be39de9f-351d-403c-9978-092cfa18e734	Wake Island	UM-79	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c28fafbf-01f1-4501-bf2a-3ec8a0c9122e	be39de9f-351d-403c-9978-092cfa18e734	Washington	WA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2b8ff887-8c12-4214-bdf0-3adbc909d034	be39de9f-351d-403c-9978-092cfa18e734	West Virginia	WV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6469cba2-11db-48c0-9918-ff8ec047d986	be39de9f-351d-403c-9978-092cfa18e734	Wisconsin	WI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a51fe3f1-d552-4bdd-89dc-ba28c3eba07a	be39de9f-351d-403c-9978-092cfa18e734	Wyoming	WY	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0b7db155-4a73-4d9c-84a9-cb1c5039b808	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Artigas Department	AR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
997813ca-9a65-45d7-aa6c-c7dd02588220	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Canelones Department	CA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
824d992c-31d5-4ceb-b26c-e6ba07fcddbd	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Cerro Largo Department	CL	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
14f36612-fc28-4275-b695-ceca1793d3fc	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Colonia Department	CO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
81af956d-3355-4054-902f-802c9a127165	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Durazno Department	DU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
edd97888-c21e-43f2-803d-70358cda336b	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Flores Department	FS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b0249525-797a-453d-9551-80999935b417	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Florida Department	FD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
599ec0db-a009-4135-9027-a718a0b32b1b	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Lavalleja Department	LA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0680b4e2-5858-4cab-8184-45fbb03ae402	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Maldonado Department	MA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
30cfeb18-0c3f-4167-a0d1-d3cd454626ee	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Montevideo Department	MO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f27d5f78-e94c-4057-b412-e6707b0463ea	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Paysandú Department	PA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b5218a20-a7cb-43ab-b142-c805248a6965	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Rivera Department	RV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
774282ed-571c-47c4-8702-ad6753632536	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Rocha Department	RO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ed5d1deb-9905-4176-ab1c-2a5941896d32	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Río Negro Department	RN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e9a77003-48f0-45e6-a39f-1d0871f12692	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Salto Department	SA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
524ca24b-0ef3-41e9-9527-ed1c9b1645e7	9077c214-59a9-49a4-b5a4-bed9c6e4c965	San José Department	SJ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7563b968-58e7-418e-a019-be7fe3e1f4cc	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Soriano Department	SO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1e19a535-f92b-443a-a83e-9d02517b8d78	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Tacuarembó Department	TA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
af4a3a5a-1e33-4dd6-b7ee-25ab9ea97466	9077c214-59a9-49a4-b5a4-bed9c6e4c965	Treinta y Tres Department	TT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
65745a22-0f1e-4884-9cda-fa5e8c2f0da9	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Andijan Region	AN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c7eb4bdf-9101-40ff-a3d1-d379d9180786	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Bukhara Region	BU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
83167683-e506-4171-ab95-d28325d0f336	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Fergana Region	FA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
480148b1-8b12-4ca0-bd1b-3d6d24e30754	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Jizzakh Region	JI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7b0ad831-3c57-45a9-af1f-5d851cbcc5d3	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Karakalpakstan	QR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fda55990-0339-4232-974d-925dadf6838d	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Namangan Region	NG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0b5ebaed-0d7f-40ca-83a7-78b480d5bfb6	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Navoiy Region	NW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
05de82d4-c858-48f5-88c5-e4445127fabd	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Qashqadaryo Region	QA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7f4be7be-de03-4f42-8310-46eedd3b949d	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Samarqand Region	SA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b2b6724a-e176-4bf5-9d28-e9155c67b5bc	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Sirdaryo Region	SI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
25b8398e-3a63-45b5-8ef1-a96881400073	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Surxondaryo Region	SU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bab167eb-0221-40bb-bcc9-8b5fedd5a933	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Tashkent	TK	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c516018-4707-4687-bd26-21d654883956	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Tashkent Region	TO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
25b1b2b6-8886-4dee-9b58-2ec5717b307e	7aa3cafa-9ce6-4b0f-ad6b-e93aaffe2688	Xorazm Region	XO	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f223147f-9dc4-43e7-bc2d-84e0d7635c0e	5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Malampa	MAP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
72ff2640-b1a9-4e7d-8042-df7fe665d19d	5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Penama	PAM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6d019332-d56c-4605-9118-6d7f84aa09b2	5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Sanma	SAM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
df278a6d-a636-4dd7-81d6-9e49ae96a90c	5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Shefa	SEE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bfe85fe4-2749-44a8-a6c0-1db2c8af6b78	5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Tafea	TAE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
49afd83b-bde2-4828-832f-8c01b73a9d54	5c1a4b9b-a8c8-4c58-a0f6-acb8713a66b9	Torba	TOB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6d2ec5cb-17b1-4a55-85db-6ea3b756f1f2	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Amazonas	Z	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
28d084fc-45b6-485d-9e9d-745834c41062	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Anzoátegui	B	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b9d70443-3edf-41ce-8510-705b354e2e8f	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Apure	C	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d5dd104b-73e7-48c0-bff0-978c48be9590	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Aragua	D	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
243a65b5-78d4-4f83-905f-9d452c376504	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Barinas	E	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
aa12817b-4b9b-438f-b80f-eb7208ffb6f0	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Bolívar	F	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
07f1d3f5-1d2c-4632-aae1-c5ee8d2de712	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Carabobo	G	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
649fcd9e-fedd-4ec2-809d-6801fb5d16a6	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Cojedes	H	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
24d19f16-a8d3-4f1e-a183-96f57262d1d2	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Delta Amacuro	Y	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9f10a8b9-f91e-4fe2-8f84-21c59c26fbbd	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Distrito Capital	A	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8ec0ad35-fe93-4940-a11a-7b57fa6dc424	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Falcón	I	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2f9f90d1-df7f-4e8f-9ab3-a80cccffd3cf	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Federal Dependencies of Venezuela	W	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0089b6df-c6e4-49dd-8726-948db4359a52	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Guárico	J	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e32e7a43-f304-4096-850a-4a087b103b12	0eedea10-2c5b-4a19-bb15-3ec898f1b720	La Guaira	X	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
effb37f4-ee44-4d8a-8d3b-a8de0dd9ac77	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Lara	K	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2c8f2baf-717c-4ecf-bf86-9320c286121e	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Miranda	M	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dd1790d8-4c9a-40d1-be0e-efa71af348e1	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Monagas	N	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5cfb5a22-197e-47ce-99fe-afe6052f3f7b	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Mérida	L	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bf24ef8d-a6c1-4c1f-ab4b-9fe3dfe95b6a	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Nueva Esparta	O	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7c4aefb1-e1c2-440e-8e7e-9337f5010b3a	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Portuguesa	P	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2eceac35-29a0-44b9-ab48-cd9f2b18e4f8	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Sucre	R	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
41e995f2-bc77-4ab3-9c2d-71ed848fa713	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Trujillo	T	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f3415b0d-3d76-47c8-847d-cbdf43090fdc	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Táchira	S	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6064fb5f-47b5-4043-b1ca-5e1453dc7068	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Yaracuy	U	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fb960663-c9d5-4493-9cce-41ba4f91e343	0eedea10-2c5b-4a19-bb15-3ec898f1b720	Zulia	V	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
744797f9-6bbf-4e05-8209-23c590d399ad	c1e9f47a-ae89-44a7-a012-48dd3578fecf	An Giang	44	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f7cb75e9-bd4b-4dbd-ad37-99b424f2017e	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bà Rịa-Vũng Tàu	43	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1bf62100-7a3f-4d65-a612-f4d3035f6557	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bình Dương	57	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
530de45e-7d71-40c1-bc63-8ba0099e7aba	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bình Phước	58	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ee9b2213-a04f-4064-a161-a07b1b2d86bf	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bình Thuận	40	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2ac3cce6-c5e8-49f5-b098-810fdad54b74	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bình Định	31	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5e0ba96d-1679-4479-832e-a1d92f3d7526	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bạc Liêu	55	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
398f105e-c07f-4746-95ac-59a2c01c3dfa	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bắc Giang	54	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5dbe0fec-e35e-49c1-b448-8e59c2cdb974	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bắc Kạn	53	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
2da88c0b-3b77-43e0-8d4c-89e87f97f128	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bắc Ninh	56	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
19b73665-2f2c-47c0-af37-3c0b55abdf25	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Bến Tre	50	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c54f9af0-8c6b-44ef-8d11-0ca70f6b68dd	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Cao Bằng	04	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fab2ed17-c0e2-4ca7-a7c3-87bfe0fd7727	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Cà Mau	59	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d9e2c34b-fc13-44e7-998b-5b7ea93fb74f	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Cần Thơ	CT	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bf1152d3-4b31-45f8-8682-4a76827ec2ec	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Gia Lai	30	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
91e30590-ebd5-4069-80cb-7e886736d081	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hà Giang	03	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e31ec871-10c2-4fa0-9571-29c22c08ef9c	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hà Nam	63	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4597c3e3-db90-4a79-aace-754b75e20a9a	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hà Nội	HN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b6a19abe-aed8-4803-9c9c-909aa1560ef9	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hà Tĩnh	23	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
684fc2a6-a07b-4c49-9a7c-a5b0b4278485	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hòa Bình	14	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ef449ced-9638-412a-8811-785ec0822ec3	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hưng Yên	66	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8bb652a7-b296-4aa1-963c-0d5368eced81	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hải Dương	61	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
78d0dacb-b899-408e-a453-d897bdfe54cc	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hải Phòng	HP	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
170e48f3-af79-400f-b6c0-ab57ba65e0fe	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hậu Giang	73	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c606570d-331e-4fed-83d2-d417124da636	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Hồ Chí Minh	SG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3c9818e9-69a5-4b6b-bb40-5e6590bf3812	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Khánh Hòa	34	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dd92b4b6-0ba6-4fb5-9729-444a27d7b728	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Kiên Giang	47	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7a5e9c8f-b992-47c0-847d-902759d8b166	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Kon Tum	28	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
baf8346e-af27-43d0-8472-0556bd089024	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Lai Châu	01	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7f18b0cc-e942-4da1-9205-93b2586ce570	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Long An	41	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
109ba1ab-e0a4-4048-81d9-b3804d9d318f	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Lào Cai	02	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a9667e65-3132-467c-93ff-254a119c8a72	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Lâm Đồng	35	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
484918fe-57e2-462f-8d7b-5ae877a56084	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Lạng Sơn	09	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
815921f2-2b90-40f0-99c6-284b3169fa32	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Nam Định	67	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bd350219-b715-49da-a9cd-a48b8ba1686c	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Nghệ An	22	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a512151a-40f5-411a-bbb4-749bb1edd645	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Ninh Bình	18	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d9e60e67-14de-41f2-9a58-66f6fad87e07	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Ninh Thuận	36	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7fcde81b-772b-4ed8-a9be-4cb6f324a5e3	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Phú Thọ	68	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0d2bb037-9db7-4d18-ab74-958ac698c778	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Phú Yên	32	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4acbd07f-17db-4db9-8e94-87d05e3716d9	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Quảng Bình	24	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
ef33964a-706c-4cab-b313-d1831bada0a7	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Quảng Nam	27	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3b6b0636-562e-4151-b193-195909e7a8e6	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Quảng Ngãi	29	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5de82cd7-a80e-4830-a3e2-d8107f86eaad	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Quảng Ninh	13	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
07bf9c39-2194-4164-9405-6a1eb1fb6642	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Quảng Trị	25	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f11ce57c-1f47-432a-8503-e141d41f2862	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Sóc Trăng	52	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a5b01637-f702-4730-9957-8ee2640b4195	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Sơn La	05	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c12fac48-a1f0-4bb5-93ae-8b75bb3571bb	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Thanh Hóa	21	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1bb37007-32e7-4ee9-8222-59db4afefce9	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Thái Bình	20	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
73f6c3f8-704e-4726-b838-968c39984f01	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Thái Nguyên	69	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e500fa03-c4a6-4b83-b5b4-a81bc43fa8a0	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Thừa Thiên-Huế	26	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
67d8bbfe-4f2a-4829-a47e-8c86507ac7a8	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Tiền Giang	46	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
72224b45-91d7-4610-bd5f-43f2e6c05d81	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Trà Vinh	51	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
6c7a2a2e-83d5-4a24-9942-e1b5f88cd5e1	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Tuyên Quang	07	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
65971cef-6e0c-49c1-9b9e-f011bc993f2a	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Tây Ninh	37	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
17426e64-8eff-447e-bd5c-7242f123c255	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Vĩnh Long	49	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
edb7198a-3c6c-44b7-8507-64a83dfbc52f	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Vĩnh Phúc	70	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
035ca2a5-8532-4173-91c7-a8057ce3fbcf	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Yên Bái	06	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
042be783-746c-4ac7-a139-ead7283e09f8	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Điện Biên	71	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c4beb108-3fe6-42fc-a7f3-02fe794d624f	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Đà Nẵng	DN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
5aae6997-9358-43a3-a389-daa2b3443320	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Đắk Lắk	33	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c90d5770-0827-4384-b1f5-6b7d85e7bbd3	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Đắk Nông	72	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
63fc1608-5507-436d-a265-2107ba3a532d	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Đồng Nai	39	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
25fe581a-153c-4a4b-ac21-5fe7dcd10434	c1e9f47a-ae89-44a7-a012-48dd3578fecf	Đồng Tháp	45	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
fa6234e5-173e-4df8-87e5-702b95b9606c	de189fea-a220-48e3-8ff0-dc6dd1062606	'Adan Governorate	AD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
65ee56a0-ae1c-4620-af09-c0b7e510a08d	de189fea-a220-48e3-8ff0-dc6dd1062606	'Amran Governorate	AM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c2f6c453-36cc-4e71-8a12-2b1bea812d1d	de189fea-a220-48e3-8ff0-dc6dd1062606	Abyan Governorate	AB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
662f285f-c318-4bf9-b8a5-5cc86194770b	de189fea-a220-48e3-8ff0-dc6dd1062606	Al Bayda' Governorate	BA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7a760d52-d780-4b70-ae66-fc5c66dc9bbb	de189fea-a220-48e3-8ff0-dc6dd1062606	Al Hudaydah Governorate	HU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
53cf203d-75b4-4501-9ea2-1b34f8f90350	de189fea-a220-48e3-8ff0-dc6dd1062606	Al Jawf Governorate	JA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
eaa1a160-5175-43bd-bc57-d2ef16caa9f4	de189fea-a220-48e3-8ff0-dc6dd1062606	Al Mahrah Governorate	MR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
eb9e4624-0ef4-4abd-8dde-33096f9d1a77	de189fea-a220-48e3-8ff0-dc6dd1062606	Al Mahwit Governorate	MW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7a60a5c7-1c56-45b3-8ca4-f11b890f7316	de189fea-a220-48e3-8ff0-dc6dd1062606	Dhamar Governorate	DH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
32c22fbc-f795-41d2-b5a5-fa74f928b027	de189fea-a220-48e3-8ff0-dc6dd1062606	Hadhramaut Governorate	HD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
72328988-e1d1-41db-9a47-f5f1aeb52e5e	de189fea-a220-48e3-8ff0-dc6dd1062606	Hajjah Governorate	HJ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
20088792-1b0e-4811-9658-f3e9d2d8ee2a	de189fea-a220-48e3-8ff0-dc6dd1062606	Ibb Governorate	IB	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8d4be6f5-f738-4018-92bb-26a663a19617	de189fea-a220-48e3-8ff0-dc6dd1062606	Lahij Governorate	LA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
afbffc75-6511-4229-a1e8-93b5c11ec012	de189fea-a220-48e3-8ff0-dc6dd1062606	Ma'rib Governorate	MA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bda5ea14-c85f-4de5-a4aa-9c6a47da4359	de189fea-a220-48e3-8ff0-dc6dd1062606	Raymah Governorate	RA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
acdb9665-40d9-4248-a5b3-ed479a2c05c6	de189fea-a220-48e3-8ff0-dc6dd1062606	Saada Governorate	SD	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
3f919f29-e9d8-4079-ae8c-3f50bd34604b	de189fea-a220-48e3-8ff0-dc6dd1062606	Sana'a	SA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c523a405-6fdc-4b10-ae65-53c5985e1ac8	de189fea-a220-48e3-8ff0-dc6dd1062606	Sana'a Governorate	SN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
255674a2-e7cc-4e7b-921a-d978326019fa	de189fea-a220-48e3-8ff0-dc6dd1062606	Shabwah Governorate	SH	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c390297b-1726-4ad4-8f24-02f0729a019d	de189fea-a220-48e3-8ff0-dc6dd1062606	Socotra Governorate	SU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
d3d0d4ac-0251-4638-9374-4e598b652de1	de189fea-a220-48e3-8ff0-dc6dd1062606	Ta'izz Governorate	TA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
36f9735c-3eaf-4c10-8e5b-552ebdcc886e	47672dcc-1cb3-45b7-8030-5302834a9da2	Central Province	02	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
8e796f66-8293-44ad-98c6-e6ca10123a25	47672dcc-1cb3-45b7-8030-5302834a9da2	Copperbelt Province	08	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9527648a-f26e-4111-a026-672112eed57f	47672dcc-1cb3-45b7-8030-5302834a9da2	Eastern Province	03	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9e2f7dab-5225-473f-954c-6fc50df828f8	47672dcc-1cb3-45b7-8030-5302834a9da2	Luapula Province	04	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
dafa7b44-a8dc-450c-be92-40ff6f3934d3	47672dcc-1cb3-45b7-8030-5302834a9da2	Lusaka Province	09	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
f88f5b5b-e145-49e5-9729-b5462197f80f	47672dcc-1cb3-45b7-8030-5302834a9da2	Muchinga Province	10	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1314bf6e-e0d2-4587-ae6c-545e0e6ef712	47672dcc-1cb3-45b7-8030-5302834a9da2	Northern Province	05	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9ac71418-f46d-40bd-97c3-1497acf93c80	47672dcc-1cb3-45b7-8030-5302834a9da2	Northwestern Province	06	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
e4eb322a-1b2e-44b5-84b8-e74b7e1a8228	47672dcc-1cb3-45b7-8030-5302834a9da2	Southern Province	07	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
1e93e11c-c1df-4935-a1d2-869e886c56d3	47672dcc-1cb3-45b7-8030-5302834a9da2	Western Province	01	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b415031e-17e9-4859-8fab-8d82f94f9d1a	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Bulawayo Province	BU	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
09e1e775-5fc7-487a-b80a-6c748bfb1b1a	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Harare Province	HA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
a8b94cbd-c961-4863-aa34-91025a8c4716	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Manicaland	MA	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
aaf0ea37-53f3-44ed-bda5-008c1b0d9e46	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Mashonaland Central Province	MC	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
20cdff2c-1da5-4884-ac53-01c71e83461b	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Mashonaland East Province	ME	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
68d23ebc-6578-4e5b-a094-20b941238150	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Mashonaland West Province	MW	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
bb57f45d-6bb0-4247-8dd6-f81122441b4c	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Masvingo Province	MV	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
66b15fb8-e13b-4577-b2f4-328fbeffebfc	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Matabeleland North Province	MN	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0492f23b-30f2-44e1-aceb-7bac2b06ac29	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Matabeleland South Province	MS	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
9587137b-4dcc-4127-898c-c59cdde8a93a	92735f77-b2dc-4cc8-a9de-2152216d2d0c	Midlands Province	MI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
c83342b2-fa8b-4442-84d6-74c31ce97723	e481aed1-b950-43ae-99c1-943c9f13f826	Gjilan District	XGJ	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
688ea18c-1eb2-4ffc-b6b4-032894ce22ea	e481aed1-b950-43ae-99c1-943c9f13f826	Kosovska Mitrovica District	XKM	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
4ed92f24-eeb9-4d54-bf1c-59ff4a6936bc	e481aed1-b950-43ae-99c1-943c9f13f826	Peć District	XPE	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
7b41e98f-2e1b-476a-a25b-0f7c7b02e811	e481aed1-b950-43ae-99c1-943c9f13f826	Pristina (Priştine)	XPI	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
183a5555-973c-4c06-8c26-b166d375919e	e481aed1-b950-43ae-99c1-943c9f13f826	Prizren District	XPR	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
b7d98acd-754c-4ce7-a169-931d9b2dc30c	e481aed1-b950-43ae-99c1-943c9f13f826	Uroševac District (Ferizaj)	XUF	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
0d258897-0a5d-40e8-971a-52c2bd69b1c8	e481aed1-b950-43ae-99c1-943c9f13f826	Đakovica District (Gjakove)	XDG	t	2026-02-25 08:11:36.698	2026-02-25 08:11:36.698	\N	\N	\N	\N
\.


--
-- Data for Name: success_or_error_or_sms_or_email_texts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.success_or_error_or_sms_or_email_texts (id, message_code, success_or_error_message, sms_message, email_message, message_type, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, status_code, subject_name, http_status_name) FROM stdin;
bf4559cf-deef-4c01-b3e1-1e5698ef3c2b	4005	Referral Link Send Successful.	\N	Dear Sir/Concern,\n\n                        Referral Email Link : @emailLink \n                        Name : @fullName\n                        Email : @email\n\n                        more text.....	SUCCESS	t	2026-02-25 08:11:37.429	system	2026-02-25 08:11:37.429	system	\N	\N	400	Referral                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	\N
2f9bc1cb-450c-4664-9fe9-c7982ca7b3fe	4002	Referral Email Send Successful.	\N	Dear Sir/Concern,\n\n                        Referral Email Link : @emailLink \n                        Name : @fullName\n                        Email : @email\n\n                        more text.....	SUCCESS	t	2026-02-25 08:11:37.429	system	2026-02-25 08:11:37.429	system	\N	\N	400	Referral                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	\N
\.


--
-- Data for Name: system_settings; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.system_settings (id, key, value, "order", created_at, updated_at) FROM stdin;
2d632953-5126-42d8-abc9-64bfbbd1e1a6	toinConventionRate	0.01	1	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
94d08896-7398-47bd-9b55-f707f7a17985	entryBonusToin	5.00	2	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
b411a80b-aa7b-4c2e-acdf-e2f2235d177b	kycBonusToin	10.00	3	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
54361784-ac1f-4584-9114-8d22f4a6e3a2	socialBonusToin	10.00	1	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
4c4cc07e-035f-4024-88df-47a59ef4e5af	favicon	favicon.ico	2	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
c87a8634-a4f6-4904-9abb-b06cbc944ad7	logo	logo.ico	3	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
515001aa-3722-425e-b53c-eb9a0c011390	whatsApp	+8801756307427	4	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
f4990999-4630-4461-8793-bf1b4883fe1d	organizationName	TOIN Park	5	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
95fe0948-fd97-401e-a6bb-6a1c08cf59df	organizationEmail	info@toilabs.com	6	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
f360cfc1-d8e8-4996-8a76-e11c5c62b8ae	telegram	+8801756307427	7	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
51fb2544-4b40-4b18-801b-ffecbafdd8b4	siteTitle	ToinPark	8	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
cd8dbdad-1b21-45a7-ae60-6474de8a7cda	airdropEventMessage	Join our airdrop event to win exciting prizes!	9	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
5b134816-db13-47f4-9e64-31ec5d4934fe	minUSDTWithdrawalAmount	10	10	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
b7d16c2f-84de-4c2b-b527-744aced121cc	platformWithdrawalFeePercentage	1	11	2026-02-25 08:11:37.444	2026-02-25 08:11:37.444
\.


--
-- Data for Name: ticket_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.ticket_categories (id, name, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: ticket_messages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.ticket_messages (id, ticket_id, message, sender_id, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tickets (id, subject, description, ticket_category_id, status, priority, responded_at, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, ticket_no) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.transactions (id, transaction_auto_id, user_id, toin_amount, trx_success_datetime, trx_payment_gateway, created_at, created_by, updated_at, updated_by, trx_type, trx_note, trx_status, trx_payment_gateway_reference_id, trx_payment_gateway_response, level_id, staking_adjustment_id, user_staking_package_id, withdrawal_request_id, usdt_amount, usdt_conversion_rate) FROM stdin;
\.


--
-- Data for Name: tutorial_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tutorial_categories (id, name, description, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: tutorials; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tutorials (id, title, description, type, duration, is_active, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, "filePath", "isFeatured", "sourceLink", "tutorialCategoryId", "thumbnailPath") FROM stdin;
\.


--
-- Data for Name: user_change_history_for_email_or_phone; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_change_history_for_email_or_phone (id, user_id, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, change_type, full_name, "logId", new_value, old_value, user_name, remarks, requested_at, verified_at) FROM stdin;
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_profiles (id, first_name, last_name, date_of_birth, gender, profile_image_url, bio, address_line1, address_line2, city, state_id, country_id, zip_code, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, user_id) FROM stdin;
a866fee3-5513-4f76-b76c-f82cde137cd8	Super	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.043	\N	2026-02-25 08:11:37.043	\N	\N	\N	b7cde140-2914-4eab-b2c2-c94736783c46
1a2fad59-78b6-446e-a7c2-da6235cd6a0c	System	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.048	\N	2026-02-25 08:11:37.048	\N	\N	\N	6ef43676-2f09-4b9f-b71b-d25d72e15a7f
7263099f-5c61-41b8-904d-9e9804337988	Member	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.052	\N	2026-02-25 08:11:37.052	\N	\N	\N	bf178b0c-ed97-4582-892e-e7baad9fb47a
5bbf4ecc-1b16-43dc-a50c-5fa6003df201	john	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.056	\N	2026-02-25 08:11:37.056	\N	\N	\N	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935
4818650f-b4b0-4a2f-8cb9-a21c91553337	john1	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.06	\N	2026-02-25 08:11:37.06	\N	\N	\N	46184f43-47f3-465a-8d2d-d3daeef3e6f5
b452b72b-4ee1-456d-808a-2b7746fccf17	john2	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.064	\N	2026-02-25 08:11:37.064	\N	\N	\N	8188aa5d-2748-4257-96b7-0fe7049032d1
3897192e-fcfe-466b-984d-8909b5049432	john3	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.067	\N	2026-02-25 08:11:37.067	\N	\N	\N	cc196d66-898c-4e4e-b69e-06a3ea47264b
c6f52af8-daf6-4b68-b3f2-040aacd9955b	john4	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.071	\N	2026-02-25 08:11:37.071	\N	\N	\N	6d5d1016-db8e-4b39-a385-ec73cb66380d
2152e193-fcbb-4823-bc09-23abff56614e	john5	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.074	\N	2026-02-25 08:11:37.074	\N	\N	\N	9e140011-1fcb-4d9b-9304-00536748bc2a
d9c3616f-6361-4cbe-94b8-808069db0a96	john6	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.078	\N	2026-02-25 08:11:37.078	\N	\N	\N	b594990d-82ee-4d4f-a2bd-c1c737f686a3
c3516925-b1bd-4153-9e0d-21a9cf37bf6b	john7	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.081	\N	2026-02-25 08:11:37.081	\N	\N	\N	03a5775f-6207-4bcf-909f-12f416a9a9b8
cbadb835-c8c6-4976-912f-573282f819b7	john8	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.085	\N	2026-02-25 08:11:37.085	\N	\N	\N	43049c4f-b3b6-40e5-b64d-696b3df2974a
35970c71-b1d3-4302-911d-44aa050e6ed3	john9	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.089	\N	2026-02-25 08:11:37.089	\N	\N	\N	989305e9-354c-4c4f-9884-40a5fe9833b5
8f84d13d-e7e2-496c-a890-4b5d80031661	john10	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.092	\N	2026-02-25 08:11:37.092	\N	\N	\N	cd630636-721a-450a-9417-23b3812defd0
ce28da2d-b457-450d-9580-15578f3cbf09	john11	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.096	\N	2026-02-25 08:11:37.096	\N	\N	\N	eb11632b-890c-4a3f-8350-6913002875c0
b4e09a09-0ce7-4be3-ba88-ea22babb507a	john12	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.099	\N	2026-02-25 08:11:37.099	\N	\N	\N	6c3648a0-29ee-45ef-be71-3d48f75ac6ae
7c89bfff-d85f-4aef-be60-eb89aa795592	john13	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.103	\N	2026-02-25 08:11:37.103	\N	\N	\N	eacc6652-69c5-453b-8121-1fed9d966427
c44fd5a7-862b-4f0e-b075-a5b95daf64c6	john14	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.106	\N	2026-02-25 08:11:37.106	\N	\N	\N	9950513f-426d-4a28-867a-8c803d39e4a9
73b29cab-9fbd-4971-b629-9a9dcfab4de3	john15	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.111	\N	2026-02-25 08:11:37.111	\N	\N	\N	8f5d0187-ee92-4ebc-84ad-30faad42e85b
d99f50e2-545b-4e35-b640-b299f0125490	john16	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.116	\N	2026-02-25 08:11:37.116	\N	\N	\N	cfc8cd96-3851-4272-be3a-3fc38ac4643e
44eabb2a-2aea-4094-984c-3d6044b17e27	john17	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.119	\N	2026-02-25 08:11:37.119	\N	\N	\N	a83acbfe-3b7f-4721-9186-5a1173813e8e
c552cd64-80aa-459b-bafd-38425a171474	john18	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.123	\N	2026-02-25 08:11:37.123	\N	\N	\N	41620a03-1c70-4eb6-9e64-0e6bf6961d71
5fb65c02-d0e9-4139-8897-e5a5cd57fe4e	john19	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.127	\N	2026-02-25 08:11:37.127	\N	\N	\N	743ebc2d-7073-40bd-a807-ff6dd58cf2fd
32839863-7798-4b08-bc06-b3d7c116ced3	john20	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.13	\N	2026-02-25 08:11:37.13	\N	\N	\N	8e4765da-658f-475c-922e-3ca18f2313ac
c206d40b-e315-48e3-931b-5f6f6516bd1c	john21	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.134	\N	2026-02-25 08:11:37.134	\N	\N	\N	6d90e0a1-91f0-4cd1-ac29-aed2a37c73c1
733ac557-d58a-4a83-a734-908f88560f97	john22	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.137	\N	2026-02-25 08:11:37.137	\N	\N	\N	c167bcbd-3b18-4c4d-bc17-fc24363c2f1b
3a067c0a-5f4a-4638-ac73-87af596db681	john23	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.141	\N	2026-02-25 08:11:37.141	\N	\N	\N	32d4d85c-b1db-4656-98e5-91c7ddd7810d
a2a0feac-7cbe-467e-8a88-96f0db968628	john24	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.145	\N	2026-02-25 08:11:37.145	\N	\N	\N	24d6dd29-9774-417f-87c9-4fb66d022dd1
ef672a84-3202-40df-a164-cf5ab59f7158	john25	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.149	\N	2026-02-25 08:11:37.149	\N	\N	\N	d10826dc-ac1c-48bb-9822-639d2c5a69d5
d3aca22b-f2d3-42d8-93fd-f93a7a98c9c1	john26	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.153	\N	2026-02-25 08:11:37.153	\N	\N	\N	eb09b4f4-50d8-4113-b5ca-49bf72460780
052bc9a6-07d7-4c52-b0ac-9aeb34f54392	john27	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.156	\N	2026-02-25 08:11:37.156	\N	\N	\N	6a1b17f4-3912-4c79-afd9-95c653174bc4
0c79f3dd-8291-487d-9b25-52c4884be559	john28	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.16	\N	2026-02-25 08:11:37.16	\N	\N	\N	14e1d108-f64b-4c85-80c1-dfc07cec40cc
43cf9997-13db-4b67-af35-429d2ef82568	john29	User	\N	Male	\N	\N	Head Office	\N	Dhaka	\N	\N	1000	2026-02-25 08:11:37.164	\N	2026-02-25 08:11:37.164	\N	\N	\N	aaf5acb6-3a69-4571-8c18-8c02232684d3
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_roles (user_id, role_id) FROM stdin;
b7cde140-2914-4eab-b2c2-c94736783c46	c67f6ec6-ddd8-4acf-9117-a54fd4c4c8ba
6ef43676-2f09-4b9f-b71b-d25d72e15a7f	214045a2-7fae-4dd4-90cd-ba911b0d0d51
bf178b0c-ed97-4582-892e-e7baad9fb47a	c464a406-c657-4b23-bf79-2d9c7225f165
5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	c464a406-c657-4b23-bf79-2d9c7225f165
46184f43-47f3-465a-8d2d-d3daeef3e6f5	c464a406-c657-4b23-bf79-2d9c7225f165
8188aa5d-2748-4257-96b7-0fe7049032d1	c464a406-c657-4b23-bf79-2d9c7225f165
cc196d66-898c-4e4e-b69e-06a3ea47264b	c464a406-c657-4b23-bf79-2d9c7225f165
6d5d1016-db8e-4b39-a385-ec73cb66380d	c464a406-c657-4b23-bf79-2d9c7225f165
9e140011-1fcb-4d9b-9304-00536748bc2a	c464a406-c657-4b23-bf79-2d9c7225f165
b594990d-82ee-4d4f-a2bd-c1c737f686a3	c464a406-c657-4b23-bf79-2d9c7225f165
03a5775f-6207-4bcf-909f-12f416a9a9b8	c464a406-c657-4b23-bf79-2d9c7225f165
43049c4f-b3b6-40e5-b64d-696b3df2974a	c464a406-c657-4b23-bf79-2d9c7225f165
989305e9-354c-4c4f-9884-40a5fe9833b5	c464a406-c657-4b23-bf79-2d9c7225f165
cd630636-721a-450a-9417-23b3812defd0	c464a406-c657-4b23-bf79-2d9c7225f165
eb11632b-890c-4a3f-8350-6913002875c0	c464a406-c657-4b23-bf79-2d9c7225f165
6c3648a0-29ee-45ef-be71-3d48f75ac6ae	c464a406-c657-4b23-bf79-2d9c7225f165
eacc6652-69c5-453b-8121-1fed9d966427	c464a406-c657-4b23-bf79-2d9c7225f165
9950513f-426d-4a28-867a-8c803d39e4a9	c464a406-c657-4b23-bf79-2d9c7225f165
8f5d0187-ee92-4ebc-84ad-30faad42e85b	c464a406-c657-4b23-bf79-2d9c7225f165
cfc8cd96-3851-4272-be3a-3fc38ac4643e	c464a406-c657-4b23-bf79-2d9c7225f165
a83acbfe-3b7f-4721-9186-5a1173813e8e	c464a406-c657-4b23-bf79-2d9c7225f165
41620a03-1c70-4eb6-9e64-0e6bf6961d71	c464a406-c657-4b23-bf79-2d9c7225f165
743ebc2d-7073-40bd-a807-ff6dd58cf2fd	c464a406-c657-4b23-bf79-2d9c7225f165
8e4765da-658f-475c-922e-3ca18f2313ac	c464a406-c657-4b23-bf79-2d9c7225f165
6d90e0a1-91f0-4cd1-ac29-aed2a37c73c1	c464a406-c657-4b23-bf79-2d9c7225f165
c167bcbd-3b18-4c4d-bc17-fc24363c2f1b	c464a406-c657-4b23-bf79-2d9c7225f165
32d4d85c-b1db-4656-98e5-91c7ddd7810d	c464a406-c657-4b23-bf79-2d9c7225f165
24d6dd29-9774-417f-87c9-4fb66d022dd1	c464a406-c657-4b23-bf79-2d9c7225f165
d10826dc-ac1c-48bb-9822-639d2c5a69d5	c464a406-c657-4b23-bf79-2d9c7225f165
eb09b4f4-50d8-4113-b5ca-49bf72460780	c464a406-c657-4b23-bf79-2d9c7225f165
6a1b17f4-3912-4c79-afd9-95c653174bc4	c464a406-c657-4b23-bf79-2d9c7225f165
14e1d108-f64b-4c85-80c1-dfc07cec40cc	c464a406-c657-4b23-bf79-2d9c7225f165
aaf5acb6-3a69-4571-8c18-8c02232684d3	c464a406-c657-4b23-bf79-2d9c7225f165
\.


--
-- Data for Name: user_staking_packages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_staking_packages (id, user_id, package_id, toin_amount, bonus_amount, daily_profit_percent, start_date, total_profit, is_active, created_at, created_by, updated_at, updated_by, initial_end_date, recurring_profit_days, submit_for_withdraw, withdrawal_status, usd_conversion_rate, next_reward_date, previous_reward_date, is_bonus_done, is_leveling_bonus_done, staked_toin, minimum_duration_in_days, remarks, usdt_amount, stake_created_by) FROM stdin;
\.


--
-- Data for Name: user_wallet_addresses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_wallet_addresses (id, user_id, wallet_account_id, name, status, is_default, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
\.


--
-- Data for Name: user_wallets; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_wallets (id, version, user_id, wallet_balance, total_staking_bonus, total_claim_bonus, total_entry_bonus, total_leveling_bonus, total_referral, total_commission_bonus, total_staking, total_challenge_bonus, total_withdrawals, total_refund, total_void, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, total_kyc_bonus) FROM stdin;
d40c82ca-d7f0-45e0-8c8c-bd75475ccf95	1b252255-2859-44c9-8cbe-e2970da5827c	b7cde140-2914-4eab-b2c2-c94736783c46	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.168	\N	2026-02-25 08:11:37.168	\N	\N	\N	0.0000
2876fd09-6cd7-4c89-868c-0ab1a1feffee	bd1ae766-2d83-401d-9910-34cde5db7d0b	6ef43676-2f09-4b9f-b71b-d25d72e15a7f	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.173	\N	2026-02-25 08:11:37.173	\N	\N	\N	0.0000
567b1857-0b66-4cd8-be50-354496a9acbe	d4f632a4-6b3d-482b-903e-5c24a6a50c27	bf178b0c-ed97-4582-892e-e7baad9fb47a	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.177	\N	2026-02-25 08:11:37.177	\N	\N	\N	0.0000
4cd5fe44-17bb-4e05-b110-11fe0815dd4b	b35ca31d-a8d8-4534-ab00-312bf54d1726	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.18	\N	2026-02-25 08:11:37.18	\N	\N	\N	0.0000
ded9a746-19b0-491e-acae-11f731203f2e	50d7b8d0-6b7c-484d-9dcd-3f905916a556	46184f43-47f3-465a-8d2d-d3daeef3e6f5	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.184	\N	2026-02-25 08:11:37.184	\N	\N	\N	0.0000
a5173c70-068e-4ddb-a379-cb9d780cd727	1efdbd63-cda9-4bc8-bf31-75137562e728	8188aa5d-2748-4257-96b7-0fe7049032d1	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.188	\N	2026-02-25 08:11:37.188	\N	\N	\N	0.0000
a7a7d944-2e9f-4525-afc7-682c401068a5	83a496ff-3f67-42b8-b581-e876e5c0d8e9	cc196d66-898c-4e4e-b69e-06a3ea47264b	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.191	\N	2026-02-25 08:11:37.191	\N	\N	\N	0.0000
73054836-6bf7-473d-8057-ea67b6f9be63	569ea069-72c0-455c-870b-f8a55e661e3e	6d5d1016-db8e-4b39-a385-ec73cb66380d	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.195	\N	2026-02-25 08:11:37.195	\N	\N	\N	0.0000
4d2b0ab9-0f79-4201-b600-015910cf921e	17691b32-6af4-4be1-9d6e-f239ffd8020c	9e140011-1fcb-4d9b-9304-00536748bc2a	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.199	\N	2026-02-25 08:11:37.199	\N	\N	\N	0.0000
b5c2bc22-7507-4301-ab93-d779614bc0f4	f06b64eb-7bfc-4cb7-ac6d-fbead1d46125	b594990d-82ee-4d4f-a2bd-c1c737f686a3	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.204	\N	2026-02-25 08:11:37.204	\N	\N	\N	0.0000
5bfa212d-2b3a-44f1-97c0-3e3ac1f87bf6	741da23c-1080-401e-9924-971f4eadcf36	03a5775f-6207-4bcf-909f-12f416a9a9b8	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.207	\N	2026-02-25 08:11:37.207	\N	\N	\N	0.0000
7fc45b4d-7dfa-4024-98a9-ac58c6032650	1d217014-b2e2-44bf-81c7-79b7ba0f24f8	43049c4f-b3b6-40e5-b64d-696b3df2974a	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.211	\N	2026-02-25 08:11:37.211	\N	\N	\N	0.0000
c2e1fccd-643e-4b6d-8148-18c34e83f0c2	4d0aff75-9dc2-4419-bb3c-2a0538a3b9ae	989305e9-354c-4c4f-9884-40a5fe9833b5	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.216	\N	2026-02-25 08:11:37.216	\N	\N	\N	0.0000
97104352-f818-4cbf-9989-fd2bbd229d9c	5d282d65-7387-4ce5-abfd-09c2673e0e34	cd630636-721a-450a-9417-23b3812defd0	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.22	\N	2026-02-25 08:11:37.22	\N	\N	\N	0.0000
c2cca5e1-094d-4751-9952-7a9a2449158e	4f70d5b3-8672-4647-9ab0-5350347c4d88	eb11632b-890c-4a3f-8350-6913002875c0	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.223	\N	2026-02-25 08:11:37.223	\N	\N	\N	0.0000
f8fd4245-4447-43e9-aa65-88752bba1983	03de32cc-4ef0-4ae5-942b-64ecbaa46e40	6c3648a0-29ee-45ef-be71-3d48f75ac6ae	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.227	\N	2026-02-25 08:11:37.227	\N	\N	\N	0.0000
424c497b-d115-4861-953e-f22e907b93be	c4bb6e9a-325b-4b0b-b569-78bc29506b43	eacc6652-69c5-453b-8121-1fed9d966427	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.231	\N	2026-02-25 08:11:37.231	\N	\N	\N	0.0000
33c663b5-3b74-47c1-a05e-44b6118744f0	8889a8f5-2517-49af-9ea4-a825c7de0457	9950513f-426d-4a28-867a-8c803d39e4a9	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.236	\N	2026-02-25 08:11:37.236	\N	\N	\N	0.0000
1dceea97-f0b7-4f3a-9144-46453f63c926	f0a72b9e-7003-4627-b0ae-8f3e76bd4c3e	8f5d0187-ee92-4ebc-84ad-30faad42e85b	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.24	\N	2026-02-25 08:11:37.24	\N	\N	\N	0.0000
d360ecd5-db6e-4086-94a6-79ed2c6736a3	56c92e6a-6bb2-4df0-8db5-fc1ad3cc5020	cfc8cd96-3851-4272-be3a-3fc38ac4643e	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.245	\N	2026-02-25 08:11:37.245	\N	\N	\N	0.0000
37062141-6f10-4bf8-a79c-70ff5ee4fcb7	3f37edc0-e322-4f8a-8729-3ae96e594d15	a83acbfe-3b7f-4721-9186-5a1173813e8e	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.248	\N	2026-02-25 08:11:37.248	\N	\N	\N	0.0000
55b07b20-7015-4710-b5e4-19be75108335	7d122113-ad40-498b-ae26-8787f278922b	41620a03-1c70-4eb6-9e64-0e6bf6961d71	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.252	\N	2026-02-25 08:11:37.252	\N	\N	\N	0.0000
504f5d2e-124e-49e5-9e38-501d92fb061a	1bee92c1-6c5b-47c7-9ac0-1b92a9d34afc	743ebc2d-7073-40bd-a807-ff6dd58cf2fd	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.255	\N	2026-02-25 08:11:37.255	\N	\N	\N	0.0000
9f76a60e-ea51-4467-a489-fbca1109f142	910af141-56d0-4f7b-b102-e578b640b85d	8e4765da-658f-475c-922e-3ca18f2313ac	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.259	\N	2026-02-25 08:11:37.259	\N	\N	\N	0.0000
046b176e-0e3e-4ba9-8333-5be90119ffca	fe95d5ee-5e54-462b-9e0d-5e4c796b4fb6	6d90e0a1-91f0-4cd1-ac29-aed2a37c73c1	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.262	\N	2026-02-25 08:11:37.262	\N	\N	\N	0.0000
e7e01376-c7ec-4666-8739-4834bebe45f6	66c781d7-d13c-4184-a3b1-dfdf5d3d29da	c167bcbd-3b18-4c4d-bc17-fc24363c2f1b	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.265	\N	2026-02-25 08:11:37.265	\N	\N	\N	0.0000
f4e74c0f-99c8-4b7b-963a-6b959c8505ca	a6d6a3bd-8364-44d6-9a5e-5d93c90c5cd9	32d4d85c-b1db-4656-98e5-91c7ddd7810d	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.269	\N	2026-02-25 08:11:37.269	\N	\N	\N	0.0000
60b70b7b-226b-4b55-bf75-e3c7bfb4f8bf	116c3dea-f3f8-4510-b900-eeeae9117dba	24d6dd29-9774-417f-87c9-4fb66d022dd1	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.292	\N	2026-02-25 08:11:37.292	\N	\N	\N	0.0000
514bb0ae-0fe7-4425-8815-04ebd5a93073	c07a755b-6418-403b-8484-a16c79b4325e	d10826dc-ac1c-48bb-9822-639d2c5a69d5	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.296	\N	2026-02-25 08:11:37.296	\N	\N	\N	0.0000
76c95868-269f-4ceb-8f2c-f3d72dbd7d60	4a65219b-5113-496a-ad35-29616d44c643	eb09b4f4-50d8-4113-b5ca-49bf72460780	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.299	\N	2026-02-25 08:11:37.299	\N	\N	\N	0.0000
0687c625-ae99-4682-9cd6-10661d31ca71	b462ed81-cf02-438a-a5ee-2bc114468f3c	6a1b17f4-3912-4c79-afd9-95c653174bc4	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.303	\N	2026-02-25 08:11:37.303	\N	\N	\N	0.0000
ad82c02a-fe8d-488d-80a0-40825cddc291	5c07c59e-42b1-4ef0-b8c3-580ba8f7c8d1	14e1d108-f64b-4c85-80c1-dfc07cec40cc	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.308	\N	2026-02-25 08:11:37.308	\N	\N	\N	0.0000
d5cbc07b-e69b-483d-b899-75887d5a0790	7661b46e-d025-4cd3-b514-66daec4b42e6	aaf5acb6-3a69-4571-8c18-8c02232684d3	5.0000	0.0000	0.0000	5.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	0.0000	2026-02-25 08:11:37.316	\N	2026-02-25 08:11:37.316	\N	\N	\N	0.0000
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, phone_number, email, email_verified, email_verified_at, phone_verified, phone_verified_at, username, user_role, two_factor_enabled, two_factor_secret, lockout_enabled, lockout_end, access_failed_count, referrer_id, referral_code, last_login_at, last_login_ip, login_count, is_kyc_verified, kyc_verified_at, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, toin_account_number, "Password_hashed", total_referred, status, email_changing_count, phone_changing_count) FROM stdin;
b7cde140-2914-4eab-b2c2-c94736783c46	8801712345677	superadmin@toilabs.com	t	2026-02-25 08:11:36.817	f	\N	TOIN10001	SuperAdmin	f	\N	t	\N	0	\N	ADMIN001	\N	\N	0	f	\N	2026-02-25 08:11:36.818	\N	2026-02-25 08:11:36.818	\N	\N	\N	TOIN00001	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
6ef43676-2f09-4b9f-b71b-d25d72e15a7f	8801712345678	admin@toilabs.com	t	2026-02-25 08:11:36.827	f	\N	TOIN20002	Admin	f	\N	t	\N	0	\N	ADMIN002	\N	\N	0	f	\N	2026-02-25 08:11:36.828	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.828	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN00002	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
bf178b0c-ed97-4582-892e-e7baad9fb47a	8801712345679	member@toilabs.com	t	2026-02-25 08:11:36.832	f	\N	TOIN30003	Member	f	\N	t	\N	0	\N	MEM101	\N	\N	0	f	\N	2026-02-25 08:11:36.833	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.833	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN00003	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	8801712345600	john@example.com	t	2026-02-25 08:11:36.838	t	2026-02-25 08:11:36.838	TOIN40000	Member	f	\N	t	\N	0	\N	MEM000	\N	\N	0	f	\N	2026-02-25 08:11:36.839	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.839	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40000	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
9e140011-1fcb-4d9b-9304-00536748bc2a	8801712345605	john5@example.com	t	2026-02-25 08:11:36.865	t	2026-02-25 08:11:36.865	TOIN40005	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM005	\N	\N	0	f	\N	2026-02-25 08:11:36.866	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40005	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
b594990d-82ee-4d4f-a2bd-c1c737f686a3	8801712345606	john6@example.com	t	2026-02-25 08:11:36.871	t	2026-02-25 08:11:36.871	TOIN40006	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM006	\N	\N	0	f	\N	2026-02-25 08:11:36.872	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40006	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
03a5775f-6207-4bcf-909f-12f416a9a9b8	8801712345607	john7@example.com	t	2026-02-25 08:11:36.876	t	2026-02-25 08:11:36.876	TOIN40007	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM007	\N	\N	0	f	\N	2026-02-25 08:11:36.877	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40007	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
cfc8cd96-3851-4272-be3a-3fc38ac4643e	8801712345616	john16@example.com	t	2026-02-25 08:11:36.926	t	2026-02-25 08:11:36.926	TOIN40016	Member	f	\N	t	\N	0	cc196d66-898c-4e4e-b69e-06a3ea47264b	MEM016	\N	\N	0	f	\N	2026-02-25 08:11:36.927	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:37.013	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40016	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
a83acbfe-3b7f-4721-9186-5a1173813e8e	8801712345617	john17@example.com	t	2026-02-25 08:11:36.931	t	2026-02-25 08:11:36.931	TOIN40017	Member	f	\N	t	\N	0	cfc8cd96-3851-4272-be3a-3fc38ac4643e	MEM017	\N	\N	0	f	\N	2026-02-25 08:11:36.932	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:37.018	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40017	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
41620a03-1c70-4eb6-9e64-0e6bf6961d71	8801712345618	john18@example.com	t	2026-02-25 08:11:36.937	t	2026-02-25 08:11:36.937	TOIN40018	Member	f	\N	t	\N	0	a83acbfe-3b7f-4721-9186-5a1173813e8e	MEM018	\N	\N	0	f	\N	2026-02-25 08:11:36.938	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:37.023	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40018	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
743ebc2d-7073-40bd-a807-ff6dd58cf2fd	8801712345619	john19@example.com	t	2026-02-25 08:11:36.941	t	2026-02-25 08:11:36.941	TOIN40019	Member	f	\N	t	\N	0	41620a03-1c70-4eb6-9e64-0e6bf6961d71	MEM019	\N	\N	0	f	\N	2026-02-25 08:11:36.942	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:37.028	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40019	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
c167bcbd-3b18-4c4d-bc17-fc24363c2f1b	8801712345622	john22@example.com	t	2026-02-25 08:11:36.956	t	2026-02-25 08:11:36.956	TOIN40022	Member	f	\N	t	\N	0	\N	MEM022	\N	\N	0	f	\N	2026-02-25 08:11:36.957	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.957	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40022	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
32d4d85c-b1db-4656-98e5-91c7ddd7810d	8801712345623	john23@example.com	t	2026-02-25 08:11:36.96	t	2026-02-25 08:11:36.96	TOIN40023	Member	f	\N	t	\N	0	\N	MEM023	\N	\N	0	f	\N	2026-02-25 08:11:36.961	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.961	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40023	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
24d6dd29-9774-417f-87c9-4fb66d022dd1	8801712345624	john24@example.com	t	2026-02-25 08:11:36.965	t	2026-02-25 08:11:36.965	TOIN40024	Member	f	\N	t	\N	0	\N	MEM024	\N	\N	0	f	\N	2026-02-25 08:11:36.966	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.966	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40024	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
d10826dc-ac1c-48bb-9822-639d2c5a69d5	8801712345625	john25@example.com	t	2026-02-25 08:11:36.97	t	2026-02-25 08:11:36.97	TOIN40025	Member	f	\N	t	\N	0	\N	MEM025	\N	\N	0	f	\N	2026-02-25 08:11:36.97	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.97	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40025	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
eb09b4f4-50d8-4113-b5ca-49bf72460780	8801712345626	john26@example.com	t	2026-02-25 08:11:36.974	t	2026-02-25 08:11:36.974	TOIN40026	Member	f	\N	t	\N	0	\N	MEM026	\N	\N	0	f	\N	2026-02-25 08:11:36.975	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.975	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40026	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
6a1b17f4-3912-4c79-afd9-95c653174bc4	8801712345627	john27@example.com	t	2026-02-25 08:11:36.979	t	2026-02-25 08:11:36.979	TOIN40027	Member	f	\N	t	\N	0	\N	MEM027	\N	\N	0	f	\N	2026-02-25 08:11:36.98	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.98	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40027	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
14e1d108-f64b-4c85-80c1-dfc07cec40cc	8801712345628	john28@example.com	t	2026-02-25 08:11:36.984	t	2026-02-25 08:11:36.984	TOIN40028	Member	f	\N	t	\N	0	\N	MEM028	\N	\N	0	f	\N	2026-02-25 08:11:36.985	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.985	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40028	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
aaf5acb6-3a69-4571-8c18-8c02232684d3	8801712345629	john29@example.com	t	2026-02-25 08:11:36.989	t	2026-02-25 08:11:36.989	TOIN40029	Member	f	\N	t	\N	0	\N	MEM029	\N	\N	0	f	\N	2026-02-25 08:11:36.992	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:36.992	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40029	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
46184f43-47f3-465a-8d2d-d3daeef3e6f5	8801712345601	john1@example.com	t	2026-02-25 08:11:36.843	t	2026-02-25 08:11:36.843	TOIN40001	Member	f	\N	t	\N	0	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	MEM001	\N	\N	0	f	\N	2026-02-25 08:11:36.844	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	2026-02-25 08:11:36.999	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	\N	\N	TOIN40001	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
8188aa5d-2748-4257-96b7-0fe7049032d1	8801712345602	john2@example.com	t	2026-02-25 08:11:36.849	t	2026-02-25 08:11:36.849	TOIN40002	Member	f	\N	t	\N	0	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	MEM002	\N	\N	0	f	\N	2026-02-25 08:11:36.85	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	2026-02-25 08:11:36.999	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	\N	\N	TOIN40002	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
cc196d66-898c-4e4e-b69e-06a3ea47264b	8801712345603	john3@example.com	t	2026-02-25 08:11:36.855	t	2026-02-25 08:11:36.855	TOIN40003	Member	f	\N	t	\N	0	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	MEM003	\N	\N	0	f	\N	2026-02-25 08:11:36.856	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	2026-02-25 08:11:36.999	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	\N	\N	TOIN40003	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
6d5d1016-db8e-4b39-a385-ec73cb66380d	8801712345604	john4@example.com	t	2026-02-25 08:11:36.86	t	2026-02-25 08:11:36.86	TOIN40004	Member	f	\N	t	\N	0	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	MEM004	\N	\N	0	f	\N	2026-02-25 08:11:36.861	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	2026-02-25 08:11:36.999	5f1b5c59-f8d8-4cc5-bb60-aa92ddcb8935	\N	\N	TOIN40004	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
43049c4f-b3b6-40e5-b64d-696b3df2974a	8801712345608	john8@example.com	t	2026-02-25 08:11:36.881	t	2026-02-25 08:11:36.881	TOIN40008	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM008	\N	\N	0	f	\N	2026-02-25 08:11:36.882	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40008	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
989305e9-354c-4c4f-9884-40a5fe9833b5	8801712345609	john9@example.com	t	2026-02-25 08:11:36.886	t	2026-02-25 08:11:36.886	TOIN40009	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM009	\N	\N	0	f	\N	2026-02-25 08:11:36.887	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40009	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
cd630636-721a-450a-9417-23b3812defd0	8801712345610	john10@example.com	t	2026-02-25 08:11:36.892	t	2026-02-25 08:11:36.892	TOIN40010	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM010	\N	\N	0	f	\N	2026-02-25 08:11:36.893	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40010	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
eb11632b-890c-4a3f-8350-6913002875c0	8801712345611	john11@example.com	t	2026-02-25 08:11:36.898	t	2026-02-25 08:11:36.898	TOIN40011	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM011	\N	\N	0	f	\N	2026-02-25 08:11:36.899	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40011	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
6c3648a0-29ee-45ef-be71-3d48f75ac6ae	8801712345612	john12@example.com	t	2026-02-25 08:11:36.903	t	2026-02-25 08:11:36.903	TOIN40012	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM012	\N	\N	0	f	\N	2026-02-25 08:11:36.904	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40012	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
eacc6652-69c5-453b-8121-1fed9d966427	8801712345613	john13@example.com	t	2026-02-25 08:11:36.908	t	2026-02-25 08:11:36.908	TOIN40013	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM013	\N	\N	0	f	\N	2026-02-25 08:11:36.909	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40013	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
9950513f-426d-4a28-867a-8c803d39e4a9	8801712345614	john14@example.com	t	2026-02-25 08:11:36.913	t	2026-02-25 08:11:36.913	TOIN40014	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM014	\N	\N	0	f	\N	2026-02-25 08:11:36.914	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40014	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
6d90e0a1-91f0-4cd1-ac29-aed2a37c73c1	8801712345621	john21@example.com	t	2026-02-25 08:11:36.951	t	2026-02-25 08:11:36.951	TOIN40021	Member	f	\N	t	\N	0	8e4765da-658f-475c-922e-3ca18f2313ac	MEM021	\N	\N	0	f	\N	2026-02-25 08:11:36.952	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:37.039	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40021	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
8f5d0187-ee92-4ebc-84ad-30faad42e85b	8801712345615	john15@example.com	t	2026-02-25 08:11:36.919	t	2026-02-25 08:11:36.919	TOIN40015	Member	f	\N	t	\N	0	46184f43-47f3-465a-8d2d-d3daeef3e6f5	MEM015	\N	\N	0	f	\N	2026-02-25 08:11:36.922	46184f43-47f3-465a-8d2d-d3daeef3e6f5	2026-02-25 08:11:37.006	46184f43-47f3-465a-8d2d-d3daeef3e6f5	\N	\N	TOIN40015	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
8e4765da-658f-475c-922e-3ca18f2313ac	8801712345620	john20@example.com	t	2026-02-25 08:11:36.946	t	2026-02-25 08:11:36.946	TOIN40020	Member	f	\N	t	\N	0	743ebc2d-7073-40bd-a807-ff6dd58cf2fd	MEM020	\N	\N	0	f	\N	2026-02-25 08:11:36.947	b7cde140-2914-4eab-b2c2-c94736783c46	2026-02-25 08:11:37.033	b7cde140-2914-4eab-b2c2-c94736783c46	\N	\N	TOIN40020	$2b$10$v29zMbuU0b2b15SaicYdDOoV8jQSaIvcGTwqI8yQPTOQrEq8jZLyG	0	ACTIVE	0	0
\.


--
-- Data for Name: withdrawal_requests; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.withdrawal_requests (id, user_staking_package_id, address, amount, currency, status, created_at, created_by, updated_at, deleted_at, platform_fee, remark) FROM stdin;
\.


--
-- Name: referral_milestones_sequence_number_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.referral_milestones_sequence_number_seq', 1, false);


--
-- Name: user_change_history_for_email_or_phone_logId_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."user_change_history_for_email_or_phone_logId_seq"', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: air_drop_events air_drop_events_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.air_drop_events
    ADD CONSTRAINT air_drop_events_pkey PRIMARY KEY (id);


--
-- Name: announcement_categories announcement_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.announcement_categories
    ADD CONSTRAINT announcement_categories_pkey PRIMARY KEY (id);


--
-- Name: challenge_histories challenge_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.challenge_histories
    ADD CONSTRAINT challenge_histories_pkey PRIMARY KEY (id);


--
-- Name: challenges challenges_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.challenges
    ADD CONSTRAINT challenges_pkey PRIMARY KEY (id);


--
-- Name: community_events community_events_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.community_events
    ADD CONSTRAINT community_events_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: menu_and_permission_setups menu_and_permission_setups_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.menu_and_permission_setups
    ADD CONSTRAINT menu_and_permission_setups_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: official_announcements official_announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.official_announcements
    ADD CONSTRAINT official_announcements_pkey PRIMARY KEY (id);


--
-- Name: referral_commission_histories referral_commission_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_commission_histories
    ADD CONSTRAINT referral_commission_histories_pkey PRIMARY KEY (id);


--
-- Name: referral_hierarchy referral_hierarchy_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_hierarchy
    ADD CONSTRAINT referral_hierarchy_pkey PRIMARY KEY (id);


--
-- Name: referral_histories referral_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_histories
    ADD CONSTRAINT referral_histories_pkey PRIMARY KEY (id);


--
-- Name: referral_levels referral_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_levels
    ADD CONSTRAINT referral_levels_pkey PRIMARY KEY (id);


--
-- Name: referral_milestones referral_milestones_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_milestones
    ADD CONSTRAINT referral_milestones_pkey PRIMARY KEY (id);


--
-- Name: request_responses_logs request_responses_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.request_responses_logs
    ADD CONSTRAINT request_responses_logs_pkey PRIMARY KEY (id);


--
-- Name: role_wise_menu_and_permissions role_wise_menu_and_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.role_wise_menu_and_permissions
    ADD CONSTRAINT role_wise_menu_and_permissions_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: staking_adjustments staking_adjustments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.staking_adjustments
    ADD CONSTRAINT staking_adjustments_pkey PRIMARY KEY (id);


--
-- Name: staking_package_plans staking_package_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.staking_package_plans
    ADD CONSTRAINT staking_package_plans_pkey PRIMARY KEY (id);


--
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- Name: success_or_error_or_sms_or_email_texts success_or_error_or_sms_or_email_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.success_or_error_or_sms_or_email_texts
    ADD CONSTRAINT success_or_error_or_sms_or_email_texts_pkey PRIMARY KEY (id);


--
-- Name: system_settings system_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.system_settings
    ADD CONSTRAINT system_settings_pkey PRIMARY KEY (id);


--
-- Name: ticket_categories ticket_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ticket_categories
    ADD CONSTRAINT ticket_categories_pkey PRIMARY KEY (id);


--
-- Name: ticket_messages ticket_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ticket_messages
    ADD CONSTRAINT ticket_messages_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: tutorial_categories tutorial_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tutorial_categories
    ADD CONSTRAINT tutorial_categories_pkey PRIMARY KEY (id);


--
-- Name: tutorials tutorials_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tutorials
    ADD CONSTRAINT tutorials_pkey PRIMARY KEY (id);


--
-- Name: user_change_history_for_email_or_phone user_change_history_for_email_or_phone_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_change_history_for_email_or_phone
    ADD CONSTRAINT user_change_history_for_email_or_phone_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: user_staking_packages user_staking_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_staking_packages
    ADD CONSTRAINT user_staking_packages_pkey PRIMARY KEY (id);


--
-- Name: user_wallet_addresses user_wallet_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_wallet_addresses
    ADD CONSTRAINT user_wallet_addresses_pkey PRIMARY KEY (id);


--
-- Name: user_wallets user_wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_wallets
    ADD CONSTRAINT user_wallets_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: withdrawal_requests withdrawal_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.withdrawal_requests
    ADD CONSTRAINT withdrawal_requests_pkey PRIMARY KEY (id);


--
-- Name: air_drop_events_event_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX air_drop_events_event_name_key ON public.air_drop_events USING btree (event_name);


--
-- Name: countries_code_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX countries_code_key ON public.countries USING btree (code);


--
-- Name: countries_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX countries_name_key ON public.countries USING btree (name);


--
-- Name: notifications_user_id_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX notifications_user_id_created_at_idx ON public.notifications USING btree (user_id, created_at);


--
-- Name: notifications_user_id_is_read_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX notifications_user_id_is_read_idx ON public.notifications USING btree (user_id, is_read);


--
-- Name: referral_hierarchy_ancestor_id_level_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX referral_hierarchy_ancestor_id_level_idx ON public.referral_hierarchy USING btree (ancestor_id, level);


--
-- Name: referral_hierarchy_user_id_ancestor_id_level_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX referral_hierarchy_user_id_ancestor_id_level_key ON public.referral_hierarchy USING btree (user_id, ancestor_id, level);


--
-- Name: referral_hierarchy_user_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX referral_hierarchy_user_id_idx ON public.referral_hierarchy USING btree (user_id);


--
-- Name: referral_levels_level_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX referral_levels_level_name_key ON public.referral_levels USING btree (level_name);


--
-- Name: referral_milestones_referral_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX referral_milestones_referral_name_key ON public.referral_milestones USING btree (referral_name);


--
-- Name: referral_milestones_sequence_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX referral_milestones_sequence_number_key ON public.referral_milestones USING btree (sequence_number);


--
-- Name: role_wise_menu_and_permissions_menu_and_permission_setup_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX role_wise_menu_and_permissions_menu_and_permission_setup_id_idx ON public.role_wise_menu_and_permissions USING btree (menu_and_permission_setup_id);


--
-- Name: role_wise_menu_and_permissions_role_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX role_wise_menu_and_permissions_role_id_idx ON public.role_wise_menu_and_permissions USING btree (role_id);


--
-- Name: role_wise_menu_and_permissions_user_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX role_wise_menu_and_permissions_user_id_idx ON public.role_wise_menu_and_permissions USING btree (user_id);


--
-- Name: states_country_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX states_country_id_idx ON public.states USING btree (country_id);


--
-- Name: system_settings_key_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX system_settings_key_key ON public.system_settings USING btree (key);


--
-- Name: transactions_staking_adjustment_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX transactions_staking_adjustment_id_key ON public.transactions USING btree (staking_adjustment_id);


--
-- Name: transactions_transaction_auto_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX transactions_transaction_auto_id_key ON public.transactions USING btree (transaction_auto_id);


--
-- Name: transactions_withdrawal_request_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX transactions_withdrawal_request_id_key ON public.transactions USING btree (withdrawal_request_id);


--
-- Name: user_change_history_for_email_or_phone_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_change_history_for_email_or_phone_created_at_idx ON public.user_change_history_for_email_or_phone USING btree (created_at);


--
-- Name: user_change_history_for_email_or_phone_deleted_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_change_history_for_email_or_phone_deleted_at_idx ON public.user_change_history_for_email_or_phone USING btree (deleted_at);


--
-- Name: user_change_history_for_email_or_phone_user_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_change_history_for_email_or_phone_user_id_idx ON public.user_change_history_for_email_or_phone USING btree (user_id);


--
-- Name: user_profiles_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_profiles_created_at_idx ON public.user_profiles USING btree (created_at);


--
-- Name: user_profiles_deleted_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_profiles_deleted_at_idx ON public.user_profiles USING btree (deleted_at);


--
-- Name: user_profiles_user_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_profiles_user_id_idx ON public.user_profiles USING btree (user_id);


--
-- Name: user_profiles_user_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX user_profiles_user_id_key ON public.user_profiles USING btree (user_id);


--
-- Name: user_wallets_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_wallets_created_at_idx ON public.user_wallets USING btree (created_at);


--
-- Name: user_wallets_deleted_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX user_wallets_deleted_at_idx ON public.user_wallets USING btree (deleted_at);


--
-- Name: user_wallets_user_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX user_wallets_user_id_key ON public.user_wallets USING btree (user_id);


--
-- Name: user_wallets_version_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX user_wallets_version_key ON public.user_wallets USING btree (version);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_deleted_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_deleted_at_idx ON public.users USING btree (deleted_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_phone_number_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_phone_number_idx ON public.users USING btree (phone_number);


--
-- Name: users_phone_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_phone_number_key ON public.users USING btree (phone_number);


--
-- Name: users_referral_code_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_referral_code_idx ON public.users USING btree (referral_code);


--
-- Name: users_referral_code_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_referral_code_key ON public.users USING btree (referral_code);


--
-- Name: users_referrer_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_referrer_id_idx ON public.users USING btree (referrer_id);


--
-- Name: users_status_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_status_idx ON public.users USING btree (status);


--
-- Name: users_toin_account_number_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_toin_account_number_idx ON public.users USING btree (toin_account_number);


--
-- Name: users_toin_account_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_toin_account_number_key ON public.users USING btree (toin_account_number);


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_username_idx ON public.users USING btree (username);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: challenge_histories challenge_histories_challenge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.challenge_histories
    ADD CONSTRAINT challenge_histories_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenges(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: community_events community_events_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.community_events
    ADD CONSTRAINT community_events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: menu_and_permission_setups menu_and_permission_setups_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.menu_and_permission_setups
    ADD CONSTRAINT menu_and_permission_setups_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.menu_and_permission_setups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: official_announcements official_announcements_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.official_announcements
    ADD CONSTRAINT official_announcements_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.announcement_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: referral_commission_histories referral_commission_histories_referral_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_commission_histories
    ADD CONSTRAINT referral_commission_histories_referral_level_id_fkey FOREIGN KEY (referral_level_id) REFERENCES public.referral_levels(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: referral_hierarchy referral_hierarchy_ancestor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_hierarchy
    ADD CONSTRAINT referral_hierarchy_ancestor_id_fkey FOREIGN KEY (ancestor_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: referral_hierarchy referral_hierarchy_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_hierarchy
    ADD CONSTRAINT referral_hierarchy_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: referral_histories referral_histories_referral_milestone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_histories
    ADD CONSTRAINT referral_histories_referral_milestone_id_fkey FOREIGN KEY (referral_milestone_id) REFERENCES public.referral_milestones(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: referral_histories referral_histories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.referral_histories
    ADD CONSTRAINT referral_histories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role_wise_menu_and_permissions role_wise_menu_and_permissions_menu_and_permission_setup_i_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.role_wise_menu_and_permissions
    ADD CONSTRAINT role_wise_menu_and_permissions_menu_and_permission_setup_i_fkey FOREIGN KEY (menu_and_permission_setup_id) REFERENCES public.menu_and_permission_setups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role_wise_menu_and_permissions role_wise_menu_and_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.role_wise_menu_and_permissions
    ADD CONSTRAINT role_wise_menu_and_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: role_wise_menu_and_permissions role_wise_menu_and_permissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.role_wise_menu_and_permissions
    ADD CONSTRAINT role_wise_menu_and_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: staking_adjustments staking_adjustments_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.staking_adjustments
    ADD CONSTRAINT staking_adjustments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: staking_adjustments staking_adjustments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.staking_adjustments
    ADD CONSTRAINT staking_adjustments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: staking_adjustments staking_adjustments_user_staking_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.staking_adjustments
    ADD CONSTRAINT staking_adjustments_user_staking_package_id_fkey FOREIGN KEY (user_staking_package_id) REFERENCES public.user_staking_packages(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: states states_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ticket_messages ticket_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ticket_messages
    ADD CONSTRAINT ticket_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ticket_messages ticket_messages_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ticket_messages
    ADD CONSTRAINT ticket_messages_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tickets tickets_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tickets tickets_ticket_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_ticket_category_id_fkey FOREIGN KEY (ticket_category_id) REFERENCES public.ticket_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: transactions transactions_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.referral_levels(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_staking_adjustment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_staking_adjustment_id_fkey FOREIGN KEY (staking_adjustment_id) REFERENCES public.staking_adjustments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: transactions transactions_user_staking_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_staking_package_id_fkey FOREIGN KEY (user_staking_package_id) REFERENCES public.user_staking_packages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_withdrawal_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_withdrawal_request_id_fkey FOREIGN KEY (withdrawal_request_id) REFERENCES public.withdrawal_requests(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tutorial_categories tutorial_categories_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tutorial_categories
    ADD CONSTRAINT tutorial_categories_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tutorials tutorials_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tutorials
    ADD CONSTRAINT tutorials_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tutorials tutorials_tutorialCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tutorials
    ADD CONSTRAINT "tutorials_tutorialCategoryId_fkey" FOREIGN KEY ("tutorialCategoryId") REFERENCES public.tutorial_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_change_history_for_email_or_phone user_change_history_for_email_or_phone_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_change_history_for_email_or_phone
    ADD CONSTRAINT user_change_history_for_email_or_phone_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_profiles user_profiles_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_profiles user_profiles_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_staking_packages user_staking_packages_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_staking_packages
    ADD CONSTRAINT user_staking_packages_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_staking_packages user_staking_packages_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_staking_packages
    ADD CONSTRAINT user_staking_packages_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.staking_package_plans(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_staking_packages user_staking_packages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_staking_packages
    ADD CONSTRAINT user_staking_packages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_wallet_addresses user_wallet_addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_wallet_addresses
    ADD CONSTRAINT user_wallet_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_wallets user_wallets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_wallets
    ADD CONSTRAINT user_wallets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_deleted_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_deleted_by_fkey FOREIGN KEY (deleted_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_referrer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_referrer_id_fkey FOREIGN KEY (referrer_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: withdrawal_requests withdrawal_requests_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.withdrawal_requests
    ADD CONSTRAINT withdrawal_requests_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: withdrawal_requests withdrawal_requests_user_staking_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.withdrawal_requests
    ADD CONSTRAINT withdrawal_requests_user_staking_package_id_fkey FOREIGN KEY (user_staking_package_id) REFERENCES public.user_staking_packages(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict WcwrVLnwBAllLEdKDjuWQGUcAzklZq1YtMrawaofsFlhWctnfE3ua48LGISQMHL

