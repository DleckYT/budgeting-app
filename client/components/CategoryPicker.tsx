import { CategorySelection } from "./Transactions";

interface Props{
  categories: Array<CategorySelection> | null,
  setCategorySelection: React.Dispatch<React.SetStateAction<CategorySelection[] | null>>
}

export default function CategoryPicker(props: Props){
  if (!props.categories)
    return ""

  return <div className="category-picker">
    Pick Categories
  </div>
}