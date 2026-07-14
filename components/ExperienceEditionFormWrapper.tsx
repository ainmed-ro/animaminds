"use client";

import { Suspense } from "react";
import ExperienceEditionForm from "./ExperienceEditionForm";

export default function ExperienceEditionFormWrapper() {
  return (
    <Suspense fallback={<div>Se încarcă formularul...</div>}>
      <ExperienceEditionForm />
    </Suspense>
  );
}
