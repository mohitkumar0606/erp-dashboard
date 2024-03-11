import useAppContext from "../../context/use-app-context";
import base_data from "../../data.json";

const InventoryCard = ({ data }) => {
    return <div className="my-2 rounded-md bg-gray-100 p-2">
        <h3 className="font-semibold flex items-center text-sm justify-between">
            {data.category}
            <i className="text-green-600 font-semibold text-xs">
                ${Number(data.totalWorth).toFixed(2)}
            </i>
        </h3>
        <p className="font-semibold text-xs text-gray-400">
            Quantity : {data.quantity}
        </p>
    </div>
}

const LowInventory = () => {
    const { data } = useAppContext();
    const inventory = [];

    base_data.categories.forEach(category => {
        const inventoryCount = data.products.filter(product => product.category === category);
        const quantity = inventoryCount.reduce((prevsum, product) => prevsum + Number(product.stock_quantity), 0);
        if (quantity <= 100) inventory.push({
            category,
            quantity,
            totalWorth: inventoryCount.reduce((prevsum, product) => prevsum + Number(product.price), 0)
        })
    });

    return (
        <div className="bg-white rounded-lg my-4 p-3 md:w-3/12">
            <span className="text-gray-400 text-sm">Low inventory categories</span>
            {inventory.map((item) => <InventoryCard key={Math.random()} data={item} />)}
        </div>
    );
};

export default LowInventory;