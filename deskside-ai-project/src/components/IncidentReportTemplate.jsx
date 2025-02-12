import React, { useState, useEffect } from "react";
import "./IncidentReportTemplate.css";

const IncidentReportTemplate = () => {
  const [issue, setIssue] = useState("");
  const [assetTag, setAssetTag] = useState("");
  const [assetModel, setAssetModel] = useState("");
  const [troubleshootingSteps, setTroubleshootingSteps] = useState("");
  const [requiresAssetSwap, setRequiresAssetSwap] = useState(null);
  const [assetSwapTag, setAssetSwapTag] = useState("");
  const [assetSwapModel, setAssetSwapModel] = useState("");
  const [resolved, setResolved] = useState(null);
  const [resolutionSteps, setResolutionSteps] = useState("");
  const [resolutionProof, setResolutionProof] = useState("");
  const [escalationReason, setEscalationReason] = useState("");
  const [escalationTeam, setEscalationTeam] = useState("");
  const [isRecurring, setIsRecurring] = useState(null);
  const [recurringIncidentNumber, setRecurringIncidentNumber] = useState("");
  const [isMaster, setIsMaster] = useState(null);
  const [masterIncidentNumber, setMasterIncidentNumber] = useState("");
  const [copiedContent, setCopiedContent] = useState("");

  const updateCopiedContent = () => {
    let content = "";

    if (issue) content += `ISSUE: ${issue}\n`;
    if (assetTag) content += `ASSET TAG: ${assetTag}\n`;
    if (assetModel) content += `ASSET MODEL: ${assetModel}\n`;
    if (troubleshootingSteps)
      content += `TROUBLESHOOTING STEPS: ${troubleshootingSteps}\n`;
    if (requiresAssetSwap !== null)
      content += `Does it require an Asset Swap?: ${requiresAssetSwap}\n`;
    if (requiresAssetSwap === "yes") {
      if (assetSwapTag) content += `ASSET SWAP ASSET TAG: ${assetSwapTag}\n`;
      if (assetSwapModel)
        content += `ASSET SWAP ASSET MODEL: ${assetSwapModel}\n`;
    }
    if (resolved !== null) content += `RESOLVED: ${resolved}\n`;
    if (resolved === "yes") {
      if (resolutionSteps) content += `Resolution Steps: ${resolutionSteps}\n`;
      if (resolutionProof) content += `Resolution Proof: ${resolutionProof}\n`;
    } else if (resolved === "no") {
      if (escalationReason)
        content += `Escalation Reason: ${escalationReason}\n`;
      if (escalationTeam) content += `Escalation Team: ${escalationTeam}\n`;
    }
    if (isRecurring !== null)
      content += `Is this a recurring incident?: ${isRecurring}\n`;
    if (isRecurring === "yes" && recurringIncidentNumber)
      content += `Recurring Incident Number: ${recurringIncidentNumber}\n`;
    if (isMaster !== null)
      content += `Is this the master incident?: ${isMaster}\n`;
    if (isMaster === "yes" && masterIncidentNumber)
      content += `Master Incident Number: ${masterIncidentNumber}\n`;

    setCopiedContent(content);
  };

  useEffect(() => {
    updateCopiedContent();
  }, [
    issue,
    assetTag,
    assetModel,
    troubleshootingSteps,
    requiresAssetSwap,
    assetSwapTag,
    assetSwapModel,
    resolved,
    resolutionSteps,
    resolutionProof,
    escalationReason,
    escalationTeam,
    isRecurring,
    recurringIncidentNumber,
    isMaster,
    masterIncidentNumber,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(copiedContent);
    alert("Content copied to clipboard!");
  };

  const isCopyDisabled =
    !issue ||
    !assetTag ||
    !assetModel ||
    !troubleshootingSteps ||
    requiresAssetSwap === null ||
    (requiresAssetSwap === "yes" && (!assetSwapTag || !assetSwapModel)) ||
    resolved === null ||
    (resolved === "yes" && (!resolutionSteps || !resolutionProof)) ||
    (resolved === "no" && (!escalationReason || !escalationTeam)) ||
    isRecurring === null ||
    (isRecurring === "yes" && !recurringIncidentNumber) ||
    isMaster === null ||
    (isMaster === "yes" && !masterIncidentNumber);

  return (
    <div className="container">
      <h1 className="heading">Incident Report Template</h1>
      <form>
        <div>
          <label className="label">ISSUE:</label>
          <input
            type="text"
            className="input"
            placeholder="Describe the issue in detail"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">ASSET TAG:</label>
          <input
            type="text"
            className="input"
            placeholder="Enter the asset tag number"
            value={assetTag}
            onChange={(e) => setAssetTag(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">ASSET MODEL:</label>
          <input
            type="text"
            className="input"
            placeholder="Enter the asset model"
            value={assetModel}
            onChange={(e) => setAssetModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">TROUBLESHOOTING STEPS:</label>
          <textarea
            className="textarea"
            placeholder="List the troubleshooting steps taken"
            value={troubleshootingSteps}
            onChange={(e) => setTroubleshootingSteps(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">Does it require an Asset Swap?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="assetSwap"
                value="yes"
                checked={requiresAssetSwap === "yes"}
                onChange={() => setRequiresAssetSwap("yes")}
                required
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="assetSwap"
                value="no"
                checked={requiresAssetSwap === "no"}
                onChange={() => setRequiresAssetSwap("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        {requiresAssetSwap === "yes" && (
          <>
            <div>
              <label className="label">ASSET SWAP ASSET TAG:</label>
              <input
                type="text"
                className="input"
                placeholder="Enter the swapped asset tag"
                value={assetSwapTag}
                onChange={(e) => setAssetSwapTag(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">ASSET SWAP ASSET MODEL:</label>
              <input
                type="text"
                className="input"
                placeholder="Enter the swapped asset model"
                value={assetSwapModel}
                onChange={(e) => setAssetSwapModel(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="label">RESOLVED?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="resolved"
                value="yes"
                checked={resolved === "yes"}
                onChange={() => setResolved("yes")}
                required
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="resolved"
                value="no"
                checked={resolved === "no"}
                onChange={() => setResolved("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        {resolved === "yes" && (
          <>
            <div>
              <label className="label">Resolution Steps:</label>
              <textarea
                className="textarea"
                placeholder="Describe the resolution steps"
                value={resolutionSteps}
                onChange={(e) => setResolutionSteps(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Resolution Proof:</label>
              <textarea
                className="textarea"
                placeholder="Provide proof of resolution (e.g., logs)"
                value={resolutionProof}
                onChange={(e) => setResolutionProof(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {resolved === "no" && (
          <>
            <div>
              <label className="label">Escalation Reason:</label>
              <textarea
                className="textarea"
                placeholder="Describe the escalation reason"
                value={escalationReason}
                onChange={(e) => setEscalationReason(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Escalation Team:</label>
              <input
                type="text"
                className="input"
                placeholder="Enter the escalation team"
                value={escalationTeam}
                onChange={(e) => setEscalationTeam(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="label">Is this a recurring incident?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="recurring"
                value="yes"
                checked={isRecurring === "yes"}
                onChange={() => setIsRecurring("yes")}
                required
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="recurring"
                value="no"
                checked={isRecurring === "no"}
                onChange={() => setIsRecurring("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        {isRecurring === "yes" && (
          <div>
            <label className="label">Recurring Incident Number:</label>
            <input
              type="text"
              className="input"
              placeholder="Enter the recurring incident number"
              value={recurringIncidentNumber}
              onChange={(e) => setRecurringIncidentNumber(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label className="label">Is this the master incident?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="master"
                value="yes"
                checked={isMaster === "yes"}
                onChange={() => setIsMaster("yes")}
                required
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="master"
                value="no"
                checked={isMaster === "no"}
                onChange={() => setIsMaster("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        {isMaster === "yes" && (
          <div>
            <label className="label">Master Incident Number:</label>
            <input
              type="text"
              className="input"
              placeholder="Enter the master incident number"
              value={masterIncidentNumber}
              onChange={(e) => setMasterIncidentNumber(e.target.value)}
              required
            />
          </div>
        )}

        <button
          type="button"
          className="copy-button"
          onClick={handleCopy}
          disabled={isCopyDisabled}
        >
          Copy
        </button>
      </form>

      <textarea className="copied-content" value={copiedContent} readOnly />
    </div>
  );
};

export default IncidentReportTemplate;
