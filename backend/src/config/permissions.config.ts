/**
 * Permission configuration
 * Format:
 *  module: {
 *    action: [roles]
 *  }
 */

const permissions = {
  /**
   * ----------------------------------------
   * DEPARTMENT MANAGEMENT
   * ----------------------------------------
   */
  department: {
    create: ["ADMIN"],
    view: ["ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
    retrieve: ["ADMIN"],
  },

  /**
   * ----------------------------------------
   * EVENT HALL MANAGEMENT
   * ----------------------------------------
   */
  eventHall: {
    create: ["ADMIN"],
    view: ["ADMIN", "DEPARTMENT"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
    retrieve: ["ADMIN"],
  },

  /**
   * ----------------------------------------
   * BOOKING MANAGEMENT
   * ----------------------------------------
   */
  booking: {
    create: ["DEPARTMENT"],
    view: ["ADMIN", "DEPARTMENT"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
    retrieve: ["ADMIN"],
  },

  /**
   * ----------------------------------------
   * ENROLLMENT MANAGEMENT
   * ----------------------------------------
   */
  enrollment: {
    create: ["STUDENT"],
    view: ["ADMIN", "DEPARTMENT", "STUDENT"],
    delete: ["ADMIN", "STUDENT"],
  },

  /**
   * ----------------------------------------
   * USER MANAGEMENT
   * ----------------------------------------
   */
  user: {
    create: ["ADMIN", "DEPARTMENT"],
    view: ["ADMIN", "DEPARTMENT"],
    update: ["ADMIN", "DEPARTMENT"],
    delete: ["ADMIN"],
    retrieve: ["ADMIN"],
  },
};

export default permissions;
