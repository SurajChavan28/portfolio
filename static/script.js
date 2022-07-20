const controlNav = () => {
	if ($("nav").hasClass("active")) {
		$(".content").addClass("blur");
	} else {
		$(".content").removeClass("blur");
	}
};
const langObjs = {
	cpp: `<span class="kwdend">#include</span ><span class="tag start">iostream</span><br /><br /><span class="kwd" >int </span ><span class="brck">main(){</span><br />&emsp;&emsp;<span class="special" >std</span >::<span class="special">string </span ><span class="ident">msg</span>;<br />&emsp;&emsp;<span class="ident" >msg</span > = <span class="str">"Hello User"</span>;<br />&emsp;&emsp;<span class="special" >std</span >::<span class="kwd">cout </span>&lt;&lt;<span class="ident"></span> msg</span >;<br />&emsp;&emsp;<span class="kwdend">return </span> <span class="ident">0</span>;<br /><span class="brck">}</span>`,
	html: `<span class="tag start">html</span><br />&emsp;<span class="tag start" >body</span ><br />&emsp;&emsp;<span class="tag start">h1</span> Hello User <span class="tag end">h1</span><br />&emsp;<span class="tag end" >body</span ><br /><span class="tag end">html</span>`,
	js: `<span class="brck">(</span><span class="kwd">function&nbsp;</span ><span class="special">greet</span><span class="brck">(</span ><span class="ident">user</span> <span class="brck">){</span ><br /><br />&emsp; <span class="kwd">console</span>.<span class="brck" >log(</span ><br /> &emsp;&emsp; <span class="str">"Hello " + </span ><span class="ident">user</span> <br /> &emsp;<span class="brck">)</span>;<br /> <br /><span class="brck">})(prompt(</span ><span class="str">"Name"</span><span class="brck">))</span>;`,
	c: `<span class="kwdend">#include</span ><span class="tag start">stdio.h</span><br /><br /><span class="kwd" >int </span ><span class="brck">main(){</span><br />&emsp;&emsp;<span class="special">char </span ><span class="ident">msg</span><span class="brck">[]</span> = <span class="str">"Hello User"</span>;<br />&emsp;&emsp;<span class="kwd">printf</span><span class="brck">(</span><span class="str">"%s"</span>,<span class="ident"></span> msg</span ><span class="brck">)</span>;<br />&emsp;&emsp;<span class="kwdend">return </span> <span class="ident">0</span>;<br /><span class="brck">}</span>`,
	python: `<span class="kwd">def </span> <span class="brck">greet(</span><span class="ident">user</span ><span class="brck">)</span> -> <span class="kwd">None</span>: <br /> &emsp;&emsp;<span class="brck">print(</span ><span class="str">f"Hello</span><span class="brck">{</span ><span class="ident">user</span><span class="brck">}</span ><span class="str">"</span><span class="brck">)</span> <br /> <br /> <br /> <span class="ident">name = </span> <span class="brck">input(</span><span class="str">"Name: "</span ><span class="brck">)</span> <br /> <span class="ident">name = </span> <span class="ident">name</span>.<span class="brck">strip()</span> <br /> <br /> <br /> <span class="kwdend">if</span> <span class="ident"> __name__ </span> == <span class="str">"__main__"</span>: <br /> &emsp;&emsp; <span class="brck">greet(</span><span class="ident">name</span ><span class="brck">)</span>`,
	css: `<span class="brck">.heading{</span><br />&emsp;<span class="ident" >font-size: </span ><span class="kwd">100px</span>;<br /><span class="brck">}</span>`,
};
const loadCodeSnippet = (lang) => {
	$(".code.sample").empty().html(langObjs[lang]);
};
const showAlert = (msg) => {
	$(".alert")
		.html(
			`<span class="brck">alert(</span><span class="str">"${msg}"</span><span class="brck">)</span>;`
		)
		.addClass("show");
	setTimeout(() => {
		$(".alert").removeClass("show");
	}, 3000);
};
$(document).ready(function () {
	controlNav();

	// console.log($(window).scrollTop(), window.pageYOffset);
	const langs = ["cpp", "python", "c", "js", "html", "css"];
	const addedLangs = [];
	const avatar = $("#avatar");
	$(".rel-link").click(function () {
		$(".rel-link.active").removeClass("active");
		$(this).addClass("active");
	});

	$("#nav-ctrl").click(function () {
		if ($("nav").hasClass("active")) {
			$("nav").removeClass("active");
			$(this).removeClass("active");
			$(".content").removeClass("blur");
		} else {
			$("nav").addClass("active");
			$(this).addClass("active");
			$(".content").addClass("blur");
		}
	});
	$("#push").click(function (event) {
		const inpVal = $("#lang").val().toLowerCase();
		if (event.target.tagName == "INPUT") {
			return;
		}
		if (inpVal === "") {
			showAlert("Nothing to add!");
			return;
		}
		if (!langs.includes(inpVal)) {
			showAlert("I dont know that 😅!");
			$("#lang").val("");
			return;
		}
		if (addedLangs.includes(inpVal)) {
			showAlert(inpVal + " is already added!");
			return;
		}
		$(".stack-item.top").removeClass("top");
		$(".stack").append(
			`<li class="stack-item top" data-lang="${inpVal}">${inpVal}</li>`
		);
		addedLangs.push(inpVal);
		loadCodeSnippet(inpVal);
		$("#lang").val("");
	});
	$("#pop").click(function () {
		if (addedLangs.length > 0) {
			const lastItem = addedLangs.pop();
			console.log(lastItem);
			$(".stack .stack-item").remove(".stack-item.top");
			$(".stack-item:last-child").addClass("top");
			loadCodeSnippet($(".stack-item.top").attr("data-lang"));
		} else {
			showAlert("Stack is empty!");
		}
	});

	window.addEventListener("resize", controlNav);
});
