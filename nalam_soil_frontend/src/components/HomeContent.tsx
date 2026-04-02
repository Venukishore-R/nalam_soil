import React, { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { Modal, List, Tag, Typography } from "antd";
import {
  ExperimentOutlined,
  BarChartOutlined,
  BranchesOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import SoilTestForm from "./SoilTestForm";

const { Text } = Typography;

function HomeContent() {
  const { user } = useAuth();
  const [showTestForm, setShowTestForm] = useState(false);
  const [soilTests, setSoilTests] = useState<any[]>([]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Text>Redirecting to login...</Text>
      </div>
    );
  }

  return (
    <div className="home-shell">
      <div className="home-page">
        {/* ================= STATS ================= */}
        <div className="stats-grid">
          <StatCard
            title="Total Landholding"
            value={`${user.landholding.toFixed(2)} ${
              user.unit === "hectare"
                ? "ha"
                : user.unit === "acre"
                  ? "ac"
                  : "m²"
            }`}
            meta={`${user.village}, ${user.district}`}
          />

          <StatCard
            title="Crops Growing"
            value={user.cropCategories.length}
            meta={user.cropCategories.slice(0, 2).join(", ")}
          />

          <StatCard
            title="Tests Done"
            value={soilTests.length}
            meta={
              soilTests.length === 0
                ? "Start your first soil test"
                : "Keep monitoring your soil"
            }
          />
        </div>

        {/* ================= CTA ================= */}
        <div className="cta-card">
          <div>
            <h4>Ready to Analyze Your Soil?</h4>
            <p>
              Get detailed nutrient analysis (Nitrogen, Phosphorous, Potassium)
              to make informed farming decisions.
            </p>
          </div>

          <button className="cta-btn" onClick={() => setShowTestForm(true)}>
            <PlusOutlined style={{ marginRight: "6px" }} />
            Start Soil Test
          </button>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="feature-grid">
          <FeatureCard
            icon={<ExperimentOutlined style={{ color: "#f19c1a" }} />}
            title="NPK Analysis"
            desc="Measure Nitrogen, Phosphorous, and Potassium levels in your soil."
          />

          <FeatureCard
            icon={<BarChartOutlined style={{ color: "#4dbb66" }} />}
            title="Data Insights"
            desc="Get actionable insights based on your soil test results."
          />

          <FeatureCard
            icon={<BranchesOutlined style={{ color: "#c17a2d" }} />}
            title="Crop Specific"
            desc="Recommendations tailored to your crop and growth stage."
          />
        </div>

        {/* ================= RECENT TESTS ================= */}
        <div className="recent-card">
          <h4>Recent Soil Tests</h4>

          {soilTests.length === 0 ? (
            <div className="recent-empty">
              <Text type="secondary">
                No soil tests yet. Start your first analysis.
              </Text>
            </div>
          ) : (
            <List
              dataSource={soilTests}
              renderItem={(test: any) => (
                <List.Item>
                  <div className="flex justify-between w-full">
                    <div>
                      <Text strong>{test.cropName}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {test.timestamp}
                      </Text>
                    </div>

                    <div>
                      <Tag color="blue">N: {test.nitrogen}</Tag>
                      <Tag color="green">P: {test.phosphorous}</Tag>
                      <Tag color="orange">K: {test.potassium}</Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <Modal
        title="Soil Nutrient Test"
        open={showTestForm}
        onCancel={() => setShowTestForm(false)}
        footer={null}
        width={650}
      >
        <SoilTestForm
          onSubmit={(data: any) => {
            setSoilTests((prev) => [data, ...prev]);
            setShowTestForm(false);
          }}
          onClose={() => setShowTestForm(false)}
        />
      </Modal>
    </div>
  );
}

export default HomeContent;

// ======================================================
// 🔹 INTERNAL COMPONENTS (Same File)
// ======================================================

function StatCard({ title, value, meta }: any) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">{value}</div>
      <div className="stat-meta">{meta}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
