const path = require("node:path");
const sass = require("sass");
const YAML = require("yaml");
const markdownIt = require("markdown-it");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");


module.exports = async function(eleventyConfig) {
	// Configure Eleventy


	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("files");
	eleventyConfig.addTemplateFormats("scss")

	eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["auto"],

		// output image widths
		widths: ["auto", 400, 800],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
	});

	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});


	let options = {
		html: true,
		breaks: false,
		linkify: true,
	};
	eleventyConfig.setLibrary("md", markdownIt(options));




};
