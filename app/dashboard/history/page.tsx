import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import React from "react";
import { TEMPLATE } from "../_components/TemplateListSection";
import CopyButton from "./CopyButton"; // Import the CopyButton component

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

async function History() {
  const user = await currentUser();

  // Ensure the email address is defined
  if (!user?.primaryEmailAddress?.emailAddress) {
    return <p className="text-gray-500">No user email found.</p>;
  }

  const email = user.primaryEmailAddress.emailAddress;

  // Fetch data and handle null values
  const rawHistoryList = await db.select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, email)) // Ensure correct field name
    .orderBy(desc(AIOutput.id));

  const HistoryList: HISTORY[] = rawHistoryList.map(item => ({
    id: item.id,
    formData: item.formData,
    aiResponse: item.aiResponse ?? "", // Handle null
    templateSlug: item.templateSlug,
    createdBy: item.createdBy ?? "", // Handle null
    createdAt: item.createdAt ?? "" // Handle null
  }));

  const GetTemplateInfo = (slug: string) => {
    const template: TEMPLATE | undefined = Templates.find((item) => item.slug === slug); // Ensure correct field name
    return {
      name: template?.name || "Unknown Template",
      icon: template?.icon || "" // Assuming icon is a URL
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      {HistoryList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Template</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">AI Response</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {HistoryList.map((historyItem) => {
                const { name, icon } = GetTemplateInfo(historyItem.templateSlug);
                return (
                  <tr key={historyItem.id.toString()}>
                    <td className="mt-5 py-2 px-4 border-b border-gray-200 flex items-center">
                      {icon && <img src={icon} alt={name} className="h-6 w-6 mr-2" />} {/* Display the icon */}
                      {name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 line-clamp-6">{historyItem.aiResponse}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{historyItem.createdAt}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <CopyButton text={historyItem.aiResponse} /> {/* Use the CopyButton component */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No history found.</p>
      )}
      {/* <Button className="mt-4" onClick={() => window.location.href = '/path-to-main-page'}>Back to Main</Button> */}
    </div>
  );
}

export default History;
