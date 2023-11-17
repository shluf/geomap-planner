import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Divider} from "@nextui-org/divider";
import MapView from "../components/map"
import MissionList from "@/components/mission/config-mission";

export default function Home() {
	return (
		<main className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-4 py-8 md:py-10">
			
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 pr-4">
			<div className="md:hidden py-4">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						<Code color="danger">Important</Code> Please, change to desktop mode for open the map 
					</span>
				</Snippet>
			</div>
			<div className="flex gap-3">
				<Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Create New Mission
				</Link>
			</div>
			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						List of all Mission :
					</span>
				</Snippet>
			</div>
			<Divider className="w-1/2" />
			<MissionList />

		</section>
			{/* <Divider className="my-4 border-2 border-solid h-3/4 border-rose-600" orientation="vertical" /> */}
		<MapView />
		</main>
	);
}
