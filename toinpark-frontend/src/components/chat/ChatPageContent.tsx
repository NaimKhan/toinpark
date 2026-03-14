"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetATicketQuery,
  useReplayATicketMutation,
} from "@/store/api/tickets/tickets-api";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetLoggedInUser } from "@/hooks/feature/useGetLoggedInUser";
import RenderData from "@/components/feature/loader/RenderData";
import { TMessage, TicketStatus } from "@/store/api/tickets/tickets.types";
import { TString } from "@/store/api/common-api-types";
import { Badge } from "@/components/ui/badge";
import {
  getTicketPriorityColor,
  getTicketStatusColor,
} from "@/lib/status-colors/ticketBadgeColor";
import {
  SendHorizontal,
  MessageSquare,
  Clock,
  Tag,
  AlertCircle,
  RefreshCw,
  Info,
  Ticket,
  User,
} from "lucide-react";
import CommonTooltip from "../feature/tooltip/CommonTooltip";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export default function ChatPageContent() {
  const formatMessageDate = (date: TString) => {
    if (!date) return "";
    const today = convertUTCToLocal({
      utcDateTime: new Date().toISOString(),
      format: "DD MMMM YYYY",
    });
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = convertUTCToLocal({
      utcDateTime: yesterdayDate.toISOString(),
      format: "DD MMMM YYYY",
    });
    const current = convertUTCToLocal({
      utcDateTime: date,
      format: "DD MMMM YYYY",
    });

    if (current === today) return "Today";
    if (current === yesterday) return "Yesterday";
    return current;
  };

  const { getUser } = useGetLoggedInUser();
  const userId = getUser?.userId;
  const userRole = getUser?.role;

  const queryStateParams = useManageSearchParams();
  const { ticketId } = queryStateParams.getAllParamValue();

  const {
    data: getTicketRes,
    refetch,
    ...getTicketApiState
  } = useGetATicketQuery({
    id: ticketId as string,
  });
  const ticketData = getTicketRes?.data;
  const ticketMessages = getTicketRes?.data?.messages ?? [];

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState("");

  const [replayATicket, { isLoading: sending }] = useReplayATicketMutation();

  const isChatDisabled =
    ticketData?.status === TicketStatus.RESOLVED ||
    ticketData?.status === TicketStatus.CLOSED;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages when API loads
  useEffect(() => {
    if (Array.isArray(ticketMessages) && ticketMessages.length) {
      setMessages(ticketMessages);
    }
  }, [ticketMessages]);

  const sendMessage = async () => {
    if (!input.trim() || !ticketId) return;

    const text = input.trim();

    const newMsg = {
      id: Date.now().toString(),
      message: text,
      sender: { id: userId, email: getUser?.email || "" },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      await replayATicket({
        id: ticketId as string,
        message: text,
      }).unwrap();
    } catch (err) {
      console.error("Replay error:", err);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[85vh] bg-background border border-border rounded-xl overflow-hidden mt-6 shadow-xl ring-1 ring-black/5">
      <RenderData
        expectedDataType="object"
        data={ticketData}
        {...getTicketApiState}
      >
        {/* Header Section */}
        <div className="p-5 md:p-6 border-b border-border bg-secondary/20">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-default-100 tracking-tight">
                {ticketData?.subject}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <CommonTooltip content="Ticket Number">
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary border border-primary/20 rounded-md px-2.5 py-0.5 text-[11px] font-bold"
                  >
                    <Ticket className="w-3 h-3 me-1.5" />
                    {ticketData?.ticketNo}
                  </Badge>
                </CommonTooltip>
                {userRole !== "Member" && (
                  <CommonTooltip content="Priority">
                    <Badge
                      className={`${getTicketPriorityColor(
                        ticketData?.priority ?? "",
                      )} border-none rounded-md px-2.5 py-0.5 text-[11px] font-semibold capitalize shadow-none`}
                    >
                      <AlertCircle className="w-3 h-3 me-1.5" />
                      {ticketData?.priority?.toLowerCase()}
                    </Badge>
                  </CommonTooltip>
                )}
                <CommonTooltip content="Status">
                  <Badge
                    className={`${getTicketStatusColor(
                      ticketData?.status ?? "",
                    )} border-none rounded-md px-2.5 py-0.5 text-[11px] font-semibold capitalize shadow-none`}
                  >
                    <Clock className="w-3 h-3 me-1.5" />
                    {ticketData?.status?.toLowerCase()}
                  </Badge>
                </CommonTooltip>
                <CommonTooltip content="Category">
                  <Badge
                    variant="secondary"
                    className="bg-muted text-default-200 border-none rounded-md px-2.5 py-0.5 text-[11px] font-semibold"
                  >
                    <Tag className="w-3 h-3 me-1.5 opacity-70" />
                    {ticketData?.category?.name}
                  </Badge>
                </CommonTooltip>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CommonTooltip content="Refresh Chat">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={getTicketApiState.isFetching}
                  className="h-9 px-3 gap-2 border-border hover:bg-muted text-default-200 rounded-lg transition-all"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      getTicketApiState.isFetching ? "animate-spin" : ""
                    }`}
                  />
                  <span className="text-xs font-semibold">Refresh</span>
                </Button>
              </CommonTooltip>
            </div>
          </div>

          {userRole === "Admin" && (
            <div className="flex gap-4 p-4 bg-muted/30 border border-border/50 rounded-xl h-full mt-6">
              <div className="mt-1">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="w-full space-y-3">
                <p className="text-[11px] font-bold text-default-300 uppercase tracking-widest opacity-70">
                  Client Information
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-2 gap-x-4">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-default-300 uppercase font-semibold">
                      Name
                    </p>
                    <p className="text-xs text-default-100 font-medium">
                      {[
                        ticketData?.creator?.firstName,
                        ticketData?.creator?.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ") || "No Name Provided"}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-default-300 uppercase font-semibold">
                      Account NO
                    </p>
                    <p className="text-xs text-default-100 font-medium">
                      {ticketData?.creator?.toinAccountNumber || "-"}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-default-300 uppercase font-semibold">
                      Email
                    </p>
                    <p className="text-xs text-default-100 font-medium truncate">
                      {ticketData?.creator?.email || "-"}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-default-300 uppercase font-semibold">
                      Phone
                    </p>
                    <p className="text-xs text-default-100 font-medium">
                      {ticketData?.creator?.phoneNumber || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto h-[55vh] md:h-[60vh] custom-scrollbar p-6 md:p-8 bg-background/50 ">
          {!messages.length ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3 opacity-40">
              <div className="p-4 bg-muted rounded-full">
                <MessageSquare className="w-10 h-10 text-default-300" />
              </div>
              <p className="text-sm font-medium text-default-300 tracking-tight">
                Waiting for messages...
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg?.sender?.id === userId;
              const prevMsg = index > 0 ? messages[index - 1] : null;
              const isSameSender = prevMsg?.sender?.id === msg?.sender?.id;

              const currentMsgDate = convertUTCToLocal({
                utcDateTime: msg.createdAt,
              });
              const prevMsgDate = prevMsg
                ? convertUTCToLocal({
                    utcDateTime: prevMsg.createdAt,
                  })
                : null;
              const showDateDivider = currentMsgDate !== prevMsgDate;

              return (
                <div key={msg.id} className="w-full">
                  {showDateDivider && (
                    <div className="flex items-center gap-4 my-8">
                      <div className="h-px flex-1 bg-border/50" />
                      <span className="text-[10px] font-bold text-default-300 uppercase tracking-[0.2em] px-3 py-1 bg-muted/50 rounded-full border border-border/50">
                        {formatMessageDate(msg.createdAt)}
                      </span>
                      <div className="h-px flex-1 bg-border/50" />
                    </div>
                  )}

                  <div
                    className={`flex ${
                      isMe ? "justify-end" : "justify-start"
                    } ${isSameSender ? "mt-1.5" : "mt-6"}`}
                  >
                    <div
                      className={`flex flex-col max-w-[85%] md:max-w-[70%] ${
                        isMe ? "items-end" : "items-start"
                      }`}
                    >
                      {!isSameSender && (
                        <div className="flex items-center gap-2 mb-1.5 px-1">
                          <span className="text-[10px] text-primary font-bold uppercase tracking-tight">
                            {isMe
                              ? "You"
                              : [msg?.sender?.firstName, msg?.sender?.lastName]
                                  .filter(Boolean)
                                  .join(" ") ||
                                msg?.sender?.email?.split("@")?.[0] ||
                                "Unknown"}
                          </span>
                        </div>
                      )}
                      <div
                        className={`relative p-3.5 md:p-4 rounded-2xl text-sm md:text-base border transition-all whitespace-pre-wrap shadow-sm
                        ${
                          isMe
                            ? "bg-secondary text-default-100/80 border-secondary rounded-tr-none font-medium"
                            : "dark:bg-[#1a1c24] border-border text-default-100/80 rounded-tl-none"
                        }
                      `}
                      >
                        {msg.message}
                      </div>

                      <div
                        className={`mt-1.5 flex items-center gap-1 px-1 text-[9px] font-semibold text-default-300 transition-opacity uppercase tracking-tighter
                         ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        {convertUTCToLocal({
                          utcDateTime: msg.createdAt,
                          format: "HH:mm",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </RenderData>

      {/* Input Section */}
      <div className="p-4 md:p-6 bg-secondary/10 border-t border-border">
        {isChatDisabled ? (
          <div className="flex items-center justify-center p-5 bg-muted/50 border border-border rounded-xl">
            <p className="text-default-300 font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-destructive" />
              Ticket Closed • Read Only Mode
            </p>
          </div>
        ) : (
          <div className="flex items-end gap-3 max-w-[1200px] mx-auto">
            <div className="flex-1 bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
              <Textarea
                placeholder="Compose message..."
                value={input}
                disabled={sending}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="w-full bg-transparent border-none focus-visible:ring-0 text-default-100 placeholder:text-default-300 min-h-[50px] max-h-[200px] py-4 px-5 resize-none custom-scrollbar text-sm md:text-base font-medium leading-relaxed"
              />
            </div>
            <Button
              onClick={sendMessage}
              disabled={sending || !input.trim()}
              className="h-[50px] px-6 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {sending ? (
                <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
              ) : (
                <>
                  <span className="hidden md:block">Send</span>
                  <SendHorizontal className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
        {!isChatDisabled && (
          <div className="mt-3 flex items-center justify-center gap-4 opacity-40">
            <p className="text-[10px] font-bold text-default-300 uppercase tracking-widest flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">
                Enter
              </kbd>{" "}
              to send
            </p>
            <div className="w-1 h-1 rounded-full bg-border" />
            <p className="text-[10px] font-bold text-default-300 uppercase tracking-widest flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">
                Shift + Enter
              </kbd>{" "}
              for new line
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
