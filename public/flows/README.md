# Langflow Flows

This directory contains the JSON flow files used by the Langflow website for template downloads.

## Structure

Each flow file is a JSON representation of a Langflow workflow that can be imported and used by users.

## Files

- `generate_concise_overviews.json` - Document summarization flow
- `rag_article_in_web_with_agent.json` - Agentic RAG research flow  
- `ticket_analysis_classification.json` - Support ticket classification flow

## Usage

These files are served statically from `/flows/` and can be downloaded directly by users through the website's download functionality.

## Adding New Flows

1. Add the JSON file to this directory
2. Update the `FLOWS` array in `src/data/flows.ts`
3. Set the `githubDownloadUrl` to `/flows/your-flow-name.json`
