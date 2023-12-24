import { title } from "@/components/primitives";
import ScrollBar from "@/components/scrollBar/scrollBar";
import { Snippet } from "@nextui-org/snippet";


export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>About</h1>
			<div className="flex flex-col space-between pt-5 items-center">
			<ScrollBar />
			<div className="pt-5">
			<h2 className="pb-3">Repository Frontend</h2>
			<Snippet hideSymbol variant="flat">
              <span>
			  https://github.com/shluf/geomap-planner
              </span>
            </Snippet>
			<h2 className="pt-5 pb-3">Repository Backend</h2>
			<Snippet hideSymbol variant="flat">
              <span>
			  https://github.com/NaufalAfrizal55/Backend-Geomap-Planner
              </span>
            </Snippet>
			</div>
			</div>
		</div>
	);
}
