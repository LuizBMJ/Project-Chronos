

type DefaultInputProps = {
    id: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ type, id }: DefaultInputProps) {
    return (
        <>
            <label htmlFor={id}>Task</label>
            <input id={id} type={type} />
        </>
    );
}
