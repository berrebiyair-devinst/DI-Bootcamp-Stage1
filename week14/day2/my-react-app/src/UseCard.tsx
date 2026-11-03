

interface UseCardProps {
    name:string;
    age:number;
    role:string;
}

const UseCard: React.FC<UseCardProps>= ({name,age,role}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <p>Role: {role}</p>
        </div>
    );
}

export default UseCard;
