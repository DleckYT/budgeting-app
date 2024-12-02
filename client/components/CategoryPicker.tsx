import { CategorySelection } from "./Transactions";

interface Props{
  categories: Map<number, CategorySelection> | null,
  setCategorySelection: React.Dispatch<React.SetStateAction<Map<number, CategorySelection> | null>>
}

export default function CategoryPicker(props: Props){
  if (!props.categories)
    return ""

  const handleClick = (mapId: number) =>{
    props.setCategorySelection(prev => {
      return new Map(Array.from(prev!, ([id, cat]) =>{
        return [
          id,
          {
            name: cat.name,
            selected: id === mapId ? !cat.selected : cat.selected
          }
        ]
      }))
    })
  }

  return <div className="category-picker">
    <h3 className="font-bold">Select Categories</h3>
    {Array.from(props.categories, ([id, c], index) =>{
      return <div key={c.name} className="cat-item" onClick={() => handleClick(id)}>
        <input type='checkbox' className="cat-check" checked={c.selected}/>
        <div>{c.name}</div>
      </div>
    })}
  </div>
}