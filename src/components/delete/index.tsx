const Options = () => {
  return (
    <section>
      <h2 className="text-xl font-bold pt-2 pb-2">Delete Options:</h2>
      <p className="text-xs font-bold pb-2">
        After the first condition bellow is meet, the message will be deleted.
      </p>
      <table>
        <tbody>
          <tr>
            <td className="w-[6rem] leading-8">
              <input type="checkbox" className="pr-2" name="deleteNext"></input>
            </td>
            <td>
              <p className="pl-2">After first visit?</p>
            </td>
          </tr>
          <tr>
            <td className="w-[6rem] leading-8">
              <input
                type="number"
                name="minutes"
                defaultValue={5}
                className="w-full h-5"
                min={1}
                max={1440}
              ></input>
            </td>
            <td>
              <p className="pl-2"> Minutes to expire</p>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Options;
