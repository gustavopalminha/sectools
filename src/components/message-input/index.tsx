import { Textarea } from "@/components/ui/textarea";

const MessageInput = (): React.JSX.Element => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6">
      <Textarea
        placeholder="Enter your secret message here..."
        name="message"
        className="min-h-[300px] resize-none text-base border-input focus-visible:ring-primary"
      />
    </div>
  );
};

export default MessageInput;
