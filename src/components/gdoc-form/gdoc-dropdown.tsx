import { Dispatch, SetStateAction } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { StyleSheet } from "react-native"
import DropDownPicker, { DropDownPickerProps, ItemType  } from "react-native-dropdown-picker"

type Props = {
  field: ControllerRenderProps<FieldValues, string>,
  placeholder: string,
  items: ItemType<string>[],
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setItems?: Dispatch<SetStateAction<ItemType<string>[]>>
}

export function GdocDropdown({field, placeholder, items, open, setOpen, setItems}: Props) {
    return (
        <DropDownPicker placeholder={placeholder} setItems={setItems} dropDownDirection="BOTTOM"  multiple={false} items={items} open={open} setOpen={setOpen} dropDownContainerStyle={styles.dropdownOpen} listMode='SCROLLVIEW'  value={field.value} setValue={(callback) => {
            const newValue = callback(field.value)
            field.onChange(newValue)
        }}/>
    )
}

const styles = StyleSheet.create({
    dropdownOpen: {
        position: 'relative', 
        top: 0,          
        borderWidth: 1,
        borderColor: '#dfdfdf',
        marginBottom: 10
    }
})