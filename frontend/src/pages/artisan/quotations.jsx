import Quotations from "../../components/artisan/quotations";
import ArtisanLayout from "../../components/layouts/artisan-layout";

function ArtisanQuotations() {
	return (
		<ArtisanLayout>
			<div className="px-[8%]">
				<div className="flex justify-between mb-[60px]">
					<h1 className="text-[39px] leading-[120%]">Quotations</h1>
					<button className="rounded py-3 px-4 h-fit text-base bg-default font-bold text-white w-fit">+ Generate Quote</button>
				</div>
				<div className="flex-1 p-6">
					<Quotations />
				</div>
			</div>
		</ArtisanLayout>
	);
}

export default ArtisanQuotations;
