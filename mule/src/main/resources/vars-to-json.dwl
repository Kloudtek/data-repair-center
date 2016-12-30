%dw 1.0
%output application/json
---
{
	id: flowVars.id,
	businessId: flowVars.businessId,
	mimeType: flowVars.mimeType,
	dataType: flowVars.dataType,
	origin: flowVars.origin,
	originId: flowVars.originId,
	retry: flowVars.retry,
	timestamp: flowVars.timestamp,
	correlationId: flowVars.correlationId,
	isText: flowVars.isText,
	data: payload,
	attributes: flowVars.metadata
}