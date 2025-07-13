// components/Card.tsx
type Props = {
    id: number;
    name: string;
    value: string;
};

export default function Card({ name, value, id }: Props) {
    return (
        <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-sm text-gray-500">{id}</h3>
            <p className="text-2xl font-bold">{name}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
