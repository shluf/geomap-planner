import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import MissionMap from "@/components/configMissionMap";

export default function Home() {
	return (
		<main className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-4 py-8 md:py-10">
			
		<section className="flex flex-col items-center justify-center w-full h-full gap-4">
			<div className="md:hidden py-4">
				<Snippet className="max-w-xs" hideSymbol variant="flat">
					<span className="max-w-xs">
						<Code color="warning">Important</Code> Map Hidden !
					</span>
				</Snippet>
			</div>

			<MissionMap />

		</section>
		</main>
	);
}
