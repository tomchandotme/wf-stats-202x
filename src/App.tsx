import { getCombinedWarframeUsage } from "./utils/dataLoader";

function App() {
	const data = getCombinedWarframeUsage();
	return (
		<div>
			<code className="whitespace-pre">{JSON.stringify(data, null, 2)}</code>
		</div>
	);
}

export default App;
