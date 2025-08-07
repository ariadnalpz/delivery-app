const supabase = require('../config/db');

exports.createPackage = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  const { delivery_id, delivery_address } = req.body;

  try {
    const { data, error } = await supabase
      .from('packages')
      .insert([{ delivery_id, delivery_address, status: 'En transito' }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el paquete' });
  }
};

exports.getPackagesByDelivery = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'delivery' || req.user.id !== parseInt(id)) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('delivery_id', id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los paquetes' });
  }
};

exports.updatePackageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data: package, error: packageError } = await supabase
      .from('packages')
      .select('delivery_id')
      .eq('id', id)
      .single();

    if (packageError || !package) throw packageError;

    if (req.user.role !== 'delivery' || req.user.id !== package.delivery_id) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const { data, error } = await supabase
      .from('packages')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del paquete' });
  }
};