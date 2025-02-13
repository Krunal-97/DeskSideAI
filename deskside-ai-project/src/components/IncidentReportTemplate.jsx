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
  const [userConfirmation, setUserConfirmation] = useState(null);
  const [userConfirmationEvidence, setUserConfirmationEvidence] = useState("");
  const [strikeRuleApplied, setStrikeRuleApplied] = useState(null);
  const [strikeRuleEvidence, setStrikeRuleEvidence] = useState("");
  const [escalationReason, setEscalationReason] = useState("");
  const [escalationTeam, setEscalationTeam] = useState("");
  const [isRecurring, setIsRecurring] = useState(null);
  const [recurringIncidentNumber, setRecurringIncidentNumber] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [duplicateIncidentNumber, setDuplicateIncidentNumber] = useState("");
  const [copiedContent, setCopiedContent] = useState("");

  const updateCopiedContent = () => {
    let content = "";

    if (issue) content += `ISSUE IN DETAIL: ${issue}\n`;
    if (assetTag) content += `ORIGINAL ASSET S/N: ${assetTag}\n`;
    if (assetModel) content += `MODEL: ${assetModel}\n`;
    if (troubleshootingSteps)
      content += `TROUBLESHOOTING STEPS: ${troubleshootingSteps}\n`;
    if (requiresAssetSwap !== null)
      content += `Does it require an Asset Swap?: ${requiresAssetSwap}\n`;
    if (requiresAssetSwap === "yes") {
      if (assetSwapTag) content += `SWAP ASSET S/N: ${assetSwapTag}\n`;
      if (assetSwapModel) content += `SWAP MODEL: ${assetSwapModel}\n`;
    }
    if (resolved !== null) content += `RESOLVED: ${resolved}\n`;
    if (resolved === "yes") {
      if (resolutionSteps)
        content += `RESOLUTION IN DETAIL - CLOSING NOTES: ${resolutionSteps}\n`;
      if (userConfirmation !== null)
        content += `USER CONFIRMATION: ${userConfirmation}\n`;
      if (userConfirmationEvidence)
        content += `USER CONFIRMATION EVIDENCE: ${userConfirmationEvidence}\n`;
      if (strikeRuleApplied !== null)
        content += `STRIKE RULE APPLIED: ${strikeRuleApplied}\n`;
      if (strikeRuleApplied === "yes" && strikeRuleEvidence)
        content += `STRIKE RULE EVIDENCE: ${strikeRuleEvidence}\n`;
    } else if (resolved === "no") {
      if (escalationReason)
        content += `ESCALATION REASON in DETAIL: ${escalationReason}\n`;
      if (escalationTeam)
        content += `TEAM TO BE ESCALATED: ${escalationTeam}\n`;
    }
    if (isDuplicate !== null)
      content += `DUPLICATE INC #: ${
        isDuplicate === "yes" ? duplicateIncidentNumber : "No"
      }\n`;
    if (isRecurring !== null)
      content += `RECURRING INCIDENT - MASTER INC #: ${
        isRecurring === "yes" ? recurringIncidentNumber : "No"
      }\n`;

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
    userConfirmation,
    userConfirmationEvidence,
    strikeRuleApplied,
    strikeRuleEvidence,
    escalationReason,
    escalationTeam,
    isDuplicate,
    duplicateIncidentNumber,
    isRecurring,
    recurringIncidentNumber,
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
    (resolved === "yes" &&
      (!resolutionSteps || !userConfirmation || !strikeRuleApplied)) ||
    (resolved === "no" && (!escalationReason || !escalationTeam)) ||
    isDuplicate === null ||
    (isDuplicate === "yes" && !duplicateIncidentNumber) ||
    isRecurring === null ||
    (isRecurring === "yes" && !recurringIncidentNumber);

  return (
    <div className="container">
      <h1 className="heading">Incident Report Template</h1>
      <form>
        {/* Group 1 */}
        <div>
          <label className="label">ISSUE IN DETAIL:</label>
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
          <label className="label">ORIGINAL ASSET S/N:</label>
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
          <label className="label">MODEL:</label>
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

        {/* Group 2: Asset Swap */}
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
              <label className="label">SWAP ASSET S/N:</label>
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
              <label className="label">SWAP MODEL:</label>
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

        {/* Group 2: Resolution */}
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
              <label className="label">
                RESOLUTION IN DETAIL - CLOSING NOTES:
              </label>
              <textarea
                className="textarea"
                placeholder="Describe the resolution steps"
                value={resolutionSteps}
                onChange={(e) => setResolutionSteps(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">USER CONFIRMATION:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userConfirmation"
                    value="yes"
                    checked={userConfirmation === "yes"}
                    onChange={() => setUserConfirmation("yes")}
                    required
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userConfirmation"
                    value="no"
                    checked={userConfirmation === "no"}
                    onChange={() => setUserConfirmation("no")}
                    required
                  />
                  No
                </label>
              </div>
              <textarea
                className="textarea"
                placeholder="Provide evidence for user confirmation"
                value={userConfirmationEvidence}
                onChange={(e) => setUserConfirmationEvidence(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">STRIKE RULE APPLIED:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="strikeRuleApplied"
                    value="yes"
                    checked={strikeRuleApplied === "yes"}
                    onChange={() => setStrikeRuleApplied("yes")}
                    required
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="strikeRuleApplied"
                    value="no"
                    checked={strikeRuleApplied === "no"}
                    onChange={() => setStrikeRuleApplied("no")}
                    required
                  />
                  No
                </label>
              </div>
              {strikeRuleApplied === "yes" && (
                <textarea
                  className="textarea"
                  placeholder="Provide evidence for strike rule"
                  value={strikeRuleEvidence}
                  onChange={(e) => setStrikeRuleEvidence(e.target.value)}
                  required
                />
              )}
            </div>
          </>
        )}

        {resolved === "no" && (
          <>
            <div>
              <label className="label">ESCALATION REASON in DETAIL:</label>
              <textarea
                className="textarea"
                placeholder="Describe the escalation reason"
                value={escalationReason}
                onChange={(e) => setEscalationReason(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">TEAM TO BE ESCALATED:</label>
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

        {/* Group 4: Duplicate Incident */}
        <div>
          <label className="label">Is this a duplicate incident?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="duplicate"
                value="yes"
                checked={isDuplicate === "yes"}
                onChange={() => setIsDuplicate("yes")}
                required
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="duplicate"
                value="no"
                checked={isDuplicate === "no"}
                onChange={() => setIsDuplicate("no")}
                required
              />
              No
            </label>
          </div>
        </div>

        {isDuplicate === "yes" && (
          <div>
            <label className="label">DUPLICATE INC #:</label>
            <input
              type="text"
              className="input"
              placeholder="Enter the duplicate incident number"
              value={duplicateIncidentNumber}
              onChange={(e) => setDuplicateIncidentNumber(e.target.value)}
              required
            />
          </div>
        )}

        {/* Group 4: Recurring Incident */}
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
            <label className="label">RECURRING INCIDENT - MASTER INC #:</label>
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
