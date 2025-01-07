import Editor from "@/components/editor";
import Options from "@/components/delete";
import Form from "@/components/add-message";

const Home = () => {
  return (
    <>
      <Form>
        <Editor
          params={{
            readOnly: false,
          }}
        />
        <Options />
      </Form>
    </>
  );
};

export default Home;
