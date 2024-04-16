import React from "react";

const Footer = () => {
	return (
		<div>
			<footer className="bg-[#111] px-4 sm:px-10 py-12 mt-32">
				<hr className="border-gray-400 my-12" />
				<div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
					<div>
						<h4 className="text-lg mb-6">About Us</h4>
						<p className="text-gray-400 mb-2">
							This is Genesis.AI, a generative AI based web-app for analyzing a website&apos;s contents and prepares analysis reports and summaries for them.
						</p>
					</div>
					<div>
						<h4 className="text-lg mb-6">Connect to us</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="https://twitter.com"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Twitter
								</a>
							</li>
							<li>
								<a
									href="https://linked.in"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Linked In
								</a>
							</li>
							<li>
								<a
									href="https://instagram.com"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Instagram
								</a>
							</li>
							<li>
								<a
									href="https://dev.to"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Dev.To
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg mb-6">Resources</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Webinars
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Ebooks
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Templates
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Tutorials
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg mb-6">About Us</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Our Story
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Mission and Values
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Team
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-600 transition-all"
								>
									Testimonials
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
