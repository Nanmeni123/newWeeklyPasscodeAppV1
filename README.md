
# Weekly Passcode App

This is a Node.js application for generating a weekly passcode, built using Express and Azure integration.

## Project Structure

```
WeeklyPasscodeApp
├── app.js                # Main server file using Express for Node.js
├── frontend
│   └── index.html        # HTML file for user interaction
├── package.json          # Node.js dependencies and scripts
├── passcode-generator
│   └── generator.js      # Logic for generating the weekly passcode
└── README.md             # Documentation for the project
```

### Contents of Each File

1. **app.js**:
   - Main server file that sets up the Express application.
   - Handles routing for both serving the frontend (`index.html`) and the `/passcode-generator` endpoint to generate passcodes.

2. **frontend/index.html**:
   - The HTML file contains a user interface with a button to request the passcode generation and a section to display the result.
   - Uses JavaScript to interact with the `/passcode-generator` endpoint.

3. **package.json**:
   - Contains the metadata for the project, such as dependencies (`express`, `axios`) and scripts to run the server.

4. **passcode-generator/generator.js**:
   - Contains the logic to generate the passcode.
   - This module is imported by `app.js` to handle the passcode generation.

5. **.env**:
   - Stores the environment variables such as `Bearer_Token`, `Event_ID`, `Update_event_passcode`, and `X_Switch_User`.
   - Make sure this file is not included in the repository by adding it to `.gitignore` for security purposes.

6. **README.md**:
   - Documentation providing an overview of the project, setup instructions, and how to run the application.

## Setup Instructions

### Local Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   - Create a `.env` file in the root directory and provide the necessary values for:
     - `Bearer_Token`
     - `Event_ID`
     - `Update_event_passcode`
     - `X_Switch_User`

3. Start the server:

   ```bash
   npm start
   ```

4. Access the application in your browser at `http://localhost:3000`.

### Deploying to Azure Web App

1. **Create an Azure Web App**:
   - Go to the Azure portal and create a new Web App service.
   - Choose your desired configurations (e.g., runtime stack as Node.js).

2. **Deploy the Application**:
   - You can deploy using various methods such as Azure CLI, GitHub Actions, or through the Azure portal.
   - Ensure all project files are included in the deployment.

3. **Set Environment Variables**:
   - In the Azure portal, navigate to your Web App.
   - Go to **Configuration** under the **Settings** section.
   - Click on **Application settings** and add the following environment variables:
     - `Bearer_Token`
     - `Event_ID`
     - `Update_event_passcode`
     - `X_Switch_User`

4. **Start the Application**:
   - Once the application is deployed and environment variables are set, it should start automatically.
   - You can access it through the URL provided by Azure.

### Accessing the Application

- Once deployed, open your Azure Web App URL in a browser.
- You will see the interface with a button to generate the passcode.
- Click the button to generate and display the weekly passcode.
