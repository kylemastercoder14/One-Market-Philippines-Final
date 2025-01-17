import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import PolicyForm from "./_components/policy-form";

const Policies = async () => {
  const data = await db.adminPolicies.findMany();
  return (
    <div>
      <Heading
        title="Admin Policies"
        description="Configure your platform's policies in one place."
      />
      <PolicyForm data={data} />
    </div>
  );
};

export default Policies;
