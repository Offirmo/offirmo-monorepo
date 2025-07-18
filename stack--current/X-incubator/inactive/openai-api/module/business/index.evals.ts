import OpenAI from 'openai'

// https://docs.evalkit.ai/introduction
import { evaluate, BiasDetectionMetric } from '@evalkit/core';

import { expect } from 'chai'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

import {
	type ExtractStructureInput,
	extract_categories,
	type ExtractedStructure,

	type FilterAndImproveInput,
	filter_and_improve_content,
} from './index.ts'

/////////////////////////////////////////////////

describe(`EVALS`, function() {
	const client = new OpenAI({
		apiKey: process.env.OAIAK,
		logLevel: 'debug',
	});


	describe('example 1', function () {
		const RAW_TEXT_1 = `Our new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST. New hires will receive an email with their login credentials for the HR portal and our internal collaboration tool, Slack, 48 hours prior to their start date. It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments. We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture. Benefits enrollment, including health insurance and 401k, must be completed by the end of their first week. For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555. They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.`

		describe('extract_categories()', function () {
			const INPUT: ExtractStructureInput = {
				texts: [
					RAW_TEXT_1,
				]
			}

			const API_RESPONSE_1 = {
				"id": "resp_6847a838922c819cbb3e1abb797991630fbfe926aa6c1d1f",
				"object": "response",
				"created_at": 1749526584,
				"status": "completed",
				"background": false,
				"error": null,
				"incomplete_details": null,
				"instructions": null,
				"max_output_tokens": null,
				"model": "gpt-4o-mini-2024-07-18",
				"output": [
					{
						"id": "msg_6847a8390edc819c8b41dbad3c53ca0b0fbfe926aa6c1d1f",
						"type": "message",
						"status": "completed",
						"content": [
							{
								"type": "output_text",
								"annotations": [],
								"text": "~#BEGIN#~\nOur new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST. New hires will receive an email with their login credentials for the HR portal and our internal collaboration tool, Slack, 48 hours prior to their start date. It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments. We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week. For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555. They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.\n~#END#~"
							}
						],
						"role": "assistant"
					}
				],
				"parallel_tool_calls": true,
				"previous_response_id": null,
				"reasoning": {
					"effort": null,
					"summary": null
				},
				"service_tier": "default",
				"store": true,
				"temperature": 1,
				"text": {
					"format": {
						"type": "text"
					}
				},
				"tool_choice": "auto",
				"tools": [],
				"top_p": 1,
				"truncation": "disabled",
				"usage": {
					"input_tokens": 652,
					"input_tokens_details": {
						"cached_tokens": 0
					},
					"output_tokens": 223,
					"output_tokens_details": {
						"reasoning_tokens": 0
					},
					"total_tokens": 875
				},
				"user": null,
				"metadata": {},
				"output_text": "~#BEGIN#~\nOur new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST. New hires will receive an email with their login credentials for the HR portal and our internal collaboration tool, Slack, 48 hours prior to their start date. It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments. We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week. For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555. They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.\n~#END#~"
			}
			const API_RESPONSE_2 = {
				"id": "resp_6847ac9904d481929e5425fc2fd07951071c9f0644fc6d55",
				"object": "response",
				"created_at": 1749527705,
				"status": "completed",
				"background": false,
				"error": null,
				"incomplete_details": null,
				"instructions": null,
				"max_output_tokens": null,
				"model": "gpt-4o-mini-2024-07-18",
				"output": [
					{
						"id": "msg_6847aca5546c8192a0a11f68ced12c47071c9f0644fc6d55",
						"type": "message",
						"status": "completed",
						"content": [
							{
								"type": "output_text",
								"annotations": [],
								"text": "{\"categories\":[{\"title\":\"Onboarding Process\",\"subtitle\":\"Step-by-step outline of getting started at the company.\",\"excerpt\":\"Our new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST.\"},{\"title\":\"Orientation and Training\",\"subtitle\":\"Essential training details for new hires post-orientation.\",\"excerpt\":\"After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments.\"},{\"title\":\"Administrative Tasks\",\"subtitle\":\"Key forms and enrollments new employees must complete.\",\"excerpt\":\"It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week.\"},{\"title\":\"IT Setup\",\"subtitle\":\"Important information regarding technology and support for new hires.\",\"excerpt\":\"They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.\"},{\"title\":\"Mentorship Program\",\"subtitle\":\"Support system to help new employees acclimate to the workplace.\",\"excerpt\":\"We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture.\"},{\"title\":\"IT Support\",\"subtitle\":\"Contact details for immediate technical assistance.\",\"excerpt\":\"For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555.\"}]}",
								"parsed": {
									"categories": [
										{
											"title": "Onboarding Process",
											"subtitle": "Step-by-step outline of getting started at the company.",
											"excerpt": "Our new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST."
										},
										{
											"title": "Orientation and Training",
											"subtitle": "Essential training details for new hires post-orientation.",
											"excerpt": "After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments."
										},
										{
											"title": "Administrative Tasks",
											"subtitle": "Key forms and enrollments new employees must complete.",
											"excerpt": "It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week."
										},
										{
											"title": "IT Setup",
											"subtitle": "Important information regarding technology and support for new hires.",
											"excerpt": "They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey."
										},
										{
											"title": "Mentorship Program",
											"subtitle": "Support system to help new employees acclimate to the workplace.",
											"excerpt": "We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture."
										},
										{
											"title": "IT Support",
											"subtitle": "Contact details for immediate technical assistance.",
											"excerpt": "For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555."
										}
									]
								}
							}
						],
						"role": "assistant"
					}
				],
				"parallel_tool_calls": true,
				"previous_response_id": null,
				"reasoning": {
					"effort": null,
					"summary": null
				},
				"service_tier": "default",
				"store": true,
				"temperature": 1,
				"text": {
					"format": {
						"type": "json_schema",
						"description": null,
						"name": "result",
						"schema": {
							"type": "object",
							"properties": {
								"categories": {
									"type": "array",
									"items": {
										"type": "object",
										"properties": {
											"title": {
												"type": "string"
											},
											"subtitle": {
												"type": "string"
											},
											"excerpt": {
												"type": "string"
											}
										},
										"required": [
											"title",
											"subtitle",
											"excerpt"
										],
										"additionalProperties": false
									}
								}
							},
							"required": [
								"categories"
							],
							"additionalProperties": false
						},
						"strict": true
					}
				},
				"tool_choice": "auto",
				"tools": [],
				"top_p": 1,
				"truncation": "disabled",
				"usage": {
					"input_tokens": 590,
					"input_tokens_details": {
						"cached_tokens": 0
					},
					"output_tokens": 310,
					"output_tokens_details": {
						"reasoning_tokens": 0
					},
					"total_tokens": 900
				},
				"user": null,
				"metadata": {},
				"output_text": "{\"categories\":[{\"title\":\"Onboarding Process\",\"subtitle\":\"Step-by-step outline of getting started at the company.\",\"excerpt\":\"Our new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST.\"},{\"title\":\"Orientation and Training\",\"subtitle\":\"Essential training details for new hires post-orientation.\",\"excerpt\":\"After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments.\"},{\"title\":\"Administrative Tasks\",\"subtitle\":\"Key forms and enrollments new employees must complete.\",\"excerpt\":\"It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week.\"},{\"title\":\"IT Setup\",\"subtitle\":\"Important information regarding technology and support for new hires.\",\"excerpt\":\"They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.\"},{\"title\":\"Mentorship Program\",\"subtitle\":\"Support system to help new employees acclimate to the workplace.\",\"excerpt\":\"We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture.\"},{\"title\":\"IT Support\",\"subtitle\":\"Contact details for immediate technical assistance.\",\"excerpt\":\"For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555.\"}]}",
				"output_parsed": {
					"categories": [
						{
							"title": "Onboarding Process",
							"subtitle": "Step-by-step outline of getting started at the company.",
							"excerpt": "Our new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST."
						},
						{
							"title": "Orientation and Training",
							"subtitle": "Essential training details for new hires post-orientation.",
							"excerpt": "After orientation, each new hire will be introduced to their team lead who will guide them through specific departmental training and project assignments."
						},
						{
							"title": "Administrative Tasks",
							"subtitle": "Key forms and enrollments new employees must complete.",
							"excerpt": "It's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week."
						},
						{
							"title": "IT Setup",
							"subtitle": "Important information regarding technology and support for new hires.",
							"excerpt": "They will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey."
						},
						{
							"title": "Mentorship Program",
							"subtitle": "Support system to help new employees acclimate to the workplace.",
							"excerpt": "We also offer a mentorship program where new employees are paired with experienced colleagues for the first six months to help them settle in and understand our company culture."
						},
						{
							"title": "IT Support",
							"subtitle": "Contact details for immediate technical assistance.",
							"excerpt": "For IT support, new employees should contact helpdesk@ourcompany.com or call extension 5555."
						}
					]
				}
			}

			let extraction_result: ExtractedStructure = (undefined as any)

			it('should work', async () => {
				const result = await extract_categories(client, INPUT, [API_RESPONSE_1, API_RESPONSE_2])

				expect(result.raw_cleaned.length).to.be.within(RAW_TEXT_1.length * 0.8, RAW_TEXT_1.length * 1.2)
				expect(result.categories.length).to.be.within(2, 10)

				extraction_result = result
			})

			describe('chained -> ', function () {
				const API_RESPONSE_1 = {
					"id": "resp_6847b6aa96a0819ebe5e80445f5ac0f605ce4bc93c9610f2",
					"object": "response",
					"created_at": 1749530282,
					"status": "completed",
					"background": false,
					"error": null,
					"incomplete_details": null,
					"instructions": null,
					"max_output_tokens": null,
					"model": "gpt-4o-mini-2024-07-18",
					"output": [
						{
							"id": "msg_6847b6ab01e4819ead22e761d06a209a05ce4bc93c9610f2",
							"type": "message",
							"status": "completed",
							"content": [
								{
									"type": "output_text",
									"annotations": [],
									"text": "~#BEGIN#~\nIt's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week.\n~#END#~"
								}
							],
							"role": "assistant"
						}
					],
					"parallel_tool_calls": true,
					"previous_response_id": null,
					"reasoning": {
						"effort": null,
						"summary": null
					},
					"service_tier": "default",
					"store": true,
					"temperature": 1,
					"text": {
						"format": {
							"type": "text"
						}
					},
					"tool_choice": "auto",
					"tools": [],
					"top_p": 1,
					"truncation": "disabled",
					"usage": {
						"input_tokens": 465,
						"input_tokens_details": {
							"cached_tokens": 0
						},
						"output_tokens": 55,
						"output_tokens_details": {
							"reasoning_tokens": 0
						},
						"total_tokens": 520
					},
					"user": null,
					"metadata": {},
					"output_text": "~#BEGIN#~\nIt's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. Benefits enrollment, including health insurance and 401(k), must be completed by the end of their first week.\n~#END#~"
				}
				const API_RESPONSE_2 = {
					"id": "resp_6847b6c12da881a196d5d4a3985486aa0a71ea574758e7b7",
					"object": "response",
					"created_at": 1749530305,
					"status": "completed",
					"background": false,
					"error": null,
					"incomplete_details": null,
					"instructions": null,
					"max_output_tokens": null,
					"model": "gpt-4o-mini-2024-07-18",
					"output": [
						{
							"id": "msg_6847b6c19b4c81a1bffe1899e0cbcb7c0a71ea574758e7b7",
							"type": "message",
							"status": "completed",
							"content": [
								{
									"type": "output_text",
									"annotations": [],
									"text": "# Important Onboarding Steps\n\nTo ensure a smooth onboarding process, please follow these key steps:\n\n1. **Tax Forms and Direct Deposit**  \n   Complete your tax forms and set up direct deposit in the HR portal within the first three days of your onboarding.\n\n2. **Benefits Enrollment**  \n   Enroll in your benefits, including health insurance and 401(k), by the end of your first week.\n\nMake sure to adhere to these deadlines for a seamless start to your journey with us!"
								}
							],
							"role": "assistant"
						}
					],
					"parallel_tool_calls": true,
					"previous_response_id": null,
					"reasoning": {
						"effort": null,
						"summary": null
					},
					"service_tier": "default",
					"store": true,
					"temperature": 1,
					"text": {
						"format": {
							"type": "text"
						}
					},
					"tool_choice": "auto",
					"tools": [],
					"top_p": 1,
					"truncation": "disabled",
					"usage": {
						"input_tokens": 245,
						"input_tokens_details": {
							"cached_tokens": 0
						},
						"output_tokens": 100,
						"output_tokens_details": {
							"reasoning_tokens": 0
						},
						"total_tokens": 345
					},
					"user": null,
					"metadata": {},
					"output_text": "# Important Onboarding Steps\n\nTo ensure a smooth onboarding process, please follow these key steps:\n\n1. **Tax Forms and Direct Deposit**  \n   Complete your tax forms and set up direct deposit in the HR portal within the first three days of your onboarding.\n\n2. **Benefits Enrollment**  \n   Enroll in your benefits, including health insurance and 401(k), by the end of your first week.\n\nMake sure to adhere to these deadlines for a seamless start to your journey with us!"
				}

				it('should work', async () => {
					const INPUT: FilterAndImproveInput = {
						raw_kb_content: extraction_result.raw_cleaned,

						topic: extraction_result.categories[2]!.title,
						topic_details: extraction_result.categories[2]!.subtitle,
					}

					const result = await filter_and_improve_content(client, INPUT, [API_RESPONSE_1, API_RESPONSE_2])

					expect(result.title).to.equal(INPUT.topic)
					expect(result.subtitle).to.equal(INPUT.topic_details)
					expect(result._original_content_for_review.length, 'filtered original content').to.be.within(RAW_TEXT_1.length * 0.1, RAW_TEXT_1.length * 0.6)

					// TODO improve comparison
					expect(result.content.length, 'final improved content').to.be.within(result._original_content_for_review.length * 0.5, result._original_content_for_review.length * 3)
				})
			})
		})
	})

	describe('example 2', function () {
		const some_file = path.join(__dirname, '../evals/Code_of_Business_Conduct_and_Ethics.md')
		const RAW_TEXT_1 = fs.readFileSync(some_file, 'utf8')

		describe('extract_categories()', function () {
			const INPUT: ExtractStructureInput = {
				texts: [
					RAW_TEXT_1,
				]
			}

			const API_RESPONSE_1 = {
				"id": "resp_6847b810ab5c819e86312efab98169d60e998410da569db1",
				"object": "response",
				"created_at": 1749530640,
				"status": "completed",
				"background": false,
				"error": null,
				"incomplete_details": null,
				"instructions": null,
				"max_output_tokens": null,
				"model": "gpt-4o-mini-2024-07-18",
				"output": [
					{
						"id": "msg_6847b8115f9c819e9e361a9cdcaf1aa40e998410da569db1",
						"type": "message",
						"status": "completed",
						"content": [
							{
								"type": "output_text",
								"annotations": [],
								"text": "~#BEGIN#~\n## Code of Business Conduct & Ethics\n\nAtlassian's mission is to unleash the potential of every team, and we must act with integrity to achieve it. Each of us is responsible for behaving ethically, honestly, and respectfully. Each of us has a part to play for our employees, directors, officers, agents, partners, representatives, contractors, and consultants. Our unique values describe what we stand for at the most fundamental level. They shape our culture and influence who we are, what we do, and even who we hire. They’re hard-wired into our DNA and will stay the same as we continue to grow. Our values are reflected in the Atlassian Code of Business Conduct and Ethics. The Code guides our actions across every part of the company, from our Board of Directors to our interns. In addition to Atlassian's policies and practices, the Code addresses how to properly interact with people and organizations. We are all responsible for holding our contractors, consultants, partners, suppliers, and every Atlassian to the standards in our Code. Our future success depends on following these principles and taking them seriously. Without them, we risk creating significant liability for Atlassian and even threatening our ability to do business. So please ensure you familiarize yourselves with the Code and remember that we expect you to know and comply with the legal requirements relating to your job and the services you are providing to Atlassian. We trust and expect you to use common sense and the highest ethical standards when making business decisions—even when there is no stated guideline. Above all, we should always focus on doing the right thing. We all have a role to play.\n\nMike Cannon-Brookes & Scott Farquhar  \nCo-CEOs and Co-Founders, Atlassian  \n\nOpen company, no bullshit  \nBuild with heart and balance  \nDon’t #@!% the customer  \nPlay as a team  \nBe the change you seek  \n\n01. **PRIORITIZE ETHICS & COMPLIANCE**  \n- Reporting Possible Violations  \n- Non-Retaliation & Disciplinary Action  \n- Standards of Conduct  \n\n02. **TREAT OTHERS RESPECTFULLY**  \n- Equal Opportunity: Anti-Discrimination, Harassment, Bullying, & Retaliation  \n- Maintaining Health & Safety  \n- Drugs, Controlled Substances, & Alcohol  \n- Weapons & Violence  \n- Communications with Others  \n\n03. **ENGAGE IN ETHICAL BUSINESS PRACTICES**  \n- Free & Fair Competition  \n- No Insider Trading  \n- Anti-Bribery  \n- Dealing with Public or Government Officials  \n- Customers, Partners, & Suppliers  \n\n04. **AVOID CONFLICTS OF INTEREST**  \n- Outside Employment & Other Affiliations  \n- Serving on a Board of Directors  \n- Financial Interests in Other Businesses  \n- Personal Benefit or Gain from Business  \n- Corporate Opportunities  \n- Political Contributions  \n- Gifts & Entertainment When Dealing with Non-Governmental or Non-Public Third Parties  \n- Side Deals & Side Letters  \n\n05. **ADOPT SUSTAINABILITY**  \n- Planet - a Net-Zero Future  \n- Community - a New Approach to Corporate Philanthropy  \n- Customers - Leading with Security & Respecting Privacy  \n- People - Unleashing the Potential of Our Team  \n\n06. **PROTECT CONFIDENTIAL INFORMATION**  \n- Atlassian Confidential Information  \n- Third Party Confidential Information  \n\n07. **USE ATLASSIAN & THIRD PARTY ASSETS APPROPRIATELY**  \n- Computer & Other Equipment  \n- Use of Email & Other Forms of Electronic Communication  \n- Use of Third Party Software  \n- Other Copyrighted Materials  \n\n08. **RESPECT PRIVACY & PERSONAL INFORMATION**  \n\n09. **KEEP ACCURATE BUSINESS RECORDS**  \n- Managing & Retaining Business Records  \n- Quality of Public Disclosures  \n\n10. **COMPLY WITH GLOBAL TRADE CONTROLS**  \n- Export Controls  \n- Unsanctioned Embargoes & Anti-Boycott Rules  \n\n11. **KEEP THE APPROPRIATE TEAMS INFORMED**  \n- Media Requests  \n- Social Media  \n- Law Enforcement / Government  \n\n12. **REPORTING CONCERNS & RECEIVING ADVICE**  \n\n13. **APPENDIX**  \n- Monitoring Compliance & Disciplinary Action  \n- Exceptions & Amendments  \n- Resources, Policies, & Standards/Guidelines Referenced in Code  \n\n---\n\n**Prioritize Ethics & Compliance** 01\n\n**Prioritize Ethics & Compliance**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nThis Code applies to Atlassian employees, directors, officers, partners, representatives, contractors, and consultants. Atlassian takes compliance with applicable laws, rules, and regulations seriously. You are prohibited from engaging in any unlawful activity when conducting Atlassian business or in carrying out your day-to-day duties or services. It is your responsibility to read, understand, and acknowledge this Code (including the policies, standards, and guidelines referenced in the Code) on an annual basis or as requested by Atlassian. This Code does not change any legal or contractual obligations that you may otherwise have with Atlassian. Instead, the standards in this Code should be viewed as the minimum standards that Atlassian expects from you. Also, as a global company, Atlassian expects that you will comply with all local laws and customs of the location where you work or visit.\n\n**MANAGERS ARE ROLE MODELS**  \nManagers at all levels are responsible for being role models for ethical behavior and ensuring that employees reporting to them understand and comply with Atlassian's Code, policies, and practices. This includes making sure that they complete all required training. Here are your responsibilities as a manager:  \n- Review the Code at least annually  \n- Regularly reinforce and discuss the Code with team members  \n- Promptly seek guidance from your own manager or business partners if you have any questions  \n- Promptly report violations of the Code, policies, and practices  \n\nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n\n**Reporting Possible Violations**  \nWe rely on you to recognize potential problems and ask questions if you are ever unsure about the appropriateness of an action or occurrence. Whenever you are unsure, always ask. Be proactive if you believe this Code, any of Atlassian's policies or practices, or the law are being violated. You have an obligation to report this. But please do not conduct your own investigation. If you have a question or would like to report a violation, please read Reporting Concerns & Receiving Advice below. It explains how reports can be made.  \n\n**Non-Retaliation & Disciplinary Action**  \nYou should feel free to ask questions or make a report without fear of retaliation. We will not tolerate retaliation against anyone who reports a suspected violation in good faith or cooperates in an investigation. Anyone who engages in any form of retaliation will be subject to disciplinary action, which may include termination of employment or services. If you believe you have been subject to retaliation as a result of reporting a suspected violation in good faith, please report it immediately to the resources listed at Reporting Concerns & Receiving Advice.  \n\n**Standards of Conduct**  \nWe want to ensure that Atlassian is a place where our team can thrive. We expect you to follow basic, common-sense rules of conduct that will protect everyone’s interests. If you are found to have violated this Code or any of the policies or practices referenced in it, you will be subject to disciplinary action, up to and including termination of your employment or services.  \n\n**WHAT IF I MAKE A REPORT ABOUT A SUSPECTED VIOLATION AND I AM WRONG?**  \nIf you made the report in good faith and believe that the information provided is accurate, you will not be subject to disciplinary action. You do not need to be right—but you do need to believe that the information you are providing is truthful.\n\n---\n\n**Treat Others Respectfully** 02\n\n**Treat Others Respectfully**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nConsistent with our values, we strive to create an environment that is open, supportive, and safe. Respect for others should always be prioritized in your  in-person and online interactions with others, whether they be colleagues, partners, suppliers, customers, or the general public.  \n\n**Equal Opportunity: Anti-Discrimination, Harassment, Bullying, & Retaliation**  \nAtlassian's Play, as a Team value demands that we treat each other with respect, dignity, and professionalism. We care about our community, and we’re counting on you to help ensure a safe and comfortable environment for all Atlassians, which is made up of individuals with diverse beliefs and viewpoints. Every Atlassian has the right to work in an environment that is respectful, professional, and free from all forms of discrimination, harassment, bullying, and retaliation. Atlassian expects that all interactions among Atlassians, either in person or over digital spaces, will be business-like and free of bias, prejudice, and harassment. The same is required when Atlassians interact with our community, customers, and partners. We will not tolerate discrimination against or harassment of employees, consultants, contractors, or customers based on any characteristic protected by law, such as age, gender, gender identity, sexual orientation, race, national origin, citizenship, or disability. You can find more information at Policy - Equal Employment Opportunity: Anti-Discrimination, Harassment, Bullying, and Retaliation. If you witness or experience discrimination, harassment, bullying, or retaliation, please report it immediately to any of the available resources listed in the Policy - Grievance. The channels described in Policy - Grievance are appropriate for submitting matters concerning unfair treatment in an Atlassian work environment that causes undue concern, distress, or a feeling of injustice.\n\n**Maintaining Health & Safety**  \nAtlassian is committed to maintaining a healthy, safe, and productive workplace. This requires your continuous cooperation. If you have any health or safety concerns, you should immediately contact your manager and Workplace Experience Team. If a work-related injury occurs, please immediately notify your manager, your HR People Partner, and the Benefits Team. Find more information on how to make these reports at Policy - Workplace Health and Safety.\n\n**Drugs, Controlled Substances, & Alcohol**  \nBeing under the influence of a drug or alcohol while on company premises or while conducting company business may interfere with a safe and healthy work environment and may pose serious risks to the user and to those around them. We expect you to act responsibly when it comes to consuming alcohol. You represent Atlassian—whether in the office, at an after-hours work activity, an offsite, or Atlassian-sponsored event. Never drink to the point of impairment or in a way that may lead to inappropriate behavior or endanger the safety of others. Regardless, always follow the local laws of your location. Atlassian has a zero-tolerance policy against illegal drugs. Employees are not allowed to possess, trade, or use illegal drugs or report to work under the influence of illegal drugs. Please read Atlassian's Policy - Alcohol and Drug Use for more information.\n\n**Weapons & Violence**  \nAtlassian is committed to a violence-free work environment. We do not tolerate any level of violence or the threat of violence in the workplace. Under no circumstances should you bring a weapon to work, a customer site, or any other offsite location where Atlassian business is conducted. In case of potential violence or danger, immediately contact local law enforcement and report it to your manager and your local HR People Partner.\n\n**Communications with Others**  \nOur values and our products encourage open communication. However, we must all be cognizant of how our communications are received and interpreted within and outside of Atlassian and our responsibilities listed in Policy - Equal Employment Opportunity: Anti-Discrimination, Harassment, Bullying, and Retaliation. When you post on social media, whether through an official Atlassian account or not, please first read the Atlassian Social Media Guidelines. When it comes to our internal communications, check out the Global - Community Guidelines.\n\n---\n\n**Engage in Ethical Business Practices** 03\n\n**Engage in Ethical Business Practices**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n\n**Free & Fair Competition**  \nCompeting vigorously, yet lawfully, with competitors and establishing advantageous, but fair, business relationships with customers and suppliers is a part of the foundation for Atlassian's long-term success. On the other hand, unlawful and unethical conduct, which may lead to short-term gains, may damage Atlassian's reputation and long-term business prospects. You must deal ethically and lawfully with the company’s customers, suppliers, competitors, and employees in all business dealings on the company’s behalf. You should not take unfair advantage of another person through the abuse of privileged or confidential information or through improper manipulation, concealment, or misrepresentation of material facts.\n\n**No Insider Trading**  \nIf you learn of any material nonpublic information about Atlassian or a company with which Atlassian does business (for example, a customer, supplier, or other parties with which Atlassian is negotiating a major transaction, such as an acquisition, investment, or sale), you may not trade in Atlassian's securities or that other party’s securities until the information becomes public or is no longer material. In simple terms, material nonpublic information is any type of information that could reasonably be expected to affect the market price of Atlassian's securities or a third party’s securities, as the case may be, that has not been disseminated in a manner making it available to investors generally. Trading stock or encouraging others to trade stock on the basis of material nonpublic information—regardless of how small or large the trade—may constitute insider trading, insider dealing, or stock tipping and constitute a criminal offense in most countries where we do business. Like many public companies, Atlassian has adopted specific trading restrictions to guard against insider trading. Do not confuse these trading restrictions with the broader prohibition on trading when in possession of material nonpublic information. In other words, the company’s “trading window” may be open but you may nonetheless be in possession of material nonpublic information that makes it inappropriate to trade. For more information, please read Policy - Insider Trading and Disclosure.\n\n**Anti-Bribery**  \nWe are committed to complying with all anti-bribery laws, including the United States Foreign Corrupt Practices Act (FCPA) and the United Kingdom Bribery Act. Any form of bribery, direct or indirect, is strictly prohibited. That means you must not offer a bribe to, or accept one from, any person, at any time, for any reason. Any third party, supplier, contractor, consultant, agent, or intermediary acting on Atlassian's behalf is also prohibited from offering, giving, or accepting bribes. You have a continuing and independent obligation to ensure compliance with these laws and Atlassian's Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption. Cultural \"norms\" are never an excuse to make a bribe. Failure to comply with the FCPA, the Bribery Act, and other similar anti-corruption laws may result in civil and/or criminal fines and penalties to Atlassian, as well as significant harm to the company's reputation. It may also result in civil and criminal penalties being imposed against any company personnel, agents, and business partners involved. Your non-compliance with the Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption will result in disciplinary action being taken, up to and including termination of employment or services.\n\n**Dealing with Public or Government Officials**  \nWhen Atlassian does business with any government entity, state-owned enterprise, or public international organization on a country, state, or local level, we must abide by all applicable laws and regulations related to these types of transactions. In dealing with public sector customers in the United States or other countries, you are required to understand the special rules that may apply. Please read Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption for more information on what is appropriate. If you seek an exception to this rule (the approval of which will be rare), please see the Compliance Officer (Atlassian has designated its Deputy General Counsel - Corporate as its Compliance Officer for the purposes of this Code). Never provide a gift, including meals, entertainment, or other items of value, to a government official.\n\n**Customers, Partners, & Suppliers**  \nWe expect that our customers, partners, suppliers, and other third parties (we call them \"business partners\" in this section) will comply with all laws and act ethically in all respects. In light of that, when you engage any business partners, consider how they align with our values and conduct their businesses. Select good business partners. Who we do business with directly impacts our reputation and may have legal and business implications.\n\n---\n\n**Avoid Conflicts of Interest** 04\n\n**Avoid Conflicts of Interest**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n\nAtlassian recognizes and respects that you have responsibilities and interests outside of work. However, it is your responsibility to avoid situations where a conflict of interest could occur with respect to your obligations to Atlassian. Generally, a conflict of interest exists when a personal interest or activity interferes with your professional judgment or your responsibilities to Atlassian. Transparency is key. Even the appearance of a conflict of interest can be damaging and harmful to Atlassian and your reputation. Such a conflict may arise directly or indirectly, as a result of the personal interests or activities of a family member (or significant other) or organization with which you are affiliated. If you think you might be faced with a conflict of interest, it is important to address the situation immediately. Talk to your manager or the Compliance Officer; immediately cease the activity until you confirm whether a conflict exists, and remove yourself from any decision-making responsibilities that are related to the conflict. Any transaction or relationship that reasonably could be expected to give rise to a conflict of interest should be reported promptly to the Compliance Officer. The Compliance Officer may notify the Board of Directors or its Audit Committee as they deem appropriate. Members of the Board of Directors should disclose actual or potential conflicts of interest in accordance with Atlassian's Policy - Related Person Transactions (which applies only to the Board of Directors) and, if necessary, seek the appropriate authorization for the conflict situation. Actual or potential conflicts of interest involving an executive officer other than the Compliance Officer should be disclosed directly to the Compliance Officer. Actual or potential conflicts of interest involving the Compliance Officer should be disclosed directly to the Chief Financial Officer.\n\n**Outside Employment & Other Affiliations**  \nWe are proud of Atlassians' innovative spirit and curiosity and recognize it's what makes you a great part of Atlassian. However, employees may not work at another company as an employee, independent contractor, or consultant, or serve on its board of directors, where the affiliation gives or appears to give rise to a conflict of interest or interferes with your ability to perform services for Atlassian. For example, you are prohibited from simultaneous employment with a competitor of Atlassian or from participating in any activity that enhances or supports a competitor's position. If you are unsure if your outside work or affiliation with an outside interest could create or appear to create a conflict of interest, please review Atlassian's Global - Guidelines for Outside Activities.\n\n**Serving on a Board of Directors**  \nIn general, Atlassian employees are prohibited from serving on the board of directors of competitors but may be permitted to serve as a board member of other entities, including non-profit organizations. If you are considering serving on a board of directors, discuss it with your manager, read Atlassian's Global - Guidelines for Outside Activities, and follow the Guidelines' instructions for requesting approval.\n\n**WHERE CAN CONFLICTS OF INTEREST ARISE?**  \nSome examples include:  \n- Competing with Atlassian by working for a competitor  \n- Accepting gifts from (or offering gifts to) customers, suppliers, partners, government representatives, or public organizations  \n- Personally benefiting from Atlassian's property or information or your position at Atlassian  \n\n**Financial Interests in Other Businesses**  \nYou may not have a personal or family financial interest in an Atlassian customer, channel partner, supplier, other business partner, or competitor that could improperly influence your judgment, has the potential to cause the appearance of divided loyalty, or might result in personal benefit because of your role at Atlassian. Financial interests include investment, ownership, or creditor interests. Many factors may be considered in determining whether a conflict situation exists, including the size and nature of the investment, your ability to influence Atlassian decisions or decisions by third parties affecting Atlassian, your access to Atlassian confidential information or that of the other company, and the nature of the relationship between Atlassian and the other company.\n\n**Personal Benefit or Gain from Business**  \nConflicts of interest may also occur when you or an immediate family member receive some personal benefit in connection with any transaction involving Atlassian or as a result of your position at Atlassian. There are limited exceptions to this rule described in the Gifts and Entertainment section below. In addition, you must disclose to the Compliance Officer all situations where you may be conducting Atlassian business with members of your family, your friends, or others with whom you have a close personal relationship.\n\n**Corporate Opportunities**  \nYou should not knowingly pursue or participate in a business opportunity where Atlassian has an interest or which is closely related to Atlassian's current business or its anticipated future plans. If you believe you may be pursuing such an opportunity, disclose it to the Compliance Officer.\n\n**Political Contributions**  \nBusiness contributions to political campaigns are strictly regulated by federal, state, provincial, and local law in Australia, the United Kingdom, the United States, and other jurisdictions where Atlassian operates. Accordingly, all political contributions proposed to be made with Atlassian's funds or on Atlassian's behalf must be coordinated through and approved by the Compliance Officer, and in certain cases may require prior shareholder approval under the United Kingdom Companies Act 2006. You may not, without the approval of the Compliance Officer, use any of Atlassian's funds for political contributions of any kind to any political candidate or holder of any national, state, provincial, or local government office. You may make personal contributions but should not represent that you are making any such contribution at Atlassian's request or on Atlassian's behalf. Similar restrictions on political contributions may apply in other countries. Specific questions should be directed to the Compliance Officer.\n\n**Gifts & Entertainment When Dealing with Non-Governmental or Non-Public Third Parties**  \nAtlassian expects that you will use good judgment, discretion, and moderation when giving or accepting gifts or entertainment in business settings. Employees of, and third parties representing, Atlassian should not request, accept, offer to give, or give anything of significant value that would give the appearance of impropriety or suggest that it was intended in any way to influence a business relationship. Gifts in the form of cash payments are not allowed, regardless of amount. Please see Policy - Procurement for up-to-date information on what is considered appropriate amounts for gifts and entertainment. Any gifts and entertainment involving government or government-related individuals must be in compliance with the law in that country and the United States Foreign Corrupt Practices Act (FCPA). For further information, please see the Dealing with Public or Government Employees section in this Code.\n\n**Side Deals & Side Letters**  \nAll the terms and conditions of agreements entered into by Atlassian must be formally documented. Contract terms and conditions define the key attributes of Atlassian's rights, obligations, and liabilities, and can also dictate the accounting treatment given to a transaction. Making (or agreeing to make in the future) business commitments outside of the formal contracting process, through side deals, side letters, or otherwise, is unacceptable. You should not make any oral or written commitments that create a new agreement or modify or propose to modify an existing agreement without approval through the formal contracting process.\n\n---\n\n**Adopt Sustainability** 05\n\n**Adopt Sustainability**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us. Whether you call it corporate social responsibility, corporate citizenship, or sustainability, this is just about being human. Atlassian is committed to four issues—planet, community, customers, and people. Atlassian respects human rights, and we implement this commitment using approaches based on the UN Guiding Principles on Business and Human Rights.  \n\n**Planet – a Net-Zero Future**  \nClimate change is caused by humans, and without immediate intervention, it will fundamentally disrupt the environment, society, and the economy in very painful ways. Working together, the private sector, public sector, and citizens must play as a team and take bold action. As part of our commitment to combat climate change, Atlassian will run our operations on 100 percent renewable energy by 2025. We’re also setting science-based targets to limit warming to 1.5°C and achieve net-zero emissions by no later than 2050. Finally, we are focusing on inspiring Atlassians and companies alike to act.  \n\n**Community – a New Approach to Corporate Philanthropy**  \nLong before we had a stock ticker symbol—and even before we’d adopted our company values—co-founders Mike and Scott built giving back into Atlassian's operations, with a belief that both business and education can serve as forces for good and help transform our world. Through the Atlassian Foundation, we contribute 1% of our profits, employee time, equity, and products to social-impact organizations. Atlassian's contributions have a positive impact in our local communities and in far-flung regions across the globe.  \n\n**Customers – Leading with Security & Respecting Privacy**  \nWe believe privacy is a fundamental human right, which means we design our products with security and privacy in mind. This belief also means we must earn and keep our customers' trust; to do that, we strive to be transparent about how we collect, use, and share information. We are open about the privacy and security options available to our customers and our own practices. We publish a regular Transparency Report, disclosing law enforcement requests to access customer information (where permitted), including whether and how we complied.  \n\n**People – Unleashing the Potential of Our Team**  \nAtlassian is for everyone, and integrating diversity, equity, and inclusion across everything we do will help drive the structural shifts needed to unleash the potential of our teams. These two principles, along with our values, define how we build our people programs and workspaces. We know that teams with diverse perspectives perform better, so we invest in creating teams with a wide variety of backgrounds, experiences, and skills, and a strong sense of belonging. And we are committed to being open about our journey, including missteps, to share lessons with the global business community. Read about our sustainability program on our Corporate Social Responsibility page. For more about our approach to cultivating diversity, belonging, and balanced teams, visit Atlassian's Belonging page.\n\n---\n\n**Protect Confidential Information** 06\n\n**Protect Confidential Information**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian Confidential Information  \nConfidential Information generated and gathered in Atlassian's business plays a vital role in our business, prospects, and ability to compete. \"Confidential Information\" is any material that Atlassian does not make or want to make publicly known at a given time. It includes all non-public information that might be of use to competitors or harmful to Atlassian or its customers if disclosed. At the least, Atlassian Confidential Information includes information such as Atlassian's proprietary source code, nonpublic technical information about Atlassian systems and products, nonpublic information about Atlassian's product roadmap or partnerships, nonpublic financial information, and nonpublic information relating to employees and compensation. You are expected to protect Atlassian Confidential Information and any trade secrets to which you may have access during the course of your work, as set out in your employment agreement and/or non-disclosure agreement. This agreement is in effect throughout your engagement and has obligations that continue even after you no longer provide services to Atlassian. Confidential Information should be used solely for legitimate company purposes. You may not disclose or distribute Atlassian's Confidential Information, except when disclosure is authorized by the company or required by applicable law, rule, regulation, or pursuant to an applicable legal proceeding. You must return all of the company’s Confidential Information and proprietary information to Atlassian when your engagement with the company ends.\n\n**Third Party Confidential Information**  \nJust as Atlassian protects its own confidential materials, Atlassian respects the rights of other people or companies to protect their confidential information and trade secrets. If you have information that might reasonably be considered confidential information or a trade secret of another person or company, you must not reveal it to Atlassian without authorization from the owner of the information. This includes information from a prior employer. You may, under an authorized non-disclosure agreement, become aware of another company’s confidential information or trade secrets in the context of exploring a business relationship with that company. You must respect the proprietary nature of this information and not use it or disclose it publicly without authorization. If you require assistance in determining the proper course of action with respect to third party confidential information, including the requirements imposed by a non-disclosure agreement, please contact the Atlassian Legal team. Read our Policy - Data Security & Information Lifecycle Management to learn more about the various types of information that we have at Atlassian and how each should be treated.\n\n---\n\n**Use Atlassian & Third Party Assets Appropriately** 07\n\n**Use Atlassian & Third Party Assets Appropriately**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nWe all have a responsibility to ensure that Atlassian assets are not misused, shared with unauthorized employees or other third parties, or sold without appropriate authorization. Atlassian’s assets include its intellectual property rights, source code, technical know-how and documentation, information systems, computers, servers, other equipment, and communication facilities. Loss, theft, and misuse of Atlassian’s assets have a direct impact on the company’s business and its profitability. You are expected to comply with Policy - Electronic Systems and Communications and take steps to ensure that Atlassian’s assets are protected and used only for legitimate business purposes.\n\n**Computer & Other Equipment**  \nIf you use Atlassian equipment at your home or off-site, take precautions to protect it from theft or damage, just as if it were your own. If your employment or engagement with Atlassian terminates for any reason, you must immediately return all Atlassian resources, assets, and equipment in normal operating condition.\n\n**Use of Email & Other Forms of Electronic Communication**  \nAlways use emails and other forms of electronic communication (for example, Slack, texting, tweeting, etc.) appropriately. Please remember that the electronic systems and devices are owned by Atlassian and may be subject to monitoring and inspection by Atlassian even if protected by password, as permitted by applicable laws. For further details please consult Policy - Electronic Systems and Communications and Policy - Workplace Surveillance.\n\n**Use of Third Party Software**  \nWe respect the intellectual property rights of third parties. All software used to conduct Atlassian business must be authorized, for example, by purchasing a commercial software license or by licensing under an appropriate open source license. Using or copying software without a valid license constitutes copyright infringement and may expose you and Atlassian to civil and criminal liability. If you require assistance in determining what is an appropriate open source license for your work at Atlassian, please consult Standard - Using Third Party Code in Atlassian Product or the Atlassian Legal team.\n\n**Other Copyrighted Materials**  \nPublished works such as photographs, screenshots, videos, music, articles, white papers, websites, whether in hardcopy or electronic format, are generally protected by copyright. At times, Atlassians may want to use such publicly available materials in presentations or promotional materials or at trade shows or Atlassian events. These works are generally protected by copyright law, and their unauthorized use may constitute copyright infringement. Do not use any portion of them without obtaining permission from the copyright holder. If you need assistance in such matters, please consult with the Atlassian Legal team.\n\n---\n\n**Respect Privacy & Personal Information** 08\n\n**Respect Privacy & Personal Information**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian is responsible for protecting and securing the personal information of our employees, contractors, vendors, customers, and partners. We take this role seriously and require all Atlassians to take a role in safeguarding the information that has been entrusted to Atlassian. You must know and comply with your responsibilities under all of Atlassian’s internal and external privacy and data security policies, processes, and standards (we will refer to these as the \"data security and privacy policies\") and applicable global data protection laws. You may only access, collect, use, transfer, dispose of, or otherwise process personal information as permitted under Atlassian’s data security and privacy policies. You must always honor the individual’s choice to keep their personal information confidential and secure. If you ever become aware of the misuse or unauthorized access of any personal information, it is your responsibility to report this to the Privacy and Security teams immediately.\n\n**WE ARE COMMITTED TO PROTECTING THE PERSONAL DATA PROVIDED TO US. WE MUST ENDEAVOR TO KEEP THIS DATA SECURE, USE IT ONLY FOR INTENDED PURPOSES, AND FOLLOW THESE SIMPLE GUIDELINES:**  \n- Notice: We notify individuals through Atlassian's privacy policies of the purposes for which we collect personal data  \n- Choice: Individuals may choose whether to provide personal data to us, and we will respect their decisions  \n- Access: If an individual requests, we will provide that individual access to their personal data to the extent required by applicable law  \n- Use: We will store, use, and transfer personal data in accordance with Atlassian’s privacy policies  \n- Security: We take reasonable and appropriate measures to store personal data securely and to limit access rights to required employees and third parties who have signed the appropriate non-disclosure agreements  \n\n**Privacy and Your Use of Atlassian Resources**  \nWe seek to respect your personal privacy. However, as permitted by local law, it is important for you to understand that information created, accessed, transmitted, or stored using Atlassian’s technology resources, such as email messages, computer files, instant messages, or websites in your browsing history, are company resources and assets. We may access, monitor, or inspect Atlassian resources, assets, and property at any time without your prior approval, knowledge, or consent to the extent allowed by law. This includes monitoring and retrieving information that is stored or transmitted on Atlassian's electronic devices, computers, equipment, and systems. For further information, please read Policy - Electronic Systems and Communications and Policy - Workplace Surveillance.\n\n---\n\n**Keep Accurate Business Records** 09\n\n**Keep Accurate Business Records**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**Managing & Retaining Business Records**  \nThe integrity, reliability, and accuracy in all material respects of Atlassian’s books, records, and financial statements are fundamental to its continued and future business success. You may not cause Atlassian to enter into a transaction with the intent to document or record such transaction in a deceptive or unlawful manner. In addition, you may not create any false or artificial documentation or book entry for any transaction entered into by Atlassian. Similarly, officers, employees, consultants, contractors, and others working on behalf of the company who have responsibility for accounting and financial reporting matters have a responsibility to accurately record all funds, assets, and transactions on Atlassian’s books and records. It is equally important to know when to save information and when to periodically dispose of documents that are no longer useful or do not need to be retained. If litigation is pending or threatened, you must retain all pertinent documents in accordance with instructions received from the Legal team. Local laws regarding record retention and disposal may vary.\n\n**Quality of Public Disclosures**  \nAtlassian is committed to providing its shareholders with information about its financial condition and results of operations as required by the securities laws of the United States. It is Atlassian's policy to provide fair, timely, and understandable disclosures in the reports and documents that it submits to the Securities and Exchange Commission and other authorities. Officers, employees, consultants, contractors, and others working on behalf of the company who are responsible for these filings and disclosures, including Atlassian's principal executive, financial, and accounting officers, must use reasonable judgment and perform their responsibilities honestly, ethically, and objectively in order to ensure that this disclosure policy is fulfilled. Members of Atlassian's Disclosure Committee are primarily responsible for monitoring the company’s public disclosures.\n\n---\n\n**Comply with Global Trade Controls** 10\n\n**Comply with Global Trade Controls**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian is subject to global trade controls, including United States export controls and economic sanctions regulations and laws regulating international transactions. In addition, United States law prohibits Atlassian from participating in foreign boycotts and unsanctioned embargoes (in other words, embargoes that are not supported by the United States). It is Atlassian's policy, as outlined in its Policy - Export Controls Compliance, to comply with these laws and regulations even if it may result in the loss of some business opportunities. You are responsible for being familiar with the basic elements of these laws and to comply with them at all times. You should learn and understand the extent to which Australian, United Kingdom, United States, and international trade controls apply to transactions conducted by Atlassian. Violations of these laws can lead to severe penalties, even for unintentional violations.\n\n**Export Controls**  \nGenerally, an export can include the sharing of any product or technology (including hardware, software, or source code) which is located within, created within, or traveling through a country and then sent, disclosed, made available for download, or otherwise transferred beyond the country's borders or to a foreign country or customer via shipping, electronic or digital transmission, verbal communication, or other means. Exports can also include \"deemed exports,\" which are sharing of source code or technology to foreign nationals, wherever located, even within your own country. Many countries maintain controls on the destinations to which, and individuals to whom, products—including software—may be exported, and certain products may require a license for Atlassian to export. The United States maintains some of the strictest export controls in the world. United States law forbids doing business with certain countries and their nationals without obtaining prior United States governmental approval. United States sanctions restrictions prohibit Atlassian from conducting business with certain sanctioned countries and also specific companies and individuals identified on various restricted party lists. It is critical that you ask questions if you are unsure about the rules pertaining to the product, country, or customer.\n\n**Unsanctioned Embargoes & Anti-Boycott Rules**  \nUnited States federal law prohibits Atlassian from participating in any foreign boycott or embargo against countries, companies, or individuals that is not approved by the United States government. We must report any requests to participate in such unsanctioned boycotts or embargoes. Perhaps the most common unsanctioned boycott is the Arab League's boycott of Israel. This might include a request to insert a contractual clause into an agreement that obligates a party to boycott any country, confirm that a product was not originated or developed in a country, or that prohibits doing business with, or traveling to, certain countries.\n\n**WHAT COUNTRIES ARE CONSIDERED \"UNFRIENDLY\" COUNTRIES?**  \nThe United States government maintains a number of boycotts against countries considered unfriendly to United States interests. The prohibited countries list changes frequently due to world events and changes in United States foreign policy. Never assume that a country is not on the list. If you are unsure if you can transact business with a particular country, company, or individual, please contact Atlassian's Legal team.\n\n---\n\n**Keep the Appropriate Teams Informed** 11\n\n**Keep the Appropriate Teams Informed**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**Media Requests**  \nAtlassian designates specific individuals or teams to speak with the media, financial analysts, and governmental authorities regarding Atlassian matters. Unless you are a designated person, you must refer all inquiries as follows:  \n- Media inquiries must be directed to our Corporate Communications team  \n- Financial analyst inquiries must be directed to our Investor Relations team  \n- Government inquiries must be directed to the Compliance Officer  \n\n**Social Media**  \nIf you post information in public forums such as social networking sites, blogs, or chat rooms, you are prohibited from sharing confidential, private, or proprietary information about Atlassian. You are not permitted to speak on behalf of Atlassian when making any statements in these forums.  \n\n**Law Enforcement / Government**  \nYou must also seek Atlassian approval to speak to government or law enforcement officials regarding Atlassian or Atlassian's business activities. If a disclosure is required by law, you must promptly notify the Compliance Officer of such disclosure requirement.\n\n---\n\n**Reporting Concerns & Receiving Advice** 12\n\n**Reporting Concerns & Receiving Advice**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**First Seek Guidance**  \nThe best starting point for you to seek advice on ethics-related issues or reporting potential violations of the Code will usually be your manager or supervisor. However, if the conduct in question involves your manager or supervisor, or if you believe your manager or supervisor has not dealt with the matter properly, or if you do not feel that you can discuss the matter with your manager or supervisor, you may raise it with the Compliance Officer.  \n\n**Reporting Ethics-Related Issues or Potential Violations of the Code.**  \nYou may communicate with the Compliance Officer (Atlassian has designated its Deputy General Counsel - Corporate as its Compliance Officer for the purposes of this Code), or report potential ethics-related issues and violations of the Code, by any of the following methods (most of which may be done anonymously subject to local laws):  \n- in writing by email to Compliance-Officer@atlassian.com (this option does not allow for anonymous reporting)  \n- Anonymously via the Atlassian Ethics and Compliance Portal by:  \n  - Calling 1.800.461.9330 in the United States or 1.800.763.983 in Australia; for other locations, visit https://www.atlassian.com/ethics; or  \n  - Submitting a report at https://www.atlassian.com/ethics which is a secure web portal powered by Convercent, a third-party provider.  \n\n**Special Rules for Our Portal Internationally.**  \nPlease note that certain countries in the Americas, EMEA, and APAC where Atlassian does business may not allow certain concerns to be reported at all or to be reported anonymously via the portal. Also, Atlassian may be obligated to inform the person who is the subject of a reported concern or violation that the report was filed and that the person may exercise their right to access and respond to the information regarding the allegation.  \nThe above methods are preferred, but you may also send an anonymous message by mail, addressed to:  \n**Compliance Officer**  \nAtlassian Corporation Plc  \nc/o Atlassian, Inc.  \n350 Bush Street, 13th Floor  \nSan Francisco, California 94104 USA  \n\n---\n\n**Reporting Work-Related Grievances**  \nAtlassian's Policy - Grievance sets out the appropriate channels for submitting matters concerning unfair treatment in an Atlassian work environment that causes undue concern, distress, or a feeling of injustice. Before reporting these types of matters via Atlassian's Ethics and Compliance Portal, to the extent possible, please use the channels described in Policy - Grievance.  \n\n**Notes about Reporting Anonymity.**  \nWhen reporting suspected violations of the Code, Atlassian prefers that you identify yourself; this helps facilitate an effective and timely investigation and appropriate remedial action. However, Atlassian also recognizes that some people may feel more comfortable reporting a suspected violation anonymously. If you wish to remain anonymous, you may do so (to the extent allowed by local law), and Atlassian will use reasonable efforts to protect your confidentiality subject to applicable law, rule, or regulation or any applicable legal proceedings. In the event the report is made anonymously, however, Atlassian may not have sufficient information to look into or otherwise investigate or evaluate the allegations. Accordingly, you should provide as much detail as is reasonably necessary to permit Atlassian to evaluate the matter(s) set forth in the anonymous report and, if appropriate, commence and conduct an appropriate investigation.  \n\n**Cooperation.**  \nYou are expected to cooperate with Atlassian in any investigation of a potential violation of the Code, any other Atlassian policy or practice, or any applicable law, rule, or regulation.  \n\n**Misuse of Reporting Channels.**  \nYou must not use these reporting channels in bad faith, or to report false or frivolous grievances. Please use the Ethics and Compliance Portal only to report grievances that involve the Code or other ethics-related issues.  \n\n**Director Communications.**  \nA director on the Board of Directors may also communicate concerns or seek advice with respect to this Code by contacting the Board of Directors through its Chairperson or the Audit Committee.\n\n---\n\n**Appendix** 13\n\n**Appendix**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**Monitoring Compliance & Disciplinary Action**  \nAtlassian's Board of Directors, in conjunction with its Audit Committee, is responsible for administering this Code. Atlassian's Deputy General Counsel - Corporate has been appointed Atlassian's Compliance Officer under this Code. The Board has delegated day-to-day responsibility for administering and interpreting the Code to the Compliance Officer. Atlassian's management, under the supervision of its Board or Audit Committee, will take reasonable steps from time to time to monitor compliance with the Code, and when appropriate, impose and enforce appropriate disciplinary measures for violations of the Code. Atlassian's management will periodically report to the Board or Audit Committee, as applicable, on these compliance efforts including, without limitation, periodic reporting of alleged violations of the Code and the actions taken with respect to any such violation.\n\n**Exceptions & Amendments**  \nNo waiver of any provisions of the Code for the benefit of a director or an executive officer (which includes without limitation, for purposes of this Code, Atlassian's principal executive, financial, and accounting officers) will be effective unless approved by the Board or, if permitted, the Audit Committee, and if applicable, such waiver is promptly disclosed to the company’s shareholders in accordance with applicable United States securities laws, any other laws or regulations, and/or the rules and regulations of the exchange or system on which Atlassian's shares are traded or quoted, as the case may be. Any waivers of the Code for other officers, employees, consultants, contractors, and others working on behalf of the company may be made by the Compliance Officer, the Board, or, if permitted, the Audit Committee. All amendments to the Code must be approved by the Board or the Audit Committee and, if applicable, must be promptly disclosed to Atlassian's shareholders in accordance with applicable United States securities laws, any other laws or regulations, and/or the rules and regulations of the exchange or system on which the company’s shares are traded or quoted, as the case may be.\n\n---\n\n**Resources, Policies, & Standards/Guidelines Referenced in Code**  \n**RESOURCES**  \n- Belonging  \n- Corporate Social Responsibility  \n- HR People Partner, Employee Relations Partner, or Business Partner  \n- Transparency Report  \n\n**POLICIES**  \n- Policy - Alcohol and Drug Use  \n- Policy - Data Security & Information Lifecycle Management  \n- Policy - Electronic Systems and Communications  \n- Policy - Equal Employment Opportunity: Anti-Discrimination, Harassment, Bullying, and Retaliation  \n- Policy - Export Controls Compliance  \n- Policy - Grievance  \n- Policy - Insider Trading and Disclosure  \n- Privacy Policy  \n- Policy - Procurement  \n- Policy - Related Person Transactions  \n- Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption  \n- Policy - Workplace Health and Safety  \n- Policy - Workplace Surveillance  \n\n**STANDARDS & GUIDELINES**  \n- Atlassian Social Media Guidelines  \n- Global - Community Guidelines  \n- Global - Guidelines for Outside Activities  \n- Standard - Using Third Party Code in Atlassian Product  \n\n©2020 Atlassian. All Rights Reserved. CORP-231_DRD-05/20 atlassian.com/ethics  \n~#END#~"
							}
						],
						"role": "assistant"
					}
				],
				"parallel_tool_calls": true,
				"previous_response_id": null,
				"reasoning": {
					"effort": null,
					"summary": null
				},
				"service_tier": "default",
				"store": true,
				"temperature": 1,
				"text": {
					"format": {
						"type": "text"
					}
				},
				"tool_choice": "auto",
				"tools": [],
				"top_p": 1,
				"truncation": "disabled",
				"usage": {
					"input_tokens": 12775,
					"input_tokens_details": {
						"cached_tokens": 0
					},
					"output_tokens": 10757,
					"output_tokens_details": {
						"reasoning_tokens": 0
					},
					"total_tokens": 23532
				},
				"user": null,
				"metadata": {},
				"output_text": "~#BEGIN#~\n## Code of Business Conduct & Ethics\n\nAtlassian's mission is to unleash the potential of every team, and we must act with integrity to achieve it. Each of us is responsible for behaving ethically, honestly, and respectfully. Each of us has a part to play for our employees, directors, officers, agents, partners, representatives, contractors, and consultants. Our unique values describe what we stand for at the most fundamental level. They shape our culture and influence who we are, what we do, and even who we hire. They’re hard-wired into our DNA and will stay the same as we continue to grow. Our values are reflected in the Atlassian Code of Business Conduct and Ethics. The Code guides our actions across every part of the company, from our Board of Directors to our interns. In addition to Atlassian's policies and practices, the Code addresses how to properly interact with people and organizations. We are all responsible for holding our contractors, consultants, partners, suppliers, and every Atlassian to the standards in our Code. Our future success depends on following these principles and taking them seriously. Without them, we risk creating significant liability for Atlassian and even threatening our ability to do business. So please ensure you familiarize yourselves with the Code and remember that we expect you to know and comply with the legal requirements relating to your job and the services you are providing to Atlassian. We trust and expect you to use common sense and the highest ethical standards when making business decisions—even when there is no stated guideline. Above all, we should always focus on doing the right thing. We all have a role to play.\n\nMike Cannon-Brookes & Scott Farquhar  \nCo-CEOs and Co-Founders, Atlassian  \n\nOpen company, no bullshit  \nBuild with heart and balance  \nDon’t #@!% the customer  \nPlay as a team  \nBe the change you seek  \n\n01. **PRIORITIZE ETHICS & COMPLIANCE**  \n- Reporting Possible Violations  \n- Non-Retaliation & Disciplinary Action  \n- Standards of Conduct  \n\n02. **TREAT OTHERS RESPECTFULLY**  \n- Equal Opportunity: Anti-Discrimination, Harassment, Bullying, & Retaliation  \n- Maintaining Health & Safety  \n- Drugs, Controlled Substances, & Alcohol  \n- Weapons & Violence  \n- Communications with Others  \n\n03. **ENGAGE IN ETHICAL BUSINESS PRACTICES**  \n- Free & Fair Competition  \n- No Insider Trading  \n- Anti-Bribery  \n- Dealing with Public or Government Officials  \n- Customers, Partners, & Suppliers  \n\n04. **AVOID CONFLICTS OF INTEREST**  \n- Outside Employment & Other Affiliations  \n- Serving on a Board of Directors  \n- Financial Interests in Other Businesses  \n- Personal Benefit or Gain from Business  \n- Corporate Opportunities  \n- Political Contributions  \n- Gifts & Entertainment When Dealing with Non-Governmental or Non-Public Third Parties  \n- Side Deals & Side Letters  \n\n05. **ADOPT SUSTAINABILITY**  \n- Planet - a Net-Zero Future  \n- Community - a New Approach to Corporate Philanthropy  \n- Customers - Leading with Security & Respecting Privacy  \n- People - Unleashing the Potential of Our Team  \n\n06. **PROTECT CONFIDENTIAL INFORMATION**  \n- Atlassian Confidential Information  \n- Third Party Confidential Information  \n\n07. **USE ATLASSIAN & THIRD PARTY ASSETS APPROPRIATELY**  \n- Computer & Other Equipment  \n- Use of Email & Other Forms of Electronic Communication  \n- Use of Third Party Software  \n- Other Copyrighted Materials  \n\n08. **RESPECT PRIVACY & PERSONAL INFORMATION**  \n\n09. **KEEP ACCURATE BUSINESS RECORDS**  \n- Managing & Retaining Business Records  \n- Quality of Public Disclosures  \n\n10. **COMPLY WITH GLOBAL TRADE CONTROLS**  \n- Export Controls  \n- Unsanctioned Embargoes & Anti-Boycott Rules  \n\n11. **KEEP THE APPROPRIATE TEAMS INFORMED**  \n- Media Requests  \n- Social Media  \n- Law Enforcement / Government  \n\n12. **REPORTING CONCERNS & RECEIVING ADVICE**  \n\n13. **APPENDIX**  \n- Monitoring Compliance & Disciplinary Action  \n- Exceptions & Amendments  \n- Resources, Policies, & Standards/Guidelines Referenced in Code  \n\n---\n\n**Prioritize Ethics & Compliance** 01\n\n**Prioritize Ethics & Compliance**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nThis Code applies to Atlassian employees, directors, officers, partners, representatives, contractors, and consultants. Atlassian takes compliance with applicable laws, rules, and regulations seriously. You are prohibited from engaging in any unlawful activity when conducting Atlassian business or in carrying out your day-to-day duties or services. It is your responsibility to read, understand, and acknowledge this Code (including the policies, standards, and guidelines referenced in the Code) on an annual basis or as requested by Atlassian. This Code does not change any legal or contractual obligations that you may otherwise have with Atlassian. Instead, the standards in this Code should be viewed as the minimum standards that Atlassian expects from you. Also, as a global company, Atlassian expects that you will comply with all local laws and customs of the location where you work or visit.\n\n**MANAGERS ARE ROLE MODELS**  \nManagers at all levels are responsible for being role models for ethical behavior and ensuring that employees reporting to them understand and comply with Atlassian's Code, policies, and practices. This includes making sure that they complete all required training. Here are your responsibilities as a manager:  \n- Review the Code at least annually  \n- Regularly reinforce and discuss the Code with team members  \n- Promptly seek guidance from your own manager or business partners if you have any questions  \n- Promptly report violations of the Code, policies, and practices  \n\nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n\n**Reporting Possible Violations**  \nWe rely on you to recognize potential problems and ask questions if you are ever unsure about the appropriateness of an action or occurrence. Whenever you are unsure, always ask. Be proactive if you believe this Code, any of Atlassian's policies or practices, or the law are being violated. You have an obligation to report this. But please do not conduct your own investigation. If you have a question or would like to report a violation, please read Reporting Concerns & Receiving Advice below. It explains how reports can be made.  \n\n**Non-Retaliation & Disciplinary Action**  \nYou should feel free to ask questions or make a report without fear of retaliation. We will not tolerate retaliation against anyone who reports a suspected violation in good faith or cooperates in an investigation. Anyone who engages in any form of retaliation will be subject to disciplinary action, which may include termination of employment or services. If you believe you have been subject to retaliation as a result of reporting a suspected violation in good faith, please report it immediately to the resources listed at Reporting Concerns & Receiving Advice.  \n\n**Standards of Conduct**  \nWe want to ensure that Atlassian is a place where our team can thrive. We expect you to follow basic, common-sense rules of conduct that will protect everyone’s interests. If you are found to have violated this Code or any of the policies or practices referenced in it, you will be subject to disciplinary action, up to and including termination of your employment or services.  \n\n**WHAT IF I MAKE A REPORT ABOUT A SUSPECTED VIOLATION AND I AM WRONG?**  \nIf you made the report in good faith and believe that the information provided is accurate, you will not be subject to disciplinary action. You do not need to be right—but you do need to believe that the information you are providing is truthful.\n\n---\n\n**Treat Others Respectfully** 02\n\n**Treat Others Respectfully**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nConsistent with our values, we strive to create an environment that is open, supportive, and safe. Respect for others should always be prioritized in your  in-person and online interactions with others, whether they be colleagues, partners, suppliers, customers, or the general public.  \n\n**Equal Opportunity: Anti-Discrimination, Harassment, Bullying, & Retaliation**  \nAtlassian's Play, as a Team value demands that we treat each other with respect, dignity, and professionalism. We care about our community, and we’re counting on you to help ensure a safe and comfortable environment for all Atlassians, which is made up of individuals with diverse beliefs and viewpoints. Every Atlassian has the right to work in an environment that is respectful, professional, and free from all forms of discrimination, harassment, bullying, and retaliation. Atlassian expects that all interactions among Atlassians, either in person or over digital spaces, will be business-like and free of bias, prejudice, and harassment. The same is required when Atlassians interact with our community, customers, and partners. We will not tolerate discrimination against or harassment of employees, consultants, contractors, or customers based on any characteristic protected by law, such as age, gender, gender identity, sexual orientation, race, national origin, citizenship, or disability. You can find more information at Policy - Equal Employment Opportunity: Anti-Discrimination, Harassment, Bullying, and Retaliation. If you witness or experience discrimination, harassment, bullying, or retaliation, please report it immediately to any of the available resources listed in the Policy - Grievance. The channels described in Policy - Grievance are appropriate for submitting matters concerning unfair treatment in an Atlassian work environment that causes undue concern, distress, or a feeling of injustice.\n\n**Maintaining Health & Safety**  \nAtlassian is committed to maintaining a healthy, safe, and productive workplace. This requires your continuous cooperation. If you have any health or safety concerns, you should immediately contact your manager and Workplace Experience Team. If a work-related injury occurs, please immediately notify your manager, your HR People Partner, and the Benefits Team. Find more information on how to make these reports at Policy - Workplace Health and Safety.\n\n**Drugs, Controlled Substances, & Alcohol**  \nBeing under the influence of a drug or alcohol while on company premises or while conducting company business may interfere with a safe and healthy work environment and may pose serious risks to the user and to those around them. We expect you to act responsibly when it comes to consuming alcohol. You represent Atlassian—whether in the office, at an after-hours work activity, an offsite, or Atlassian-sponsored event. Never drink to the point of impairment or in a way that may lead to inappropriate behavior or endanger the safety of others. Regardless, always follow the local laws of your location. Atlassian has a zero-tolerance policy against illegal drugs. Employees are not allowed to possess, trade, or use illegal drugs or report to work under the influence of illegal drugs. Please read Atlassian's Policy - Alcohol and Drug Use for more information.\n\n**Weapons & Violence**  \nAtlassian is committed to a violence-free work environment. We do not tolerate any level of violence or the threat of violence in the workplace. Under no circumstances should you bring a weapon to work, a customer site, or any other offsite location where Atlassian business is conducted. In case of potential violence or danger, immediately contact local law enforcement and report it to your manager and your local HR People Partner.\n\n**Communications with Others**  \nOur values and our products encourage open communication. However, we must all be cognizant of how our communications are received and interpreted within and outside of Atlassian and our responsibilities listed in Policy - Equal Employment Opportunity: Anti-Discrimination, Harassment, Bullying, and Retaliation. When you post on social media, whether through an official Atlassian account or not, please first read the Atlassian Social Media Guidelines. When it comes to our internal communications, check out the Global - Community Guidelines.\n\n---\n\n**Engage in Ethical Business Practices** 03\n\n**Engage in Ethical Business Practices**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n\n**Free & Fair Competition**  \nCompeting vigorously, yet lawfully, with competitors and establishing advantageous, but fair, business relationships with customers and suppliers is a part of the foundation for Atlassian's long-term success. On the other hand, unlawful and unethical conduct, which may lead to short-term gains, may damage Atlassian's reputation and long-term business prospects. You must deal ethically and lawfully with the company’s customers, suppliers, competitors, and employees in all business dealings on the company’s behalf. You should not take unfair advantage of another person through the abuse of privileged or confidential information or through improper manipulation, concealment, or misrepresentation of material facts.\n\n**No Insider Trading**  \nIf you learn of any material nonpublic information about Atlassian or a company with which Atlassian does business (for example, a customer, supplier, or other parties with which Atlassian is negotiating a major transaction, such as an acquisition, investment, or sale), you may not trade in Atlassian's securities or that other party’s securities until the information becomes public or is no longer material. In simple terms, material nonpublic information is any type of information that could reasonably be expected to affect the market price of Atlassian's securities or a third party’s securities, as the case may be, that has not been disseminated in a manner making it available to investors generally. Trading stock or encouraging others to trade stock on the basis of material nonpublic information—regardless of how small or large the trade—may constitute insider trading, insider dealing, or stock tipping and constitute a criminal offense in most countries where we do business. Like many public companies, Atlassian has adopted specific trading restrictions to guard against insider trading. Do not confuse these trading restrictions with the broader prohibition on trading when in possession of material nonpublic information. In other words, the company’s “trading window” may be open but you may nonetheless be in possession of material nonpublic information that makes it inappropriate to trade. For more information, please read Policy - Insider Trading and Disclosure.\n\n**Anti-Bribery**  \nWe are committed to complying with all anti-bribery laws, including the United States Foreign Corrupt Practices Act (FCPA) and the United Kingdom Bribery Act. Any form of bribery, direct or indirect, is strictly prohibited. That means you must not offer a bribe to, or accept one from, any person, at any time, for any reason. Any third party, supplier, contractor, consultant, agent, or intermediary acting on Atlassian's behalf is also prohibited from offering, giving, or accepting bribes. You have a continuing and independent obligation to ensure compliance with these laws and Atlassian's Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption. Cultural \"norms\" are never an excuse to make a bribe. Failure to comply with the FCPA, the Bribery Act, and other similar anti-corruption laws may result in civil and/or criminal fines and penalties to Atlassian, as well as significant harm to the company's reputation. It may also result in civil and criminal penalties being imposed against any company personnel, agents, and business partners involved. Your non-compliance with the Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption will result in disciplinary action being taken, up to and including termination of employment or services.\n\n**Dealing with Public or Government Officials**  \nWhen Atlassian does business with any government entity, state-owned enterprise, or public international organization on a country, state, or local level, we must abide by all applicable laws and regulations related to these types of transactions. In dealing with public sector customers in the United States or other countries, you are required to understand the special rules that may apply. Please read Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption for more information on what is appropriate. If you seek an exception to this rule (the approval of which will be rare), please see the Compliance Officer (Atlassian has designated its Deputy General Counsel - Corporate as its Compliance Officer for the purposes of this Code). Never provide a gift, including meals, entertainment, or other items of value, to a government official.\n\n**Customers, Partners, & Suppliers**  \nWe expect that our customers, partners, suppliers, and other third parties (we call them \"business partners\" in this section) will comply with all laws and act ethically in all respects. In light of that, when you engage any business partners, consider how they align with our values and conduct their businesses. Select good business partners. Who we do business with directly impacts our reputation and may have legal and business implications.\n\n---\n\n**Avoid Conflicts of Interest** 04\n\n**Avoid Conflicts of Interest**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n\nAtlassian recognizes and respects that you have responsibilities and interests outside of work. However, it is your responsibility to avoid situations where a conflict of interest could occur with respect to your obligations to Atlassian. Generally, a conflict of interest exists when a personal interest or activity interferes with your professional judgment or your responsibilities to Atlassian. Transparency is key. Even the appearance of a conflict of interest can be damaging and harmful to Atlassian and your reputation. Such a conflict may arise directly or indirectly, as a result of the personal interests or activities of a family member (or significant other) or organization with which you are affiliated. If you think you might be faced with a conflict of interest, it is important to address the situation immediately. Talk to your manager or the Compliance Officer; immediately cease the activity until you confirm whether a conflict exists, and remove yourself from any decision-making responsibilities that are related to the conflict. Any transaction or relationship that reasonably could be expected to give rise to a conflict of interest should be reported promptly to the Compliance Officer. The Compliance Officer may notify the Board of Directors or its Audit Committee as they deem appropriate. Members of the Board of Directors should disclose actual or potential conflicts of interest in accordance with Atlassian's Policy - Related Person Transactions (which applies only to the Board of Directors) and, if necessary, seek the appropriate authorization for the conflict situation. Actual or potential conflicts of interest involving an executive officer other than the Compliance Officer should be disclosed directly to the Compliance Officer. Actual or potential conflicts of interest involving the Compliance Officer should be disclosed directly to the Chief Financial Officer.\n\n**Outside Employment & Other Affiliations**  \nWe are proud of Atlassians' innovative spirit and curiosity and recognize it's what makes you a great part of Atlassian. However, employees may not work at another company as an employee, independent contractor, or consultant, or serve on its board of directors, where the affiliation gives or appears to give rise to a conflict of interest or interferes with your ability to perform services for Atlassian. For example, you are prohibited from simultaneous employment with a competitor of Atlassian or from participating in any activity that enhances or supports a competitor's position. If you are unsure if your outside work or affiliation with an outside interest could create or appear to create a conflict of interest, please review Atlassian's Global - Guidelines for Outside Activities.\n\n**Serving on a Board of Directors**  \nIn general, Atlassian employees are prohibited from serving on the board of directors of competitors but may be permitted to serve as a board member of other entities, including non-profit organizations. If you are considering serving on a board of directors, discuss it with your manager, read Atlassian's Global - Guidelines for Outside Activities, and follow the Guidelines' instructions for requesting approval.\n\n**WHERE CAN CONFLICTS OF INTEREST ARISE?**  \nSome examples include:  \n- Competing with Atlassian by working for a competitor  \n- Accepting gifts from (or offering gifts to) customers, suppliers, partners, government representatives, or public organizations  \n- Personally benefiting from Atlassian's property or information or your position at Atlassian  \n\n**Financial Interests in Other Businesses**  \nYou may not have a personal or family financial interest in an Atlassian customer, channel partner, supplier, other business partner, or competitor that could improperly influence your judgment, has the potential to cause the appearance of divided loyalty, or might result in personal benefit because of your role at Atlassian. Financial interests include investment, ownership, or creditor interests. Many factors may be considered in determining whether a conflict situation exists, including the size and nature of the investment, your ability to influence Atlassian decisions or decisions by third parties affecting Atlassian, your access to Atlassian confidential information or that of the other company, and the nature of the relationship between Atlassian and the other company.\n\n**Personal Benefit or Gain from Business**  \nConflicts of interest may also occur when you or an immediate family member receive some personal benefit in connection with any transaction involving Atlassian or as a result of your position at Atlassian. There are limited exceptions to this rule described in the Gifts and Entertainment section below. In addition, you must disclose to the Compliance Officer all situations where you may be conducting Atlassian business with members of your family, your friends, or others with whom you have a close personal relationship.\n\n**Corporate Opportunities**  \nYou should not knowingly pursue or participate in a business opportunity where Atlassian has an interest or which is closely related to Atlassian's current business or its anticipated future plans. If you believe you may be pursuing such an opportunity, disclose it to the Compliance Officer.\n\n**Political Contributions**  \nBusiness contributions to political campaigns are strictly regulated by federal, state, provincial, and local law in Australia, the United Kingdom, the United States, and other jurisdictions where Atlassian operates. Accordingly, all political contributions proposed to be made with Atlassian's funds or on Atlassian's behalf must be coordinated through and approved by the Compliance Officer, and in certain cases may require prior shareholder approval under the United Kingdom Companies Act 2006. You may not, without the approval of the Compliance Officer, use any of Atlassian's funds for political contributions of any kind to any political candidate or holder of any national, state, provincial, or local government office. You may make personal contributions but should not represent that you are making any such contribution at Atlassian's request or on Atlassian's behalf. Similar restrictions on political contributions may apply in other countries. Specific questions should be directed to the Compliance Officer.\n\n**Gifts & Entertainment When Dealing with Non-Governmental or Non-Public Third Parties**  \nAtlassian expects that you will use good judgment, discretion, and moderation when giving or accepting gifts or entertainment in business settings. Employees of, and third parties representing, Atlassian should not request, accept, offer to give, or give anything of significant value that would give the appearance of impropriety or suggest that it was intended in any way to influence a business relationship. Gifts in the form of cash payments are not allowed, regardless of amount. Please see Policy - Procurement for up-to-date information on what is considered appropriate amounts for gifts and entertainment. Any gifts and entertainment involving government or government-related individuals must be in compliance with the law in that country and the United States Foreign Corrupt Practices Act (FCPA). For further information, please see the Dealing with Public or Government Employees section in this Code.\n\n**Side Deals & Side Letters**  \nAll the terms and conditions of agreements entered into by Atlassian must be formally documented. Contract terms and conditions define the key attributes of Atlassian's rights, obligations, and liabilities, and can also dictate the accounting treatment given to a transaction. Making (or agreeing to make in the future) business commitments outside of the formal contracting process, through side deals, side letters, or otherwise, is unacceptable. You should not make any oral or written commitments that create a new agreement or modify or propose to modify an existing agreement without approval through the formal contracting process.\n\n---\n\n**Adopt Sustainability** 05\n\n**Adopt Sustainability**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us. Whether you call it corporate social responsibility, corporate citizenship, or sustainability, this is just about being human. Atlassian is committed to four issues—planet, community, customers, and people. Atlassian respects human rights, and we implement this commitment using approaches based on the UN Guiding Principles on Business and Human Rights.  \n\n**Planet – a Net-Zero Future**  \nClimate change is caused by humans, and without immediate intervention, it will fundamentally disrupt the environment, society, and the economy in very painful ways. Working together, the private sector, public sector, and citizens must play as a team and take bold action. As part of our commitment to combat climate change, Atlassian will run our operations on 100 percent renewable energy by 2025. We’re also setting science-based targets to limit warming to 1.5°C and achieve net-zero emissions by no later than 2050. Finally, we are focusing on inspiring Atlassians and companies alike to act.  \n\n**Community – a New Approach to Corporate Philanthropy**  \nLong before we had a stock ticker symbol—and even before we’d adopted our company values—co-founders Mike and Scott built giving back into Atlassian's operations, with a belief that both business and education can serve as forces for good and help transform our world. Through the Atlassian Foundation, we contribute 1% of our profits, employee time, equity, and products to social-impact organizations. Atlassian's contributions have a positive impact in our local communities and in far-flung regions across the globe.  \n\n**Customers – Leading with Security & Respecting Privacy**  \nWe believe privacy is a fundamental human right, which means we design our products with security and privacy in mind. This belief also means we must earn and keep our customers' trust; to do that, we strive to be transparent about how we collect, use, and share information. We are open about the privacy and security options available to our customers and our own practices. We publish a regular Transparency Report, disclosing law enforcement requests to access customer information (where permitted), including whether and how we complied.  \n\n**People – Unleashing the Potential of Our Team**  \nAtlassian is for everyone, and integrating diversity, equity, and inclusion across everything we do will help drive the structural shifts needed to unleash the potential of our teams. These two principles, along with our values, define how we build our people programs and workspaces. We know that teams with diverse perspectives perform better, so we invest in creating teams with a wide variety of backgrounds, experiences, and skills, and a strong sense of belonging. And we are committed to being open about our journey, including missteps, to share lessons with the global business community. Read about our sustainability program on our Corporate Social Responsibility page. For more about our approach to cultivating diversity, belonging, and balanced teams, visit Atlassian's Belonging page.\n\n---\n\n**Protect Confidential Information** 06\n\n**Protect Confidential Information**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian Confidential Information  \nConfidential Information generated and gathered in Atlassian's business plays a vital role in our business, prospects, and ability to compete. \"Confidential Information\" is any material that Atlassian does not make or want to make publicly known at a given time. It includes all non-public information that might be of use to competitors or harmful to Atlassian or its customers if disclosed. At the least, Atlassian Confidential Information includes information such as Atlassian's proprietary source code, nonpublic technical information about Atlassian systems and products, nonpublic information about Atlassian's product roadmap or partnerships, nonpublic financial information, and nonpublic information relating to employees and compensation. You are expected to protect Atlassian Confidential Information and any trade secrets to which you may have access during the course of your work, as set out in your employment agreement and/or non-disclosure agreement. This agreement is in effect throughout your engagement and has obligations that continue even after you no longer provide services to Atlassian. Confidential Information should be used solely for legitimate company purposes. You may not disclose or distribute Atlassian's Confidential Information, except when disclosure is authorized by the company or required by applicable law, rule, regulation, or pursuant to an applicable legal proceeding. You must return all of the company’s Confidential Information and proprietary information to Atlassian when your engagement with the company ends.\n\n**Third Party Confidential Information**  \nJust as Atlassian protects its own confidential materials, Atlassian respects the rights of other people or companies to protect their confidential information and trade secrets. If you have information that might reasonably be considered confidential information or a trade secret of another person or company, you must not reveal it to Atlassian without authorization from the owner of the information. This includes information from a prior employer. You may, under an authorized non-disclosure agreement, become aware of another company’s confidential information or trade secrets in the context of exploring a business relationship with that company. You must respect the proprietary nature of this information and not use it or disclose it publicly without authorization. If you require assistance in determining the proper course of action with respect to third party confidential information, including the requirements imposed by a non-disclosure agreement, please contact the Atlassian Legal team. Read our Policy - Data Security & Information Lifecycle Management to learn more about the various types of information that we have at Atlassian and how each should be treated.\n\n---\n\n**Use Atlassian & Third Party Assets Appropriately** 07\n\n**Use Atlassian & Third Party Assets Appropriately**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nWe all have a responsibility to ensure that Atlassian assets are not misused, shared with unauthorized employees or other third parties, or sold without appropriate authorization. Atlassian’s assets include its intellectual property rights, source code, technical know-how and documentation, information systems, computers, servers, other equipment, and communication facilities. Loss, theft, and misuse of Atlassian’s assets have a direct impact on the company’s business and its profitability. You are expected to comply with Policy - Electronic Systems and Communications and take steps to ensure that Atlassian’s assets are protected and used only for legitimate business purposes.\n\n**Computer & Other Equipment**  \nIf you use Atlassian equipment at your home or off-site, take precautions to protect it from theft or damage, just as if it were your own. If your employment or engagement with Atlassian terminates for any reason, you must immediately return all Atlassian resources, assets, and equipment in normal operating condition.\n\n**Use of Email & Other Forms of Electronic Communication**  \nAlways use emails and other forms of electronic communication (for example, Slack, texting, tweeting, etc.) appropriately. Please remember that the electronic systems and devices are owned by Atlassian and may be subject to monitoring and inspection by Atlassian even if protected by password, as permitted by applicable laws. For further details please consult Policy - Electronic Systems and Communications and Policy - Workplace Surveillance.\n\n**Use of Third Party Software**  \nWe respect the intellectual property rights of third parties. All software used to conduct Atlassian business must be authorized, for example, by purchasing a commercial software license or by licensing under an appropriate open source license. Using or copying software without a valid license constitutes copyright infringement and may expose you and Atlassian to civil and criminal liability. If you require assistance in determining what is an appropriate open source license for your work at Atlassian, please consult Standard - Using Third Party Code in Atlassian Product or the Atlassian Legal team.\n\n**Other Copyrighted Materials**  \nPublished works such as photographs, screenshots, videos, music, articles, white papers, websites, whether in hardcopy or electronic format, are generally protected by copyright. At times, Atlassians may want to use such publicly available materials in presentations or promotional materials or at trade shows or Atlassian events. These works are generally protected by copyright law, and their unauthorized use may constitute copyright infringement. Do not use any portion of them without obtaining permission from the copyright holder. If you need assistance in such matters, please consult with the Atlassian Legal team.\n\n---\n\n**Respect Privacy & Personal Information** 08\n\n**Respect Privacy & Personal Information**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian is responsible for protecting and securing the personal information of our employees, contractors, vendors, customers, and partners. We take this role seriously and require all Atlassians to take a role in safeguarding the information that has been entrusted to Atlassian. You must know and comply with your responsibilities under all of Atlassian’s internal and external privacy and data security policies, processes, and standards (we will refer to these as the \"data security and privacy policies\") and applicable global data protection laws. You may only access, collect, use, transfer, dispose of, or otherwise process personal information as permitted under Atlassian’s data security and privacy policies. You must always honor the individual’s choice to keep their personal information confidential and secure. If you ever become aware of the misuse or unauthorized access of any personal information, it is your responsibility to report this to the Privacy and Security teams immediately.\n\n**WE ARE COMMITTED TO PROTECTING THE PERSONAL DATA PROVIDED TO US. WE MUST ENDEAVOR TO KEEP THIS DATA SECURE, USE IT ONLY FOR INTENDED PURPOSES, AND FOLLOW THESE SIMPLE GUIDELINES:**  \n- Notice: We notify individuals through Atlassian's privacy policies of the purposes for which we collect personal data  \n- Choice: Individuals may choose whether to provide personal data to us, and we will respect their decisions  \n- Access: If an individual requests, we will provide that individual access to their personal data to the extent required by applicable law  \n- Use: We will store, use, and transfer personal data in accordance with Atlassian’s privacy policies  \n- Security: We take reasonable and appropriate measures to store personal data securely and to limit access rights to required employees and third parties who have signed the appropriate non-disclosure agreements  \n\n**Privacy and Your Use of Atlassian Resources**  \nWe seek to respect your personal privacy. However, as permitted by local law, it is important for you to understand that information created, accessed, transmitted, or stored using Atlassian’s technology resources, such as email messages, computer files, instant messages, or websites in your browsing history, are company resources and assets. We may access, monitor, or inspect Atlassian resources, assets, and property at any time without your prior approval, knowledge, or consent to the extent allowed by law. This includes monitoring and retrieving information that is stored or transmitted on Atlassian's electronic devices, computers, equipment, and systems. For further information, please read Policy - Electronic Systems and Communications and Policy - Workplace Surveillance.\n\n---\n\n**Keep Accurate Business Records** 09\n\n**Keep Accurate Business Records**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**Managing & Retaining Business Records**  \nThe integrity, reliability, and accuracy in all material respects of Atlassian’s books, records, and financial statements are fundamental to its continued and future business success. You may not cause Atlassian to enter into a transaction with the intent to document or record such transaction in a deceptive or unlawful manner. In addition, you may not create any false or artificial documentation or book entry for any transaction entered into by Atlassian. Similarly, officers, employees, consultants, contractors, and others working on behalf of the company who have responsibility for accounting and financial reporting matters have a responsibility to accurately record all funds, assets, and transactions on Atlassian’s books and records. It is equally important to know when to save information and when to periodically dispose of documents that are no longer useful or do not need to be retained. If litigation is pending or threatened, you must retain all pertinent documents in accordance with instructions received from the Legal team. Local laws regarding record retention and disposal may vary.\n\n**Quality of Public Disclosures**  \nAtlassian is committed to providing its shareholders with information about its financial condition and results of operations as required by the securities laws of the United States. It is Atlassian's policy to provide fair, timely, and understandable disclosures in the reports and documents that it submits to the Securities and Exchange Commission and other authorities. Officers, employees, consultants, contractors, and others working on behalf of the company who are responsible for these filings and disclosures, including Atlassian's principal executive, financial, and accounting officers, must use reasonable judgment and perform their responsibilities honestly, ethically, and objectively in order to ensure that this disclosure policy is fulfilled. Members of Atlassian's Disclosure Committee are primarily responsible for monitoring the company’s public disclosures.\n\n---\n\n**Comply with Global Trade Controls** 10\n\n**Comply with Global Trade Controls**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \nAtlassian is subject to global trade controls, including United States export controls and economic sanctions regulations and laws regulating international transactions. In addition, United States law prohibits Atlassian from participating in foreign boycotts and unsanctioned embargoes (in other words, embargoes that are not supported by the United States). It is Atlassian's policy, as outlined in its Policy - Export Controls Compliance, to comply with these laws and regulations even if it may result in the loss of some business opportunities. You are responsible for being familiar with the basic elements of these laws and to comply with them at all times. You should learn and understand the extent to which Australian, United Kingdom, United States, and international trade controls apply to transactions conducted by Atlassian. Violations of these laws can lead to severe penalties, even for unintentional violations.\n\n**Export Controls**  \nGenerally, an export can include the sharing of any product or technology (including hardware, software, or source code) which is located within, created within, or traveling through a country and then sent, disclosed, made available for download, or otherwise transferred beyond the country's borders or to a foreign country or customer via shipping, electronic or digital transmission, verbal communication, or other means. Exports can also include \"deemed exports,\" which are sharing of source code or technology to foreign nationals, wherever located, even within your own country. Many countries maintain controls on the destinations to which, and individuals to whom, products—including software—may be exported, and certain products may require a license for Atlassian to export. The United States maintains some of the strictest export controls in the world. United States law forbids doing business with certain countries and their nationals without obtaining prior United States governmental approval. United States sanctions restrictions prohibit Atlassian from conducting business with certain sanctioned countries and also specific companies and individuals identified on various restricted party lists. It is critical that you ask questions if you are unsure about the rules pertaining to the product, country, or customer.\n\n**Unsanctioned Embargoes & Anti-Boycott Rules**  \nUnited States federal law prohibits Atlassian from participating in any foreign boycott or embargo against countries, companies, or individuals that is not approved by the United States government. We must report any requests to participate in such unsanctioned boycotts or embargoes. Perhaps the most common unsanctioned boycott is the Arab League's boycott of Israel. This might include a request to insert a contractual clause into an agreement that obligates a party to boycott any country, confirm that a product was not originated or developed in a country, or that prohibits doing business with, or traveling to, certain countries.\n\n**WHAT COUNTRIES ARE CONSIDERED \"UNFRIENDLY\" COUNTRIES?**  \nThe United States government maintains a number of boycotts against countries considered unfriendly to United States interests. The prohibited countries list changes frequently due to world events and changes in United States foreign policy. Never assume that a country is not on the list. If you are unsure if you can transact business with a particular country, company, or individual, please contact Atlassian's Legal team.\n\n---\n\n**Keep the Appropriate Teams Informed** 11\n\n**Keep the Appropriate Teams Informed**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**Media Requests**  \nAtlassian designates specific individuals or teams to speak with the media, financial analysts, and governmental authorities regarding Atlassian matters. Unless you are a designated person, you must refer all inquiries as follows:  \n- Media inquiries must be directed to our Corporate Communications team  \n- Financial analyst inquiries must be directed to our Investor Relations team  \n- Government inquiries must be directed to the Compliance Officer  \n\n**Social Media**  \nIf you post information in public forums such as social networking sites, blogs, or chat rooms, you are prohibited from sharing confidential, private, or proprietary information about Atlassian. You are not permitted to speak on behalf of Atlassian when making any statements in these forums.  \n\n**Law Enforcement / Government**  \nYou must also seek Atlassian approval to speak to government or law enforcement officials regarding Atlassian or Atlassian's business activities. If a disclosure is required by law, you must promptly notify the Compliance Officer of such disclosure requirement.\n\n---\n\n**Reporting Concerns & Receiving Advice** 12\n\n**Reporting Concerns & Receiving Advice**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**First Seek Guidance**  \nThe best starting point for you to seek advice on ethics-related issues or reporting potential violations of the Code will usually be your manager or supervisor. However, if the conduct in question involves your manager or supervisor, or if you believe your manager or supervisor has not dealt with the matter properly, or if you do not feel that you can discuss the matter with your manager or supervisor, you may raise it with the Compliance Officer.  \n\n**Reporting Ethics-Related Issues or Potential Violations of the Code.**  \nYou may communicate with the Compliance Officer (Atlassian has designated its Deputy General Counsel - Corporate as its Compliance Officer for the purposes of this Code), or report potential ethics-related issues and violations of the Code, by any of the following methods (most of which may be done anonymously subject to local laws):  \n- in writing by email to Compliance-Officer@atlassian.com (this option does not allow for anonymous reporting)  \n- Anonymously via the Atlassian Ethics and Compliance Portal by:  \n  - Calling 1.800.461.9330 in the United States or 1.800.763.983 in Australia; for other locations, visit https://www.atlassian.com/ethics; or  \n  - Submitting a report at https://www.atlassian.com/ethics which is a secure web portal powered by Convercent, a third-party provider.  \n\n**Special Rules for Our Portal Internationally.**  \nPlease note that certain countries in the Americas, EMEA, and APAC where Atlassian does business may not allow certain concerns to be reported at all or to be reported anonymously via the portal. Also, Atlassian may be obligated to inform the person who is the subject of a reported concern or violation that the report was filed and that the person may exercise their right to access and respond to the information regarding the allegation.  \nThe above methods are preferred, but you may also send an anonymous message by mail, addressed to:  \n**Compliance Officer**  \nAtlassian Corporation Plc  \nc/o Atlassian, Inc.  \n350 Bush Street, 13th Floor  \nSan Francisco, California 94104 USA  \n\n---\n\n**Reporting Work-Related Grievances**  \nAtlassian's Policy - Grievance sets out the appropriate channels for submitting matters concerning unfair treatment in an Atlassian work environment that causes undue concern, distress, or a feeling of injustice. Before reporting these types of matters via Atlassian's Ethics and Compliance Portal, to the extent possible, please use the channels described in Policy - Grievance.  \n\n**Notes about Reporting Anonymity.**  \nWhen reporting suspected violations of the Code, Atlassian prefers that you identify yourself; this helps facilitate an effective and timely investigation and appropriate remedial action. However, Atlassian also recognizes that some people may feel more comfortable reporting a suspected violation anonymously. If you wish to remain anonymous, you may do so (to the extent allowed by local law), and Atlassian will use reasonable efforts to protect your confidentiality subject to applicable law, rule, or regulation or any applicable legal proceedings. In the event the report is made anonymously, however, Atlassian may not have sufficient information to look into or otherwise investigate or evaluate the allegations. Accordingly, you should provide as much detail as is reasonably necessary to permit Atlassian to evaluate the matter(s) set forth in the anonymous report and, if appropriate, commence and conduct an appropriate investigation.  \n\n**Cooperation.**  \nYou are expected to cooperate with Atlassian in any investigation of a potential violation of the Code, any other Atlassian policy or practice, or any applicable law, rule, or regulation.  \n\n**Misuse of Reporting Channels.**  \nYou must not use these reporting channels in bad faith, or to report false or frivolous grievances. Please use the Ethics and Compliance Portal only to report grievances that involve the Code or other ethics-related issues.  \n\n**Director Communications.**  \nA director on the Board of Directors may also communicate concerns or seek advice with respect to this Code by contacting the Board of Directors through its Chairperson or the Audit Committee.\n\n---\n\n**Appendix** 13\n\n**Appendix**  \nAtlassian Ethics and Compliance Portal | Online at www.atlassian.com/ethics | By phone at 1.800.461.9330 (U.S.) or 1.800.763.983 (Australia) or for other locations, click here.  \n**Monitoring Compliance & Disciplinary Action**  \nAtlassian's Board of Directors, in conjunction with its Audit Committee, is responsible for administering this Code. Atlassian's Deputy General Counsel - Corporate has been appointed Atlassian's Compliance Officer under this Code. The Board has delegated day-to-day responsibility for administering and interpreting the Code to the Compliance Officer. Atlassian's management, under the supervision of its Board or Audit Committee, will take reasonable steps from time to time to monitor compliance with the Code, and when appropriate, impose and enforce appropriate disciplinary measures for violations of the Code. Atlassian's management will periodically report to the Board or Audit Committee, as applicable, on these compliance efforts including, without limitation, periodic reporting of alleged violations of the Code and the actions taken with respect to any such violation.\n\n**Exceptions & Amendments**  \nNo waiver of any provisions of the Code for the benefit of a director or an executive officer (which includes without limitation, for purposes of this Code, Atlassian's principal executive, financial, and accounting officers) will be effective unless approved by the Board or, if permitted, the Audit Committee, and if applicable, such waiver is promptly disclosed to the company’s shareholders in accordance with applicable United States securities laws, any other laws or regulations, and/or the rules and regulations of the exchange or system on which Atlassian's shares are traded or quoted, as the case may be. Any waivers of the Code for other officers, employees, consultants, contractors, and others working on behalf of the company may be made by the Compliance Officer, the Board, or, if permitted, the Audit Committee. All amendments to the Code must be approved by the Board or the Audit Committee and, if applicable, must be promptly disclosed to Atlassian's shareholders in accordance with applicable United States securities laws, any other laws or regulations, and/or the rules and regulations of the exchange or system on which the company’s shares are traded or quoted, as the case may be.\n\n---\n\n**Resources, Policies, & Standards/Guidelines Referenced in Code**  \n**RESOURCES**  \n- Belonging  \n- Corporate Social Responsibility  \n- HR People Partner, Employee Relations Partner, or Business Partner  \n- Transparency Report  \n\n**POLICIES**  \n- Policy - Alcohol and Drug Use  \n- Policy - Data Security & Information Lifecycle Management  \n- Policy - Electronic Systems and Communications  \n- Policy - Equal Employment Opportunity: Anti-Discrimination, Harassment, Bullying, and Retaliation  \n- Policy - Export Controls Compliance  \n- Policy - Grievance  \n- Policy - Insider Trading and Disclosure  \n- Privacy Policy  \n- Policy - Procurement  \n- Policy - Related Person Transactions  \n- Policy - U.S. Foreign Corrupt Practices Act and Anti-Corruption  \n- Policy - Workplace Health and Safety  \n- Policy - Workplace Surveillance  \n\n**STANDARDS & GUIDELINES**  \n- Atlassian Social Media Guidelines  \n- Global - Community Guidelines  \n- Global - Guidelines for Outside Activities  \n- Standard - Using Third Party Code in Atlassian Product  \n\n©2020 Atlassian. All Rights Reserved. CORP-231_DRD-05/20 atlassian.com/ethics  \n~#END#~"
			}
			const API_RESPONSE_2 = {
				"id": "resp_6847b9654a3c819f81349108239517640b887e99c5a305fd",
				"object": "response",
				"created_at": 1749530981,
				"status": "completed",
				"background": false,
				"error": null,
				"incomplete_details": null,
				"instructions": null,
				"max_output_tokens": null,
				"model": "gpt-4o-mini-2024-07-18",
				"output": [
					{
						"id": "msg_6847b96618ac819fb700ec026cbcb0150b887e99c5a305fd",
						"type": "message",
						"status": "completed",
						"content": [
							{
								"type": "output_text",
								"annotations": [],
								"text": "{\"categories\":[{\"title\":\"Code of Business Conduct & Ethics\",\"subtitle\":\"Guidelines for maintaining integrity and ethical behavior at Atlassian.\",\"excerpt\":\"Atlassian's mission is to unleash the potential of every team, and we must act with integrity to achieve it. Each of us is responsible for behaving ethically, honestly, and respectfully.\"},{\"title\":\"Prioritize Ethics & Compliance\",\"subtitle\":\"Ensuring adherence to legal and ethical standards in all operations.\",\"excerpt\":\"Atlassian takes compliance with applicable laws, rules, and regulations seriously. You are prohibited from engaging in any unlawful activity when conducting Atlassian business or in carrying out your day-to-day duties or services.\"},{\"title\":\"Treat Others Respectfully\",\"subtitle\":\"Creating a workplace environment built on respect and equality.\",\"excerpt\":\"Every Atlassian has the right to work in an environment that is respectful, professional, and free from all forms of discrimination, harassment, bullying, and retaliation.\"},{\"title\":\"Engage in Ethical Business Practices\",\"subtitle\":\"Principles for fair competition and responsible business dealings.\",\"excerpt\":\"Competing vigorously, yet lawfully, with competitors and establishing advantageous, but fair, business relationships with customers and suppliers is part of the foundation for Atlassian's long-term success.\"},{\"title\":\"Avoid Conflicts of Interest\",\"subtitle\":\"Navigating personal and professional interests without compromising integrity.\",\"excerpt\":\"Atlassian recognizes and respects that you have responsibilities and interests outside of work. However, it is your responsibility to avoid situations where a conflict of interest could occur with respect to your obligations to Atlassian.\"},{\"title\":\"Adopt Sustainability\",\"subtitle\":\"Commitment to environmental stewardship and community involvement.\",\"excerpt\":\"Atlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us.\"},{\"title\":\"Protect Confidential Information\",\"subtitle\":\"Safeguarding sensitive business and personal data for all stakeholders.\",\"excerpt\":\"Confidential Information generated and gathered in Atlassian's business plays a vital role in our business, prospects, and ability to compete.\"},{\"title\":\"Use Atlassian & Third Party Assets Appropriately\",\"subtitle\":\"Responsible use of company resources and third-party assets.\",\"excerpt\":\"We all have a responsibility to ensure that Atlassian assets are not misused, shared with unauthorized employees or other third parties, or sold without appropriate authorization.\"},{\"title\":\"Respect Privacy & Personal Information\",\"subtitle\":\"Compliance with data protection policies and safeguarding personal data.\",\"excerpt\":\"Atlassian is responsible for protecting and securing the personal information of our employees, contractors, vendors, customers, and partners.\"},{\"title\":\"Keep Accurate Business Records\",\"subtitle\":\"Maintaining integrity in documentation and reporting processes.\",\"excerpt\":\"The integrity, reliability, and accuracy in all material respects of Atlassian’s books, records, and financial statements are fundamental to its continued and future business success.\"},{\"title\":\"Comply with Global Trade Controls\",\"subtitle\":\"Following international laws governing trade and transactions.\",\"excerpt\":\"Atlassian is subject to global trade controls, including United States export controls and economic sanctions regulations and laws regulating international transactions.\"},{\"title\":\"Keep the Appropriate Teams Informed\",\"subtitle\":\"Ensuring clear communication with stakeholders and authorities.\",\"excerpt\":\"Atlassian designates specific individuals or teams to speak with the media, financial analysts, and governmental authorities regarding Atlassian matters.\"},{\"title\":\"Reporting Concerns & Receiving Advice\",\"subtitle\":\"Channels for addressing ethical dilemmas and reporting violations.\",\"excerpt\":\"The best starting point for you to seek advice on ethics-related issues or reporting potential violations of the Code will usually be your manager or supervisor.\"},{\"title\":\"Appendix\",\"subtitle\":\"Additional resources and enforcement mechanisms for ethical compliance.\",\"excerpt\":\"Atlassian's Board of Directors, in conjunction with its Audit Committee, is responsible for administering this Code. Atlassian's Deputy General Counsel - Corporate has been appointed Atlassian's Compliance Officer under this Code.\"}]}",
								"parsed": {
									"categories": [
										{
											"title": "Code of Business Conduct & Ethics",
											"subtitle": "Guidelines for maintaining integrity and ethical behavior at Atlassian.",
											"excerpt": "Atlassian's mission is to unleash the potential of every team, and we must act with integrity to achieve it. Each of us is responsible for behaving ethically, honestly, and respectfully."
										},
										{
											"title": "Prioritize Ethics & Compliance",
											"subtitle": "Ensuring adherence to legal and ethical standards in all operations.",
											"excerpt": "Atlassian takes compliance with applicable laws, rules, and regulations seriously. You are prohibited from engaging in any unlawful activity when conducting Atlassian business or in carrying out your day-to-day duties or services."
										},
										{
											"title": "Treat Others Respectfully",
											"subtitle": "Creating a workplace environment built on respect and equality.",
											"excerpt": "Every Atlassian has the right to work in an environment that is respectful, professional, and free from all forms of discrimination, harassment, bullying, and retaliation."
										},
										{
											"title": "Engage in Ethical Business Practices",
											"subtitle": "Principles for fair competition and responsible business dealings.",
											"excerpt": "Competing vigorously, yet lawfully, with competitors and establishing advantageous, but fair, business relationships with customers and suppliers is part of the foundation for Atlassian's long-term success."
										},
										{
											"title": "Avoid Conflicts of Interest",
											"subtitle": "Navigating personal and professional interests without compromising integrity.",
											"excerpt": "Atlassian recognizes and respects that you have responsibilities and interests outside of work. However, it is your responsibility to avoid situations where a conflict of interest could occur with respect to your obligations to Atlassian."
										},
										{
											"title": "Adopt Sustainability",
											"subtitle": "Commitment to environmental stewardship and community involvement.",
											"excerpt": "Atlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us."
										},
										{
											"title": "Protect Confidential Information",
											"subtitle": "Safeguarding sensitive business and personal data for all stakeholders.",
											"excerpt": "Confidential Information generated and gathered in Atlassian's business plays a vital role in our business, prospects, and ability to compete."
										},
										{
											"title": "Use Atlassian & Third Party Assets Appropriately",
											"subtitle": "Responsible use of company resources and third-party assets.",
											"excerpt": "We all have a responsibility to ensure that Atlassian assets are not misused, shared with unauthorized employees or other third parties, or sold without appropriate authorization."
										},
										{
											"title": "Respect Privacy & Personal Information",
											"subtitle": "Compliance with data protection policies and safeguarding personal data.",
											"excerpt": "Atlassian is responsible for protecting and securing the personal information of our employees, contractors, vendors, customers, and partners."
										},
										{
											"title": "Keep Accurate Business Records",
											"subtitle": "Maintaining integrity in documentation and reporting processes.",
											"excerpt": "The integrity, reliability, and accuracy in all material respects of Atlassian’s books, records, and financial statements are fundamental to its continued and future business success."
										},
										{
											"title": "Comply with Global Trade Controls",
											"subtitle": "Following international laws governing trade and transactions.",
											"excerpt": "Atlassian is subject to global trade controls, including United States export controls and economic sanctions regulations and laws regulating international transactions."
										},
										{
											"title": "Keep the Appropriate Teams Informed",
											"subtitle": "Ensuring clear communication with stakeholders and authorities.",
											"excerpt": "Atlassian designates specific individuals or teams to speak with the media, financial analysts, and governmental authorities regarding Atlassian matters."
										},
										{
											"title": "Reporting Concerns & Receiving Advice",
											"subtitle": "Channels for addressing ethical dilemmas and reporting violations.",
											"excerpt": "The best starting point for you to seek advice on ethics-related issues or reporting potential violations of the Code will usually be your manager or supervisor."
										},
										{
											"title": "Appendix",
											"subtitle": "Additional resources and enforcement mechanisms for ethical compliance.",
											"excerpt": "Atlassian's Board of Directors, in conjunction with its Audit Committee, is responsible for administering this Code. Atlassian's Deputy General Counsel - Corporate has been appointed Atlassian's Compliance Officer under this Code."
										}
									]
								}
							}
						],
						"role": "assistant"
					}
				],
				"parallel_tool_calls": true,
				"previous_response_id": null,
				"reasoning": {
					"effort": null,
					"summary": null
				},
				"service_tier": "default",
				"store": true,
				"temperature": 1,
				"text": {
					"format": {
						"type": "json_schema",
						"description": null,
						"name": "result",
						"schema": {
							"type": "object",
							"properties": {
								"categories": {
									"type": "array",
									"items": {
										"type": "object",
										"properties": {
											"title": {
												"type": "string"
											},
											"subtitle": {
												"type": "string"
											},
											"excerpt": {
												"type": "string"
											}
										},
										"required": [
											"title",
											"subtitle",
											"excerpt"
										],
										"additionalProperties": false
									}
								}
							},
							"required": [
								"categories"
							],
							"additionalProperties": false
						},
						"strict": true
					}
				},
				"tool_choice": "auto",
				"tools": [],
				"top_p": 1,
				"truncation": "disabled",
				"usage": {
					"input_tokens": 10935,
					"input_tokens_details": {
						"cached_tokens": 0
					},
					"output_tokens": 801,
					"output_tokens_details": {
						"reasoning_tokens": 0
					},
					"total_tokens": 11736
				},
				"user": null,
				"metadata": {},
				"output_text": "{\"categories\":[{\"title\":\"Code of Business Conduct & Ethics\",\"subtitle\":\"Guidelines for maintaining integrity and ethical behavior at Atlassian.\",\"excerpt\":\"Atlassian's mission is to unleash the potential of every team, and we must act with integrity to achieve it. Each of us is responsible for behaving ethically, honestly, and respectfully.\"},{\"title\":\"Prioritize Ethics & Compliance\",\"subtitle\":\"Ensuring adherence to legal and ethical standards in all operations.\",\"excerpt\":\"Atlassian takes compliance with applicable laws, rules, and regulations seriously. You are prohibited from engaging in any unlawful activity when conducting Atlassian business or in carrying out your day-to-day duties or services.\"},{\"title\":\"Treat Others Respectfully\",\"subtitle\":\"Creating a workplace environment built on respect and equality.\",\"excerpt\":\"Every Atlassian has the right to work in an environment that is respectful, professional, and free from all forms of discrimination, harassment, bullying, and retaliation.\"},{\"title\":\"Engage in Ethical Business Practices\",\"subtitle\":\"Principles for fair competition and responsible business dealings.\",\"excerpt\":\"Competing vigorously, yet lawfully, with competitors and establishing advantageous, but fair, business relationships with customers and suppliers is part of the foundation for Atlassian's long-term success.\"},{\"title\":\"Avoid Conflicts of Interest\",\"subtitle\":\"Navigating personal and professional interests without compromising integrity.\",\"excerpt\":\"Atlassian recognizes and respects that you have responsibilities and interests outside of work. However, it is your responsibility to avoid situations where a conflict of interest could occur with respect to your obligations to Atlassian.\"},{\"title\":\"Adopt Sustainability\",\"subtitle\":\"Commitment to environmental stewardship and community involvement.\",\"excerpt\":\"Atlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us.\"},{\"title\":\"Protect Confidential Information\",\"subtitle\":\"Safeguarding sensitive business and personal data for all stakeholders.\",\"excerpt\":\"Confidential Information generated and gathered in Atlassian's business plays a vital role in our business, prospects, and ability to compete.\"},{\"title\":\"Use Atlassian & Third Party Assets Appropriately\",\"subtitle\":\"Responsible use of company resources and third-party assets.\",\"excerpt\":\"We all have a responsibility to ensure that Atlassian assets are not misused, shared with unauthorized employees or other third parties, or sold without appropriate authorization.\"},{\"title\":\"Respect Privacy & Personal Information\",\"subtitle\":\"Compliance with data protection policies and safeguarding personal data.\",\"excerpt\":\"Atlassian is responsible for protecting and securing the personal information of our employees, contractors, vendors, customers, and partners.\"},{\"title\":\"Keep Accurate Business Records\",\"subtitle\":\"Maintaining integrity in documentation and reporting processes.\",\"excerpt\":\"The integrity, reliability, and accuracy in all material respects of Atlassian’s books, records, and financial statements are fundamental to its continued and future business success.\"},{\"title\":\"Comply with Global Trade Controls\",\"subtitle\":\"Following international laws governing trade and transactions.\",\"excerpt\":\"Atlassian is subject to global trade controls, including United States export controls and economic sanctions regulations and laws regulating international transactions.\"},{\"title\":\"Keep the Appropriate Teams Informed\",\"subtitle\":\"Ensuring clear communication with stakeholders and authorities.\",\"excerpt\":\"Atlassian designates specific individuals or teams to speak with the media, financial analysts, and governmental authorities regarding Atlassian matters.\"},{\"title\":\"Reporting Concerns & Receiving Advice\",\"subtitle\":\"Channels for addressing ethical dilemmas and reporting violations.\",\"excerpt\":\"The best starting point for you to seek advice on ethics-related issues or reporting potential violations of the Code will usually be your manager or supervisor.\"},{\"title\":\"Appendix\",\"subtitle\":\"Additional resources and enforcement mechanisms for ethical compliance.\",\"excerpt\":\"Atlassian's Board of Directors, in conjunction with its Audit Committee, is responsible for administering this Code. Atlassian's Deputy General Counsel - Corporate has been appointed Atlassian's Compliance Officer under this Code.\"}]}",
				"output_parsed": {
					"categories": [
						{
							"title": "Code of Business Conduct & Ethics",
							"subtitle": "Guidelines for maintaining integrity and ethical behavior at Atlassian.",
							"excerpt": "Atlassian's mission is to unleash the potential of every team, and we must act with integrity to achieve it. Each of us is responsible for behaving ethically, honestly, and respectfully."
						},
						{
							"title": "Prioritize Ethics & Compliance",
							"subtitle": "Ensuring adherence to legal and ethical standards in all operations.",
							"excerpt": "Atlassian takes compliance with applicable laws, rules, and regulations seriously. You are prohibited from engaging in any unlawful activity when conducting Atlassian business or in carrying out your day-to-day duties or services."
						},
						{
							"title": "Treat Others Respectfully",
							"subtitle": "Creating a workplace environment built on respect and equality.",
							"excerpt": "Every Atlassian has the right to work in an environment that is respectful, professional, and free from all forms of discrimination, harassment, bullying, and retaliation."
						},
						{
							"title": "Engage in Ethical Business Practices",
							"subtitle": "Principles for fair competition and responsible business dealings.",
							"excerpt": "Competing vigorously, yet lawfully, with competitors and establishing advantageous, but fair, business relationships with customers and suppliers is part of the foundation for Atlassian's long-term success."
						},
						{
							"title": "Avoid Conflicts of Interest",
							"subtitle": "Navigating personal and professional interests without compromising integrity.",
							"excerpt": "Atlassian recognizes and respects that you have responsibilities and interests outside of work. However, it is your responsibility to avoid situations where a conflict of interest could occur with respect to your obligations to Atlassian."
						},
						{
							"title": "Adopt Sustainability",
							"subtitle": "Commitment to environmental stewardship and community involvement.",
							"excerpt": "Atlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us."
						},
						{
							"title": "Protect Confidential Information",
							"subtitle": "Safeguarding sensitive business and personal data for all stakeholders.",
							"excerpt": "Confidential Information generated and gathered in Atlassian's business plays a vital role in our business, prospects, and ability to compete."
						},
						{
							"title": "Use Atlassian & Third Party Assets Appropriately",
							"subtitle": "Responsible use of company resources and third-party assets.",
							"excerpt": "We all have a responsibility to ensure that Atlassian assets are not misused, shared with unauthorized employees or other third parties, or sold without appropriate authorization."
						},
						{
							"title": "Respect Privacy & Personal Information",
							"subtitle": "Compliance with data protection policies and safeguarding personal data.",
							"excerpt": "Atlassian is responsible for protecting and securing the personal information of our employees, contractors, vendors, customers, and partners."
						},
						{
							"title": "Keep Accurate Business Records",
							"subtitle": "Maintaining integrity in documentation and reporting processes.",
							"excerpt": "The integrity, reliability, and accuracy in all material respects of Atlassian’s books, records, and financial statements are fundamental to its continued and future business success."
						},
						{
							"title": "Comply with Global Trade Controls",
							"subtitle": "Following international laws governing trade and transactions.",
							"excerpt": "Atlassian is subject to global trade controls, including United States export controls and economic sanctions regulations and laws regulating international transactions."
						},
						{
							"title": "Keep the Appropriate Teams Informed",
							"subtitle": "Ensuring clear communication with stakeholders and authorities.",
							"excerpt": "Atlassian designates specific individuals or teams to speak with the media, financial analysts, and governmental authorities regarding Atlassian matters."
						},
						{
							"title": "Reporting Concerns & Receiving Advice",
							"subtitle": "Channels for addressing ethical dilemmas and reporting violations.",
							"excerpt": "The best starting point for you to seek advice on ethics-related issues or reporting potential violations of the Code will usually be your manager or supervisor."
						},
						{
							"title": "Appendix",
							"subtitle": "Additional resources and enforcement mechanisms for ethical compliance.",
							"excerpt": "Atlassian's Board of Directors, in conjunction with its Audit Committee, is responsible for administering this Code. Atlassian's Deputy General Counsel - Corporate has been appointed Atlassian's Compliance Officer under this Code."
						}
					]
				}
			}

			let extraction_result: ExtractedStructure = (undefined as any)

			it('should work', async () => {
				const result = await extract_categories(client, INPUT, [API_RESPONSE_1, API_RESPONSE_2])

				expect(result.raw_cleaned.length).to.be.within(RAW_TEXT_1.length * 0.8, RAW_TEXT_1.length * 1.2)
				expect(result.categories.length).to.be.within(5, 20)

				extraction_result = result
			})

			describe('chained -> ', function () {
				const API_RESPONSE_1 = {
					"id": "resp_6847b9eef2b881a1b3946209ac67d30504d5beeb7e197048",
					"object": "response",
					"created_at": 1749531119,
					"status": "completed",
					"background": false,
					"error": null,
					"incomplete_details": null,
					"instructions": null,
					"max_output_tokens": null,
					"model": "gpt-4o-mini-2024-07-18",
					"output": [
						{
							"id": "msg_6847b9f024bc81a1b914f2c07f1314a404d5beeb7e197048",
							"type": "message",
							"status": "completed",
							"content": [
								{
									"type": "output_text",
									"annotations": [],
									"text": "~#BEGIN#~\n**Adopt Sustainability** 05\n\n**Adopt Sustainability** Atlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us. Whether you call it corporate social responsibility, corporate citizenship, or sustainability, this is just about being human. Atlassian is committed to four issues—planet, community, customers, and people. Atlassian respects human rights, and we implement this commitment using approaches based on the UN Guiding Principles on Business and Human Rights.\n\n**Planet – a Net-Zero Future** Climate change is caused by humans, and without immediate intervention, it will fundamentally disrupt the environment, society, and the economy in very painful ways. Working together, the private sector, public sector, and citizens must play as a team and take bold action. As part of our commitment to combat climate change, Atlassian will run our operations on 100 percent renewable energy by 2025. We’re also setting science-based targets to limit warming to 1.5°C and achieve net-zero emissions by no later than 2050. Finally, we are focusing on inspiring Atlassians and companies alike to act.\n\n**Community – a New Approach to Corporate Philanthropy** Long before we had a stock ticker symbol—and even before we’d adopted our company values—co-founders Mike and Scott built giving back into Atlassian's operations, with a belief that both business and education can serve as forces for good and help transform our world. Through the Atlassian Foundation, we contribute 1% of our profits, employee time, equity, and products to social-impact organizations. Atlassian's contributions have a positive impact in our local communities and in far-flung regions across the globe.\n\n**Customers – Leading with Security & Respecting Privacy** We believe privacy is a fundamental human right, which means we design our products with security and privacy in mind. This belief also means we must earn and keep our customers' trust; to do that, we strive to be transparent about how we collect, use, and share information. We are open about the privacy and security options available to our customers and our own practices. We publish a regular Transparency Report, disclosing law enforcement requests to access customer information (where permitted), including whether and how we complied.\n\n**People – Unleashing the Potential of Our Team** Atlassian is for everyone, and integrating diversity, equity, and inclusion across everything we do will help drive the structural shifts needed to unleash the potential of our teams. These two principles, along with our values, define how we build our people programs and workspaces. We know that teams with diverse perspectives perform better, so we invest in creating teams with a wide variety of backgrounds, experiences, and skills, and a strong sense of belonging. And we are committed to being open about our journey, including missteps, to share lessons with the global business community. Read about our sustainability program on our Corporate Social Responsibility page. For more about our approach to cultivating diversity, belonging, and balanced teams, visit Atlassian's Belonging page.\n~#END#~"
								}
							],
							"role": "assistant"
						}
					],
					"parallel_tool_calls": true,
					"previous_response_id": null,
					"reasoning": {
						"effort": null,
						"summary": null
					},
					"service_tier": "default",
					"store": true,
					"temperature": 1,
					"text": {
						"format": {
							"type": "text"
						}
					},
					"tool_choice": "auto",
					"tools": [],
					"top_p": 1,
					"truncation": "disabled",
					"usage": {
						"input_tokens": 10806,
						"input_tokens_details": {
							"cached_tokens": 0
						},
						"output_tokens": 651,
						"output_tokens_details": {
							"reasoning_tokens": 0
						},
						"total_tokens": 11457
					},
					"user": null,
					"metadata": {},
					"output_text": "~#BEGIN#~\n**Adopt Sustainability** 05\n\n**Adopt Sustainability** Atlassian is built to be open, inclusive, fair, and just. When we face tough questions about ethics, people, or the planet, we let those principles guide us. Whether you call it corporate social responsibility, corporate citizenship, or sustainability, this is just about being human. Atlassian is committed to four issues—planet, community, customers, and people. Atlassian respects human rights, and we implement this commitment using approaches based on the UN Guiding Principles on Business and Human Rights.\n\n**Planet – a Net-Zero Future** Climate change is caused by humans, and without immediate intervention, it will fundamentally disrupt the environment, society, and the economy in very painful ways. Working together, the private sector, public sector, and citizens must play as a team and take bold action. As part of our commitment to combat climate change, Atlassian will run our operations on 100 percent renewable energy by 2025. We’re also setting science-based targets to limit warming to 1.5°C and achieve net-zero emissions by no later than 2050. Finally, we are focusing on inspiring Atlassians and companies alike to act.\n\n**Community – a New Approach to Corporate Philanthropy** Long before we had a stock ticker symbol—and even before we’d adopted our company values—co-founders Mike and Scott built giving back into Atlassian's operations, with a belief that both business and education can serve as forces for good and help transform our world. Through the Atlassian Foundation, we contribute 1% of our profits, employee time, equity, and products to social-impact organizations. Atlassian's contributions have a positive impact in our local communities and in far-flung regions across the globe.\n\n**Customers – Leading with Security & Respecting Privacy** We believe privacy is a fundamental human right, which means we design our products with security and privacy in mind. This belief also means we must earn and keep our customers' trust; to do that, we strive to be transparent about how we collect, use, and share information. We are open about the privacy and security options available to our customers and our own practices. We publish a regular Transparency Report, disclosing law enforcement requests to access customer information (where permitted), including whether and how we complied.\n\n**People – Unleashing the Potential of Our Team** Atlassian is for everyone, and integrating diversity, equity, and inclusion across everything we do will help drive the structural shifts needed to unleash the potential of our teams. These two principles, along with our values, define how we build our people programs and workspaces. We know that teams with diverse perspectives perform better, so we invest in creating teams with a wide variety of backgrounds, experiences, and skills, and a strong sense of belonging. And we are committed to being open about our journey, including missteps, to share lessons with the global business community. Read about our sustainability program on our Corporate Social Responsibility page. For more about our approach to cultivating diversity, belonging, and balanced teams, visit Atlassian's Belonging page.\n~#END#~"
				}
				const API_RESPONSE_2 = {
					"id": "resp_6847ba1189d8819cadd601f5573be4f006988fa1802a445a",
					"object": "response",
					"created_at": 1749531153,
					"status": "completed",
					"background": false,
					"error": null,
					"incomplete_details": null,
					"instructions": null,
					"max_output_tokens": null,
					"model": "gpt-4o-mini-2024-07-18",
					"output": [
						{
							"id": "msg_6847ba11e8b4819cac80499f97c33bf506988fa1802a445a",
							"type": "message",
							"status": "completed",
							"content": [
								{
									"type": "output_text",
									"annotations": [],
									"text": "```markdown\n# Adopt Sustainability\n\nAtlassian is built on principles of openness, inclusivity, fairness, and justice. When faced with ethical dilemmas concerning people or the planet, we rely on these values. Whether referred to as corporate social responsibility, corporate citizenship, or sustainability, our commitment encapsulates the essence of being human. We focus on four key areas: **Planet, Community, Customers, and People**. Our respect for human rights is guided by the UN Guiding Principles on Business and Human Rights.\n\n## Planet – A Net-Zero Future\n\nClimate change, driven by human activity, poses significant risks to the environment, society, and the economy. Immediate action is required from the private sector, public sector, and individuals. As part of our commitment to combating climate change, Atlassian aims to operate on 100% renewable energy by 2025. We will set science-based targets to limit global warming to 1.5°C and achieve net-zero emissions by 2050. Additionally, we strive to inspire both Atlassians and other companies to take action.\n\n## Community – A New Approach to Corporate Philanthropy\n\nLong before we had a stock ticker symbol, Atlassian co-founders Mike and Scott integrated giving back into our operations. They believed that business and education could serve as powerful forces for good. Through the Atlassian Foundation, we contribute 1% of our profits, employee time, equity, and products to social-impact organizations. Our contributions positively impact local communities and extend globally.\n\n## Customers – Leading with Security & Respecting Privacy\n\nPrivacy is a fundamental human right. We design our products with security and privacy at the forefront. Earning and maintaining our customers' trust requires transparency about how we collect, use, and share information. We openly communicate the privacy and security options available to customers and regularly publish a Transparency Report, disclosing law enforcement requests for customer information, when permitted, and detailing our compliance.\n\n## People – Unleashing the Potential of Our Team\n\nAtlassian is for everyone. We believe that integrating diversity, equity, and inclusion into all facets of our operations is crucial for unleashing the potential of our teams. These principles, alongside our core values, shape our people programs and workplace environments. Teams with diverse perspectives perform better, so we invest in creating diverse groups that foster a strong sense of belonging. We are committed to being transparent about our journey, including our missteps, to share insights with the global business community. \n\nFor more information, read about our sustainability program on our [Corporate Social Responsibility page](#). To learn about our efforts in cultivating diversity and belonging, visit Atlassian's [Belonging page](#).\n```"
								}
							],
							"role": "assistant"
						}
					],
					"parallel_tool_calls": true,
					"previous_response_id": null,
					"reasoning": {
						"effort": null,
						"summary": null
					},
					"service_tier": "default",
					"store": true,
					"temperature": 1,
					"text": {
						"format": {
							"type": "text"
						}
					},
					"tool_choice": "auto",
					"tools": [],
					"top_p": 1,
					"truncation": "disabled",
					"usage": {
						"input_tokens": 841,
						"input_tokens_details": {
							"cached_tokens": 0
						},
						"output_tokens": 548,
						"output_tokens_details": {
							"reasoning_tokens": 0
						},
						"total_tokens": 1389
					},
					"user": null,
					"metadata": {},
					"output_text": "```markdown\n# Adopt Sustainability\n\nAtlassian is built on principles of openness, inclusivity, fairness, and justice. When faced with ethical dilemmas concerning people or the planet, we rely on these values. Whether referred to as corporate social responsibility, corporate citizenship, or sustainability, our commitment encapsulates the essence of being human. We focus on four key areas: **Planet, Community, Customers, and People**. Our respect for human rights is guided by the UN Guiding Principles on Business and Human Rights.\n\n## Planet – A Net-Zero Future\n\nClimate change, driven by human activity, poses significant risks to the environment, society, and the economy. Immediate action is required from the private sector, public sector, and individuals. As part of our commitment to combating climate change, Atlassian aims to operate on 100% renewable energy by 2025. We will set science-based targets to limit global warming to 1.5°C and achieve net-zero emissions by 2050. Additionally, we strive to inspire both Atlassians and other companies to take action.\n\n## Community – A New Approach to Corporate Philanthropy\n\nLong before we had a stock ticker symbol, Atlassian co-founders Mike and Scott integrated giving back into our operations. They believed that business and education could serve as powerful forces for good. Through the Atlassian Foundation, we contribute 1% of our profits, employee time, equity, and products to social-impact organizations. Our contributions positively impact local communities and extend globally.\n\n## Customers – Leading with Security & Respecting Privacy\n\nPrivacy is a fundamental human right. We design our products with security and privacy at the forefront. Earning and maintaining our customers' trust requires transparency about how we collect, use, and share information. We openly communicate the privacy and security options available to customers and regularly publish a Transparency Report, disclosing law enforcement requests for customer information, when permitted, and detailing our compliance.\n\n## People – Unleashing the Potential of Our Team\n\nAtlassian is for everyone. We believe that integrating diversity, equity, and inclusion into all facets of our operations is crucial for unleashing the potential of our teams. These principles, alongside our core values, shape our people programs and workplace environments. Teams with diverse perspectives perform better, so we invest in creating diverse groups that foster a strong sense of belonging. We are committed to being transparent about our journey, including our missteps, to share insights with the global business community. \n\nFor more information, read about our sustainability program on our [Corporate Social Responsibility page](#). To learn about our efforts in cultivating diversity and belonging, visit Atlassian's [Belonging page](#).\n```"
				}

				it('should work', async () => {
					const INPUT: FilterAndImproveInput = {
						raw_kb_content: extraction_result.raw_cleaned,

						topic: extraction_result.categories[5]!.title,
						topic_details: extraction_result.categories[5]!.subtitle,
					}

					const result = await filter_and_improve_content(client, INPUT, [API_RESPONSE_1, API_RESPONSE_2])

					expect(result.title).to.equal(INPUT.topic)
					expect(result.subtitle).to.equal(INPUT.topic_details)
					expect(result._original_content_for_review.length, 'filtered original content').to.be.within(RAW_TEXT_1.length * 0.05, RAW_TEXT_1.length * 0.6)

					// TODO improve comparison
					expect(result.content.length, 'final improved content').to.be.within(result._original_content_for_review.length * 0.5, result._original_content_for_review.length * 3)
				})
			})
		})
	})
})
