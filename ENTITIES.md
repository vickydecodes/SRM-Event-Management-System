# 👤 User & 🎓 Student Data Design

This document explains the purpose of each field in the **User** and **Student** entities, clearly distinguishes between **system-generated** and **manually entered** data, and provides design rationale.

It serves as a reference for API design, form creation, permission handling, and database schema decisions.

## 👤 User Entity

**Purpose**  
The **User** entity is responsible **only** for authentication, authorization, and access control.  
It is **domain-agnostic** and should **not** contain academic, event-specific, or profile data.

### User Fields

| Field          | Why it exists                                      | Provided by              |
|----------------|----------------------------------------------------|--------------------------|
| `id`           | Primary identifier used internally across the system | **System-generated**     |
| `fullName`     | Display name shown in UI, logs, and records        | **Manual** (User / Admin) |
| `email`        | Primary login credential and official communication channel | **Manual**               |
| `phone`        | Contact number for alerts, OTP, password recovery  | **Manual**               |
| `password`     | Authentication secret (stored as hashed)           | **Manual** → hashed by system |
| `roles[]`      | Array of roles (student, staff, dean, organizer, etc.) supporting multi-role users | **Admin / System**       |
| `isActive`     | Enables or disables system access                  | **Admin / System**       |

### Key Rules for User Entity

- A single user **can have multiple roles**.
- All **authentication data** must live **only** in the User entity.
- **No** academic, department, course, or event-specific data should be stored here.
- Other entities (**Student**, **Organizer**, **Staff**, etc.) reference the User via `userId`.

## 🎓 Student Entity

**Purpose**  
The **Student** entity stores academic and profile information required for event participation, institutional workflows, and certificate generation.

**Important:**  
A **Student** record **exists only if** the related User has the `student` role.

### Student Fields

| Field            | Why it exists                                          | Provided by              |
|------------------|--------------------------------------------------------|--------------------------|
| `id`             | Primary identifier for the student profile             | **System-generated**     |
| `userId`         | Foreign key linking to the User entity                 | **System-generated**     |
| `registerNumber` | Official unique student identifier (e.g., roll number) | **Manual** (Admin / Student) |
| `department`     | Organizational unit the student belongs to             | **Manual**               |
| `course`         | Specific program of study (e.g., B.Tech CSE, MBA)      | **Manual**               |
| `year`           | Current academic year (1–4 or equivalent)              | **Manual**               |
| `section`        | Class grouping (A, B, C, etc.)                         | **Manual** (if applicable) |
| `fullName`       | Student’s official name (may mirror User.fullName)     | **Manual**               |
| `email`          | Academic or preferred contact email                    | **Manual**               |
| `phone`          | Student contact number                                 | **Manual**               |
| `isActive`       | Controls whether the student can participate in events | **Admin / System**       |

### ✍️ What Students Should Enter (Manually)

When a student creates or updates their profile, they are responsible for providing:

- `registerNumber`
- `department`
- `course`
- `year`
- `section` (if applicable)
- `fullName`
- `email`
- `phone`

These fields represent the student's **real-world academic identity** and are required for event registrations, approvals, and certificate issuance.

### ⚙️ What the System Generates or Controls

The system is responsible for:

- `id` (both User and Student)
- Password hashing
- Role assignment (including `student` role)
- `primaryRole` logic
- `isActive` toggling (both User and Student)
- Automatically linking `Student.userId` → `User.id`

## 🧠 Design Rationale (Important)

| Concept              | Meaning                                                                 |
|----------------------|-------------------------------------------------------------------------|
| **User**             | Who you are & what you can do (identity + permissions)                  |
| **Student**          | Academic identity & context (for event and institutional workflows)     |

### Benefits of this separation

- Avoids **data duplication** (e.g., fullName in both entities)
- Prevents **permission confusion** (authentication vs academic eligibility)
- Makes future schema changes easier
- Supports **multi-role users** cleanly
- Enables **clean permission checks**
- Scales well for future profiles (StaffProfile, OrganizerProfile, AlumniProfile, etc.)

This design follows the **Single Responsibility Principle** and prepares the system for long-term maintainability and extensibility.