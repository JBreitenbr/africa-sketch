const Dropdown1=({dim,dimArr,dimDict,handleChange1})=>{
  return(<select id="selectButton1" value={dim} onChange={handleChange1}>
  {dimArr.map(function(item) {
      return (
        <option value={item} key={item}>
          {dimDict[item]}
        </option>
      )
    })}
</select>
)
}

export default Dropdown1;