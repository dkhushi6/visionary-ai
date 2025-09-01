import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, FileText, MessageCircle } from "lucide-react";
import CategorySidebar from "./category-sidebar";

interface ChatInterfaceProps {
  fileName: string;
  category: string;
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const ChatInterface = ({ fileName, category, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `I've successfully analyzed your document "${fileName}". I'm ready to help you extract insights specific to ${category}. What would you like to know?`,
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your question about "${inputMessage}". Based on my analysis of your ${category} document, here are the key insights I found...`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getCategoryColor = (cat: string) => {
    const colors = {
      healthcare: "healthcare",
      business: "business",
      legal: "legal",
      education: "education",
    };
    return colors[cat as keyof typeof colors] || "primary";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <h1 className="font-semibold">{fileName}</h1>
                <p className="text-sm text-muted-foreground capitalize">
                  {category} Analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-[calc(100vh-80px)]">
        {/* PDF Viewer Panel */}
        <div className="w-1/2 p-4">
          <Card className="h-full p-6 flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">PDF Viewer</h3>
              <p className="text-muted-foreground">
                PDF viewer would be embedded here
                <br />
                Showing: {fileName}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Panel - Chat + Sidebar */}
        <div className="w-1/2 p-4 flex flex-col">
          <div className="flex h-full gap-4">
            {/* Category Sidebar */}
            <div className="w-80">
              <CategorySidebar category={category} />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <Card className="flex-1 p-6 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.sender}`}
                    >
                      <div className="flex items-start gap-3">
                        {message.sender === "assistant" && (
                          <div
                            className={`w-8 h-8 rounded-full bg-${getCategoryColor(
                              category
                            )} flex items-center justify-center`}
                          >
                            <MessageCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about your document..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className={`bg-${getCategoryColor(
                      category
                    )} hover:bg-${getCategoryColor(category)}/90`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
