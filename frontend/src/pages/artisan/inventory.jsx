import Inventory from "../../components/artisan/inventory";
import ArtisanLayout from "../../components/layouts/artisan-layout";

function ArtisanInventory() {
	return (
		<ArtisanLayout>
			<div className="px-[8%]">
				<div className="flex justify-between mb-[60px]">
					<div>
                        <h1 className="text-[39px] leading-[120%]">Inventory</h1>
                        <h6>Powered by Bumpa</h6>
					</div>
					<button className="rounded py-3 px-4 h-fit text-base bg-default font-bold text-white w-fit">
						+ Add Item
					</button>
				</div>
				<div className="flex-1 p-6">
					<Inventory />
				</div>
			</div>
		</ArtisanLayout>
	);
}

export default ArtisanInventory;
