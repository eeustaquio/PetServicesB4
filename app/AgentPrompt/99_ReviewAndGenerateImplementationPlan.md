# Agent Prompt: Review, Analyze, and Generate Implementation Plan

## Purpose
This prompt instructs the agent to review the solution plan and all feature documentation, analyze requirements, and generate a comprehensive implementation plan with actionable todo lists, versioned folders, and detailed phase breakdowns.


## Authoritative References
| Reference File/Folder                        | Description                                  |
|----------------------------------------------|----------------------------------------------|
| `_Product Doc/SolutionPlanAndFeatures.md`    | Solution plan, requirements, features, architecture, priorities |
| `_Product Doc/Solution Detail/`              | Detailed requirements, technical specs, risks, acceptance criteria |
| `_Product Doc/Features/`                     | Feature breakdowns, flows, requirements       |
| `_Product Doc/App Dev Plan/`                 | Development planning, APIs, schema, DevOps, etc. |
| `_Product Doc/App Dev Reference/`                 | Development planning, APIs, schema, DevOps, etc. |
---

## Instructions for the Agent

1. **Review Solution Plan and Features**
   - Read and analyze `_Documentation/SolutionPlanAndFeatures.md`.
   - Review all documents and files under `_Documentation/Features` and subfolders for completeness and alignment.

2. **Analyze and Develop Solution Todo List**
   - Identify all major deliverables, phases, and dependencies.
   - Break down the solution into actionable tasks and subtasks.
   - Create a master todo list covering all implementation steps, including technical, design, and review activities.

3. **Create Draft Implementation Plan  Folder**
   - Create an `Draft ImplementationPlan` folder under `_Product Doc`.
   - For each major version or release, create a subfolder (e.g., `v1.0`, `v2.0`).

4. **Create Agent Folder and Phase Breakdown**
   - Create an `Agent` folder under `_Product Doc`.
   - Analyze the solution and define implementation phases (e.g., Requirements, Design, Development, Testing, Deployment).
   - For each phase, create a subfolder.

5. **Generate Files and Comprehensive Content for Each Phase**
   - In each phase subfolder, generate the following files with comprehensive content:
     - `PhaseOverviewAndSummary.md`: High-level overview and goals for the phase.
     - `RisksIssuesDependencies.md`: Detailed risks, issues, prerequisites, and dependencies with mitigation guidelines.
     - `TechnicalDesignAndSpecs.md`: Technical architecture, specs, and diagrams.
     - `PhaseFeaturesAndFlows.md`: Features, user flows, and system flows for the phase.
     - `ComponentDesigns.md`: Component-level designs and responsibilities.
     - `PhaseComprehensiveReviews.md`: Review checklists, acceptance criteria, and lessons learned.

6. **Generate Detailed Todo List for Each Phase**
   - For each phase and major task, generate a detailed todo list for the agent to follow.
   - Ensure all steps are actionable and traceable.

---

## Acceptance Criteria
- All solution requirements and features are reviewed and analyzed.
- A comprehensive, actionable todo list is created for the entire solution and for each phase.
- ImplementationPlan and Agent folders are created with proper subfolders and files for each phase.
- Each phase contains all required documentation files, with comprehensive content and guidelines.
- The plan is ready for execution and automation by the agent.

---

*Use this prompt to drive a structured, automated, and well-documented implementation process for the solution, with detailed content for every phase and step.*
