"use client";
import { CheckCircle, Clock, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ClientRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  type: "inquiry" | "complaint" | "return" | "custom_order";
  status: "pending" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  date: string;
  response?: string;
}

const mockRequests: ClientRequest[] = [
  {
    id: "REQ-001",
    clientName: "Alice Johnson",
    clientEmail: "alice@example.com",
    subject: "Custom Design Request",
    message:
      "Hi, I would like to request a custom design for a hoodie with my company logo. Can you help me with this?",
    type: "custom_order",
    status: "pending",
    priority: "high",
    date: "2024-01-15",
  },
  {
    id: "REQ-002",
    clientName: "Bob Smith",
    clientEmail: "bob@example.com",
    subject: "Size Exchange",
    message:
      "I received my order but the size is too small. Can I exchange it for a larger size?",
    type: "return",
    status: "in_progress",
    priority: "medium",
    date: "2024-01-14",
    response:
      "We can definitely help with that exchange. Please send us your order number.",
  },
  {
    id: "REQ-003",
    clientName: "Carol Davis",
    clientEmail: "carol@example.com",
    subject: "Product Inquiry",
    message:
      "Do you have any plans to restock the vintage denim jacket in XL size?",
    type: "inquiry",
    status: "resolved",
    priority: "low",
    date: "2024-01-13",
    response: "Yes, we expect to restock XL sizes by the end of this month.",
  },
  {
    id: "REQ-004",
    clientName: "David Wilson",
    clientEmail: "david@example.com",
    subject: "Quality Issue",
    message:
      "The t-shirt I received has a defect in the print. The design is blurred on one side.",
    type: "complaint",
    status: "closed",
    priority: "high",
    date: "2024-01-12",
    response:
      "We apologize for the defect. A replacement has been shipped and should arrive in 2-3 days.",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "in_progress":
      return <MessageSquare className="h-4 w-4" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4" />;
    case "closed":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-500";
    case "in_progress":
      return "bg-blue-500";
    case "resolved":
      return "bg-green-500";
    case "closed":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "inquiry":
      return "bg-blue-100 text-blue-800";
    case "complaint":
      return "bg-red-100 text-red-800";
    case "return":
      return "bg-orange-100 text-orange-800";
    case "custom_order":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function ClientRequest() {
  const [requests, setRequests] = useState(mockRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(
    null
  );
  const [responseText, setResponseText] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateRequestStatus = (requestId: string, newStatus: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus as
                | "pending"
                | "in_progress"
                | "resolved"
                | "closed",
            }
          : request
      )
    );
  };

  const handleSendResponse = (requestId: string) => {
    if (responseText.trim()) {
      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? { ...request, response: responseText, status: "resolved" }
            : request
        )
      );
      setResponseText("");
      setSelectedRequest(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Client Requests</h1>
        <Badge className="bg-blue-500 text-white">
          {filteredRequests.length} requests
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-orange-600">
            {requests.filter((r) => r.status === "pending").length}
          </h3>
          <p className="text-sm text-muted-foreground">Pending</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {requests.filter((r) => r.status === "in_progress").length}
          </h3>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {requests.filter((r) => r.status === "resolved").length}
          </h3>
          <p className="text-sm text-muted-foreground">Resolved</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-red-600">
            {requests.filter((r) => r.priority === "high").length}
          </h3>
          <p className="text-sm text-muted-foreground">High Priority</p>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {request.clientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{request.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.clientName} • {request.clientEmail}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge className={getTypeColor(request.type)}>
                      {request.type.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm">{request.message}</p>

                {request.response && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Your Response:</p>
                    <p className="text-sm">{request.response}</p>
                  </div>
                )}

                <div className="flex flex-col gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${getStatusColor(request.status)} text-white`}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        <span className="capitalize">
                          {request.status.replace("_", " ")}
                        </span>
                      </div>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(request.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Select
                      value={request.status}
                      onValueChange={(value) =>
                        updateRequestStatus(request.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    {request.status !== "resolved" &&
                      request.status !== "closed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setResponseText(request.response || "");
                          }}
                        >
                          Respond
                        </Button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Response Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 space-y-4">
            <h3 className="font-semibold">
              Respond to: {selectedRequest.subject}
            </h3>
            <Textarea
              placeholder="Type your response..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedRequest(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSendResponse(selectedRequest.id)}
                className="flex-1"
              >
                Send Response
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
