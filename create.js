import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamo-lib.js";
import { success, failure } from "./libs/response-lib.js";

gibberish.what;
export async function main(event, context, callback){
	const data = JSON.parse(event.body);

	const params = {
		TableName: process.env.tableName,
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			created: Date.now()
		}
	};

	try{
		await dynamoDbLib.call("put", params);
		callback(null, success(params.Item));
	}catch(e){
		callback(null, failure({status: false}));
	}
}