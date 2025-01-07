import { EditorProps } from "./index.types";

const Editor = ({ params }: EditorProps) => {
  const { readOnly, text } = params;

  return (
    <textarea
      className="w-full min-h-[65vh] resize-none p-2"
      defaultValue={readOnly ? text : `Your message goes here...`}
      disabled={readOnly}
      readOnly={readOnly}
      name="message"
    ></textarea>
  );
};

export default Editor;
