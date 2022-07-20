const express = require("express");
const path = require("path");
const { networkInterfaces } = require("os");
const app = express();
const port = 3001;
app.use("/static", express.static(path.resolve("./static")));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render(path.resolve("./public/index.ejs"), {
		title: "My Portfolio",
		location: "Home",
		relLinks: [
			{
				href: "/#intro",
				text: "intro ",
			},
			{
				href: "/#skills",
				text: "skills 1",
			},
			{
				href: "/#some-info",
				text: "Section 1",
			},
			{
				href: "/#some-info2",
				text: "Section 2",
			},
			{
				href: "/#some-info3",
				text: "Section 3",
			},
			{
				href: "/#some-info4",
				text: "Section 4",
			},
			{
				href: "/#some-info5",
				text: "Section 5",
			},
			{
				href: "/#some-info6",
				text: "Section 6",
			},
		],
	});
});
app.get("/work", (req, res) => {
	res.render(path.resolve("./public/work.ejs"), {
		title: "My Portfolio",
		location: "Work",
		relLinks: undefined,
	});
});
app.get("*", (req, res) => {
	res.status(404).render(path.resolve("./public/status.ejs"), {
		title: "Not Found",
		msg: `"Page Not Found!"`,
	});
});
app.listen(port, () => {
	const nets = networkInterfaces();
	const results = [];

	for (const name of Object.keys(nets)) {
		nets[name].forEach(({ family, internal, address }) => {
			if (family == "IPv4" && !internal) {
				
				results.push(address);
			}
		});
	}
	const networkAdd = results.length > 0 ? results[0] : "NA";
	const local = `http://localhost:${port}`;
	let network;
	if (networkAdd !== "NA") {
		network = `http://${networkAdd}:${port}`;
	} else {
		network = "Not Available";
	}
	console.log(local+"\n"+network)
});
