import { Button } from "@/components/ui/button";
import Form from "@/components/add-message";
import MessageInput from "@/components/message-input";
import DeleteOptions from "@/components/delete-options";

const Home = (): React.JSX.Element => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <Form>
        <div className="space-y-6">
          <MessageInput />
          <DeleteOptions />
          <div className="flex justify-center pt-4">
            <Button type="submit" size="lg" className="px-12 text-base font-medium">
              Create
            </Button>
          </div>
        </div>
      </Form>
    </main>
  );
};

export default Home;
