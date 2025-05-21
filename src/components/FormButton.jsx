export const FormButton = ({type="button", text, clickFunction})=> {
    return (
        <div className={"flex align-middle justify-center items-center mb-4"}>
            <button type={type} className={"text-white bg-blue-500 px-4 py-2 rounded-md hover:text-white/80 transition"} onClick={clickFunction}>{text}</button>
        </div>
    )
}