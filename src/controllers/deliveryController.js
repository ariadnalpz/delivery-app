const supabase = require('../config/db');

exports.getAllDeliveries = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, status, location')
      .eq('role', 'delivery');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los deliverys' });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'delivery' || req.user.id !== parseInt(id)) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
};