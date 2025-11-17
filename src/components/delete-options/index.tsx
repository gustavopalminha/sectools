import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DeleteOptions = (): React.JSX.Element => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Delete Options:
          </h2>
          <p className="text-sm text-muted-foreground">
            After the first condition bellow is meet, the message will be deleted.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-3">
            <Checkbox id="deleteNext" name="deleteNext" />
            <Label htmlFor="deleteNext" className="text-base font-normal cursor-pointer">
              After first visit?
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Input
              type="number"
              name="minutes"
              defaultValue="5"
              className="w-20 text-center"
              min="1"
            />
            <Label className="text-base font-normal">Minutes to expire</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOptions;
