import OpenAI from 'openai'

// https://docs.evalkit.ai/introduction
import { evaluate, BiasDetectionMetric } from '@evalkit/core';

import { expect } from 'chai'

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

				expect(result.raw_cleaned.length).to.be.within(1115 * 0.8, 1115 * 1.2)
				expect(result.categories.length).to.be.within(2, 10)

				extraction_result = result
			})

			describe('chained -> ', function () {
				const API_RESPONSE_1 = {
					"id": "resp_6847b08ae108819dbae81f8a78ed71c40054e383c40ca1f3",
					"object": "response",
					"created_at": 1749528714,
					"status": "completed",
					"background": false,
					"error": null,
					"incomplete_details": null,
					"instructions": null,
					"max_output_tokens": null,
					"model": "gpt-4o-mini-2024-07-18",
					"output": [
						{
							"id": "msg_6847b08b6ee4819db487a2022f3dbf400054e383c40ca1f3",
							"type": "message",
							"status": "completed",
							"content": [
								{
									"type": "output_text",
									"annotations": [],
									"text": "~#BEGIN#~\nOur new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST. \n\nNew hires will receive an email with their login credentials for the HR portal and our internal collaboration tool, Slack, 48 hours prior to their start date. \n\nIt's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. \n\nBenefits enrollment, including health insurance and 401(k), must be completed by the end of their first week. \n\nThey will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.\n~#END#~"
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
						"input_tokens": 474,
						"input_tokens_details": {
							"cached_tokens": 0
						},
						"output_tokens": 151,
						"output_tokens_details": {
							"reasoning_tokens": 0
						},
						"total_tokens": 625
					},
					"user": null,
					"metadata": {},
					"output_text": "~#BEGIN#~\nOur new employee onboarding process starts the first Monday of every month, beginning with a mandatory virtual orientation session from 9 AM to 12 PM AEST. \n\nNew hires will receive an email with their login credentials for the HR portal and our internal collaboration tool, Slack, 48 hours prior to their start date. \n\nIt's crucial they complete their tax forms and set up direct deposit in the HR portal within the first three days. \n\nBenefits enrollment, including health insurance and 401(k), must be completed by the end of their first week. \n\nThey will be provisioned with a laptop and necessary software by the end of their first day, provided they have completed the pre-onboarding IT survey.\n~#END#~"
				}

				it('should work', async () => {
					const INPUT: FilterAndImproveInput = {
						raw_kb_content: extraction_result.raw_cleaned,

						topic: extraction_result.categories[2]!.title,
						topic_details: extraction_result.categories[2]!.subtitle,
					}

					const result = await filter_and_improve_content(client, INPUT, [API_RESPONSE_1])

					throw new Error(`Not implemented!`)
				})
			})
		})
	})
})
