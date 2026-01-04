import { google } from "googleapis";
import { oAuth2Client } from "./OAuth2Client.js";

export const importGoogleContacts = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }
    console.log("Recieved Code: ", code);
    // Exchange auth code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Recieved Token:", tokens);
    oAuth2Client.setCredentials(tokens);
    console.log("Oauth Credentials Set:", oAuth2Client.credentials);

    // Google People API
    const peopleService = google.people({
      version: "v1",
      auth: oAuth2Client,
    });
    console.log("People Service Created:", peopleService);

    const response = await peopleService.people.connections.list({
      resourceName: "people/me",
      personFields: "names,phoneNumbers",
      pageSize: 200,
    });

    const contacts =
      response.data.connections?.map((person) => ({
        name: person.names?.[0]?.displayName || "",
        phone: person.phoneNumbers?.[0]?.value || "",
      })) || [];

    console.log(contacts);
    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Google Contacts Import Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to import contacts",
    });
  }
};
