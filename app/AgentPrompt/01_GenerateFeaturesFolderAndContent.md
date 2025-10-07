# Agent Prompt: Generate Features Folder and Content

## Purpose
This prompt instructs the agent to create the entire `_Documentation/Features` folder structure and populate it with all required files for each feature, based on the current solution plan or requirements.

---

## Instructions for the Agent

1. **Identify Features**
   - Review the latest requirements or solution plan (e.g., `_Documentation/SolutionPlanAndFeatures.md`).
   - List all features to be included in the Features folder.

2. **Create Feature Subfolders**
   - For each feature, create a subfolder under `_Documentation/Features` named after the feature.

3. **Generate Standard Files for Each Feature**
   - In each feature subfolder, create the following files:
     - `Feature.md`: Overview and description of the feature.
     - `DesignFlow.md`: User and system flows for the feature.
     - `Timeline.md`: Estimated development timeline and milestones.
     - `Review.md`: Review checklist and acceptance criteria.
     - `FeatureDataDefinitions.md`: Main entities and key fields for the feature.
     - `FunctionalRequirements/<FeatureName>.md`: Detailed requirements, workflows, edge cases, UX/UI, and technical needs.

4. **Populate Files with Initial Content**
   - Use the solution plan and best practices to generate initial content for each file.
   - Ensure all files are well-structured and ready for further editing or review.

5. **Consistency Check**
   - Ensure all features and files are present and named consistently.
   - No missing or duplicate files.

---

## Acceptance Criteria
- All features from the solution plan are represented as subfolders in `_Documentation/Features`.
- Each feature subfolder contains all standard files, with initial content populated.
- The folder structure is complete and ready for review or further customization.

---

*Use this prompt to bootstrap or regenerate the Features folder and its documentation content from scratch.*
