# BikeSpace Form UX Analyzer

A lightweight product analytics prototype that diagnoses form submission friction in a civic issue-reporting flow.

## Problem
Users often drop off before completing issue-reporting forms (e.g., bike parking reports), reducing engagement and data quality.

## Approach
Instead of analyzing raw analytics dashboards, this prototype translates simple UX signals into structured product insights.

Inputs:
- drop-off step
- device type
- friction indicators (UX issues)

Outputs:
- prioritized UX problems
- recommended improvements
- a 1-week execution plan

## Example
If users drop off at the map step on mobile with "map confusing" and "too many fields":

The tool identifies:
- location selection friction (high priority)
- high input burden on mobile (medium priority)
- unclear progression (high priority)

## Tech Stack
- React (Vite)
- JavaScript

## What This Demonstrates
- Product analytics thinking
- UX problem decomposition
- Prioritization of fixes
- Translating insights into execution

## Next Steps
- AI-generated recommendations
- integration with real user data
- dashboard-based analytics
