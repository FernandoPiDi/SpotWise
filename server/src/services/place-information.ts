import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { AzureChatOpenAI } from "@langchain/openai";
import { appConfig } from "../configs/config";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function getPlaceInformation(placeName: string): Promise<string> {
  const tool = new WikipediaQueryRun({
    topKResults: 1,
    maxDocContentLength: 6000,
  });

  const placeInfo = await tool.invoke({ input: placeName });
  if (placeInfo.length === 0) {
    throw new Error("No information found for place");
  }

  const llm = new AzureChatOpenAI({
    azureOpenAIApiKey: appConfig.azureOpenAI.key,
    azureOpenAIApiVersion: appConfig.azureOpenAI.version,
    azureOpenAIApiDeploymentName: appConfig.azureOpenAI.deploymentName,
    azureOpenAIEndpoint: appConfig.azureOpenAI.endpoint,
  });

  const prompt = new PromptTemplate({
    template: `You are a travel guide and you are giving a brief information about {placeName} to a traveller.
    you have received the next information from wikipedia: 
    
    <wikipedia>
    {wikipediaInfo}
    </wikipedia>

    Your task is sumarise the information in a way that is easy to understand for the traveller.
    The information should be no longer than 3 sentences.`,
    inputVariables: ["placeName", "wikipediaInfo"],
  });

  const parser = new StringOutputParser();

  const chain = prompt.pipe(llm);

  const llmResponse = await chain.invoke({
    placeName,
    wikipediaInfo: placeInfo,
  });

  const summary = await parser.invoke(llmResponse);

  return summary;
}
