const { networkInterfaces } = require("os");

const nets = networkInterfaces();
	const results = [];

	for (const name of Object.keys(nets)) {
		nets[name].forEach(({ family, internal, address }) => {
			if (family == "IPv4" && !internal) {
				
				results.push(address);
			}
		});
	}
    console.log(results);
	const networkAdd = results.length > 0 ? results[0] : "NA";
	const local = `http://localhost:${port}`;
	let network;
	if (networkAdd !== "NA") {
		network = `http://${networkAdd}:${port}`;
	} else {
		network = "Not Available";
	}