import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import {Button} from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Divider} from "@nextui-org/divider";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card"
import MapView from "../components/map"
import MissionList from "@/components/mission/config-mission";
import ExportButton from "@/components/map/exportButton";

export default function Home() {
	return (
		<main className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-4 py-8 md:py-10">
			
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 pr-4">
			<div className="md:hidden py-4">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						<Code color="warning">Important</Code> Please, switch to desktop mode to open the map 
					</span>
				</Snippet>
			</div>
			<Card className="p-3 flex item-center justify-center">
			<div className="flex justify-center gap-3">
			<ExportButton />
			<Button variant="ghost" color="danger">Delete</Button>
			</div>
			<Divider className="mt-3" />
			<div className="mt-5">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						List of all Mission :
					</span>
				</Snippet>
			</div>
			</Card>
			{/* <Divider className="w-1/2" /> */}
			<MissionList />

		</section>
			{/* <Divider className="my-4 border-2 border-solid h-3/4 border-rose-600" orientation="vertical" /> */}
		<MapView />
		</main>
	);
}
