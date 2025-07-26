import { FormControl } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";

export default function SelectForm({
  field,
  list,
}: Readonly<{
  field: { onChange: (value: string) => void; value: string };
  list: string[];
}>) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder='Select job type' />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {list.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
