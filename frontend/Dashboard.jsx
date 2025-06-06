// Dashboard.jsx (Unified UI + Logic)
import { useEffect, useState } from "react";
import {
  BarChart3,
  Brain,
  Grid3X3,
  Menu,
  Settings,
  TrendingUp,
  Users,
  Edit2,
} from "lucide-react";
import { Link } from "react-router-dom";
import dotenv from "dotenv"
import axios from "axios";

dotenv.config()

const navigationItems = [
  { icon: Grid3X3, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Resume insights" },
  { icon: TrendingUp, label: "Courses" },
  { icon: BarChart3, label: "Progress" },
  { icon: Brain, label: "Personality test" },
  { icon: Users, label: "Communities" },
  { icon: Settings, label: "Settings" },
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [careerGoal, setCareerGoal] = useState("");
  const [editedGoal, setEditedGoal] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const API_URL = process.env.API_URL

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();

        setDashboardData(data);
        setCareerGoal(data.targetRole);
        setEditedGoal(data.targetRole);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const saveCareerGoal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        "http://localhost:7000/api/roles/target-role",
        { targetRoleName: editedGoal },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCareerGoal(response.data.targetRole);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update career goal");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!dashboardData) return null;

  const {
    requiredSkills = [],
    matchedSkills = [],
    skillGaps = [],
    progress = 0,
    mappedResources = [],
  } = dashboardData;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${collapsed ? "w-20" : "w-64"} bg-slate-900 text-white min-h-screen p-4`}
      >
        <div className="flex justify-between items-center mb-8">
          {!collapsed && (
            <Link to="/" className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                item.active ? "bg-amber-500 text-slate-900" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className={`transition-all ${collapsed ? "w-6 h-6" : "w-5 h-5"}`} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 transition-all duration-300">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome back!</h1>
        </div>

        {/* Career Goal */}
        <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Career goal</span>
            <Edit2
              className="w-4 h-4 text-gray-400 cursor-pointer"
              onClick={() => {
                setIsEditing(true);
                setEditedGoal(careerGoal);
              }}
            />
          </div>
          {isEditing ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={editedGoal}
                onChange={(e) => setEditedGoal(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm flex-1"
              />
              <button onClick={saveCareerGoal} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          ) : (
            <h3 className="text-2xl font-bold text-slate-800">{careerGoal}</h3>
          )}
        </div>

        {/* Skills Progress */}
        <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Skills Progress</h2>
          <div className="space-y-4">
            {requiredSkills.map((skill) => {
              const hasSkill = matchedSkills.includes(skill);
              return (
                <div key={skill} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">{skill}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${hasSkill ? "bg-green-600" : "bg-red-400"}`}
                      style={{ width: hasSkill ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills to Learn */}
        <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills to Learn</h3>
          <ul className="space-y-2">
            {skillGaps.map((skill) => (
              <li key={skill} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Recommended Resources</h2>
          <div className="space-y-4">
            {mappedResources.map(({ skill, resource }) => (
              <div key={skill} className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="font-semibold text-gray-800">{skill}</p>
                {resource ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {resource.title}
                  </a>
                ) : (
                  <p className="text-gray-500 text-sm">No resource found</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Readiness */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Readiness</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="h-4 bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
        </div>
      </div>
    </div>
  );
}
